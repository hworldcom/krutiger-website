import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright-core";

const baseUrl = new URL(process.env.QA_BASE_URL || "http://localhost:3000");
const productionScriptUrl = "https://cdn.bsport.io/scripts/widget.js";
const scriptUrls = [productionScriptUrl];
const screenshotDirectory = join(process.cwd(), ".next", "quality-screenshots");
const executablePath = [
  process.env.BROWSER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
]
  .filter(Boolean)
  .find((candidate) => existsSync(candidate));

if (!executablePath) {
  throw new Error(
    "No Chrome/Chromium executable was found. Set BROWSER_EXECUTABLE_PATH.",
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

await mkdir(screenshotDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });

try {
  const checks = [
    {
      locale: "de",
      browserLocale: "de-DE",
      elementId: "bsport-widget-368485",
      route: "schedule",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-schedule-de.jpg",
      widgetName: "calendar",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "en",
      browserLocale: "en-GB",
      elementId: "bsport-widget-368485",
      route: "schedule",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-schedule-en.jpg",
      widgetName: "calendar",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "de",
      browserLocale: "de-DE",
      elementId: "bsport-widget-368485",
      route: "schedule",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-schedule-mobile.jpg",
      widgetName: "calendar",
      viewport: { width: 390, height: 844 },
    },
    {
      locale: "de",
      browserLocale: "de-DE",
      elementId: "bsport-widget-832086",
      route: "member-area",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-member-area-de.jpg",
      widgetName: "member login",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "en",
      browserLocale: "en-GB",
      elementId: "bsport-widget-832086",
      route: "member-area",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-member-area-mobile.jpg",
      widgetName: "member login",
      viewport: { width: 390, height: 844 },
    },
    {
      locale: "de",
      browserLocale: "de-DE",
      elementId: "bsport-widget-140155",
      expectBrandingHidden: true,
      route: "shop",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-shop-de.jpg",
      widgetName: "shop",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "en",
      browserLocale: "en-GB",
      elementId: "bsport-widget-140155",
      expectBrandingHidden: true,
      route: "shop",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-shop-mobile.jpg",
      widgetName: "shop",
      viewport: { width: 390, height: 844 },
    },
    {
      locale: "de",
      browserLocale: "de-DE",
      elementId: "bsport-widget-29534",
      expectBrandingHidden: true,
      route: "shop",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-gift-cards-de.jpg",
      widgetName: "gift cards",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "en",
      browserLocale: "en-GB",
      elementId: "bsport-widget-29534",
      expectBrandingHidden: true,
      route: "shop",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-gift-cards-mobile.jpg",
      widgetName: "gift cards",
      viewport: { width: 390, height: 844 },
    },
  ];

  for (const check of checks) {
    console.log(
      `Checking ${check.widgetName} on /${check.locale}/${check.route} at ${check.viewport.width}px.`,
    );
    const context = await browser.newContext({
      locale: check.browserLocale,
      viewport: check.viewport,
    });
    const page = await context.newPage();
    const bsportRequestFailures = [];
    const mountedWidgetConfigs = [];

    page.on("request", (request) => {
      if (!request.url().includes("/widget_config/log/")) {
        return;
      }

      const body = request.postDataJSON();

      if (body && typeof body === "object") {
        mountedWidgetConfigs.push(body);
      }
    });

    page.on("requestfailed", (request) => {
      const errorText = request.failure()?.errorText ?? "unknown error";
      const url = request.url();
      const isAbortedTelemetry =
        url.includes("/widget_config/log/") && errorText === "net::ERR_ABORTED";

      if (url.includes("bsport") && !isAbortedTelemetry) {
        bsportRequestFailures.push(`${url} (${errorText})`);
      }
    });

    await page.goto(new URL(`/${check.locale}/about`, baseUrl).href, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(500);
    for (const scriptUrl of scriptUrls) {
      assert(
        (await page.locator(`script[src="${scriptUrl}"]`).count()) === 0,
        `A bsport script loaded before the ${check.route} route was opened.`,
      );
    }

    await page.goto(new URL(`/${check.locale}/${check.route}`, baseUrl).href, {
      waitUntil: "domcontentloaded",
    });
    await page
      .locator(`script[src="${check.scriptUrl}"]`)
      .waitFor({ state: "attached", timeout: 30_000 });
    await page.locator(`#${check.elementId}`).scrollIntoViewIfNeeded();
    await page.waitForFunction(
      (elementId) => document.getElementById(elementId)?.childElementCount > 0,
      check.elementId,
      { timeout: 30_000 },
    );
    await page.waitForTimeout(8_000);

    const result = await page.evaluate(
      (elementId) => ({
        hasApi: typeof window.BsportWidget?.mount === "function",
        mountedChildren:
          document.getElementById(elementId)?.childElementCount ?? 0,
        hasError: Boolean(
          document.querySelector('[data-widget-fallback="error"]'),
        ),
        textLength:
          document.getElementById(elementId)?.textContent?.trim().length ?? 0,
        visibleBranding: Array.from(
          document
            .getElementById(elementId)
            ?.querySelectorAll('a[href*="utm_content=bsport_logo"]') ?? [],
        ).some((element) => getComputedStyle(element).display !== "none"),
      }),
      check.elementId,
    );

    assert(
      result.hasApi,
      `The bsport API was not available on /${check.locale}/${check.route}.`,
    );
    assert(
      result.mountedChildren > 0,
      `The bsport ${check.widgetName} did not mount on /${check.locale}/${check.route}.`,
    );
    assert(!result.hasError, `The localized widget fallback reports an error.`);
    assert(
      result.textLength > 0,
      `The bsport ${check.widgetName} mounted on /${check.locale}/${check.route} but did not finish rendering content.`,
    );
    assert(
      mountedWidgetConfigs.some(
        (config) =>
          config.widgetId === check.elementId &&
          config.language === check.locale,
      ),
      `The bsport ${check.widgetName} did not receive the ${check.locale} route language.`,
    );
    if (check.expectBrandingHidden) {
      assert(
        !result.visibleBranding,
        `The bsport ${check.widgetName} branding is still visible.`,
      );
    }

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    assert(
      overflow <= 1,
      `The bsport ${check.widgetName} causes ${overflow}px of horizontal page overflow at ${check.viewport.width}px.`,
    );

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      fullPage: true,
      path: join(screenshotDirectory, check.screenshot),
      quality: 70,
      type: "jpeg",
    });

    assert(
      bsportRequestFailures.length === 0,
      `bsport requests failed:\n${bsportRequestFailures.join("\n")}`,
    );

    await context.close();
  }

  const journeyContext = await browser.newContext({
    locale: "de-DE",
    viewport: { width: 1440, height: 1000 },
  });
  const journeyPage = await journeyContext.newPage();

  await journeyPage.goto(new URL("/de/schedule", baseUrl).href, {
    waitUntil: "domcontentloaded",
  });
  await journeyPage.waitForFunction(
    () =>
      (document.getElementById("bsport-widget-368485")?.textContent?.trim()
        .length ?? 0) > 0,
    undefined,
    { timeout: 30_000 },
  );

  await journeyPage.locator('a[href="/de/shop"]:visible').first().click();
  await journeyPage.waitForURL("**/de/shop");
  await journeyPage.waitForFunction(
    () =>
      (document.getElementById("bsport-widget-140155")?.textContent?.trim()
        .length ?? 0) > 0,
    undefined,
    { timeout: 30_000 },
  );
  await journeyPage.waitForFunction(
    () =>
      (document.getElementById("bsport-widget-29534")?.textContent?.trim()
        .length ?? 0) > 0,
    undefined,
    { timeout: 30_000 },
  );
  await journeyPage.waitForTimeout(5_000);
  assert(
    (await journeyPage.locator('[data-widget-fallback="error"]').count()) === 0,
    "The shop failed after client-side navigation from the calendar.",
  );

  await journeyPage.locator('a[href="/en/shop"]:visible').first().click();
  await journeyPage.waitForURL("**/en/shop");
  await journeyPage.waitForFunction(
    () =>
      (document.getElementById("bsport-widget-140155")?.textContent?.trim()
        .length ?? 0) > 0,
    undefined,
    { timeout: 30_000 },
  );
  await journeyPage.waitForFunction(
    () =>
      (document.getElementById("bsport-widget-29534")?.textContent?.trim()
        .length ?? 0) > 0,
    undefined,
    { timeout: 30_000 },
  );
  await journeyPage.waitForTimeout(5_000);
  assert(
    (await journeyPage.locator('[data-widget-fallback="error"]').count()) === 0,
    "The shop failed after switching from German to English.",
  );

  await journeyContext.close();

  const languageBrowser = await chromium.launch({
    executablePath,
    headless: true,
  });

  try {
    const languageContext = await languageBrowser.newContext({
      locale: "de-DE",
      viewport: { width: 1440, height: 1000 },
    });
    const languagePage = await languageContext.newPage();

    await languagePage.goto(new URL("/de/schedule", baseUrl).href, {
      waitUntil: "domcontentloaded",
    });
    await languagePage
      .locator("#bsport-widget-368485")
      .getByText("Aktivität", { exact: true })
      .waitFor({ timeout: 30_000 });
    await languagePage
      .locator('a[href="/en/schedule"]:visible')
      .first()
      .click();
    await languagePage.waitForURL("**/en/schedule");
    await languagePage
      .locator("#bsport-widget-368485")
      .getByText("Activity", { exact: true })
      .waitFor({ timeout: 30_000 });
    await languagePage.waitForTimeout(1_000);

    const englishCalendarText = await languagePage
      .locator("#bsport-widget-368485")
      .innerText();
    assert(
      englishCalendarText.includes("Monday") &&
        !englishCalendarText.includes("Montag"),
      "The calendar kept German weekday names after switching to English.",
    );

    await languageContext.close();
  } finally {
    await languageBrowser.close();
  }
} finally {
  await browser.close();
}

console.log(
  `bsport production widgets mounted directly and after route/language navigation. Screenshots: ${screenshotDirectory}`,
);
