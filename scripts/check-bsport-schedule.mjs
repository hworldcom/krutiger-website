import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import { chromium } from "playwright-core";

const baseUrl = new URL(process.env.QA_BASE_URL || "http://localhost:3000");
const scriptUrl = "https://cdn.staging.bsport.io/scripts/widget.js";
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
      screenshot: "bsport-schedule-de.jpg",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "en",
      browserLocale: "en-GB",
      screenshot: "bsport-schedule-en.jpg",
      viewport: { width: 1440, height: 1000 },
    },
    {
      locale: "de",
      browserLocale: "de-DE",
      screenshot: "bsport-schedule-mobile.jpg",
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
    assert(
      (await page.locator(`script[src="${scriptUrl}"]`).count()) === 0,
      "The bsport script loaded before a schedule route was opened.",
    );

    await page.goto(new URL(`/${check.locale}/schedule`, baseUrl).href, {
      waitUntil: "domcontentloaded",
    });
    await page.locator("#bsport-widget-163824").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () =>
        document.querySelector("#bsport-widget-163824")?.childElementCount > 0,
      undefined,
      { timeout: 30_000 },
    );
    await page.waitForTimeout(8_000);

    const result = await page.evaluate(() => ({
      hasApi: typeof window.BsportWidget?.mount === "function",
      mountedChildren:
        document.querySelector("#bsport-widget-163824")?.childElementCount ?? 0,
      hasError: Boolean(document.querySelector('[role="alert"]')),
      textLength:
        document.querySelector("#bsport-widget-163824")?.textContent?.trim()
          .length ?? 0,
    }));

    assert(
      result.hasApi,
      `The bsport API was not available on /${check.locale}/schedule.`,
    );
    assert(
      result.mountedChildren > 0,
      `The bsport calendar did not mount on /${check.locale}/schedule.`,
    );
    assert(!result.hasError, `The localized widget fallback reports an error.`);
    assert(
      result.textLength > 0,
      `The bsport calendar mounted on /${check.locale}/schedule but did not finish rendering content.`,
    );

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    assert(
      overflow <= 1,
      `The bsport calendar causes ${overflow}px of horizontal page overflow at ${check.viewport.width}px.`,
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
  `bsport staging calendar mounted in German and English routes. Screenshots: ${screenshotDirectory}`,
);
