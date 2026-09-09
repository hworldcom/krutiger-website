import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright-core";

const baseUrl = new URL(process.env.QA_BASE_URL || "http://localhost:3000");
const productionScriptUrl = "https://cdn.bsport.io/scripts/widget.js";
const stagingScriptUrl = "https://cdn.staging.bsport.io/scripts/widget.js";
const scriptUrls = [productionScriptUrl, stagingScriptUrl];
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
      elementId: "bsport-widget-235346",
      route: "member-area",
      scriptUrl: stagingScriptUrl,
      screenshot: "bsport-member-area-de.jpg",
      widgetName: "member login",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "en",
      browserLocale: "en-GB",
      elementId: "bsport-widget-235346",
      route: "member-area",
      scriptUrl: stagingScriptUrl,
      screenshot: "bsport-member-area-mobile.jpg",
      widgetName: "member login",
      viewport: { width: 390, height: 844 },
    },
    {
      locale: "de",
      browserLocale: "de-DE",
      elementId: "bsport-widget-361765",
      route: "prices",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-pricing-de.jpg",
      widgetName: "pricing subscriptions",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "en",
      browserLocale: "en-GB",
      elementId: "bsport-widget-361765",
      route: "prices",
      scriptUrl: productionScriptUrl,
      screenshot: "bsport-pricing-mobile.jpg",
      widgetName: "pricing subscriptions",
      viewport: { width: 390, height: 844 },
    },
  ];

  for (const check of checks) {
    const context = await browser.newContext({
      locale: check.browserLocale,
      viewport: check.viewport,
    });
    const page = await context.newPage();
    const bsportRequestFailures = [];

    page.on("requestfailed", (request) => {
      const errorText = request.failure()?.errorText ?? "unknown error";
      const url = request.url();
      const isAbortedTelemetry =
        url.includes("/widget_config/log/") && errorText === "net::ERR_ABORTED";

      if (url.includes("bsport") && !isAbortedTelemetry) {
        bsportRequestFailures.push(`${url} (${errorText})`);
      }
    });

    await page.goto(new URL(`/${check.locale}`, baseUrl).href, {
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
        hasError: Boolean(document.querySelector('[role="alert"]')),
        textLength:
          document.getElementById(elementId)?.textContent?.trim().length ?? 0,
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
} finally {
  await browser.close();
}

console.log(
  `bsport production calendar/pricing and staging member login widgets mounted in localized routes. Screenshots: ${screenshotDirectory}`,
);
