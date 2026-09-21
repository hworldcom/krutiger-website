import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

import { chromium } from "playwright-core";

const baseUrl = new URL(process.env.QA_BASE_URL || "http://localhost:3000");
const expectedOrigin = (
  process.env.QA_EXPECTED_SITE_ORIGIN || baseUrl.origin
).replace(/\/$/, "");
const screenshotDirectory = join(process.cwd(), ".next", "quality-screenshots");
const chromeCandidates = [
  process.env.BROWSER_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const executablePath = chromeCandidates.find((candidate) =>
  existsSync(candidate),
);

if (!executablePath) {
  throw new Error(
    "No Chrome/Chromium executable was found. Set BROWSER_EXECUTABLE_PATH.",
  );
}

const viewports = [
  { name: "mobile-280", width: 280, height: 720 },
  { name: "mobile-320", width: 320, height: 800 },
  { name: "iphone", width: 390, height: 844 },
  { name: "android", width: 412, height: 915 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];
const routes = [
  "/",
  "/training",
  "/private",
  "/schedule",
  "/prices",
  "/shop",
  "/coaches",
  "/about",
  "/faq",
  "/contact",
  "/member-area",
  "/gift-cards",
  "/impressum",
  "/datenschutz",
];
const locales = ["de", "en"];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function localizedUrl(locale, route = "/") {
  return new URL(`/${locale}${route === "/" ? "" : route}`, baseUrl).href;
}

async function openPage(page, url) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });

  assert(response?.ok(), `${url} returned HTTP ${response?.status() ?? "?"}.`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
}

async function checkNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const overflowAmount = document.documentElement.scrollWidth - viewportWidth;
    const offenders = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rectangle = element.getBoundingClientRect();
        return rectangle.right > viewportWidth + 1 || rectangle.left < -1;
      })
      .slice(0, 5)
      .map((element) => ({
        element: element.tagName.toLowerCase(),
        className: element.getAttribute("class") || "",
      }));

    return { overflowAmount, offenders };
  });

  assert(
    overflow.overflowAmount <= 1,
    `${label} overflows horizontally by ${overflow.overflowAmount}px: ${JSON.stringify(overflow.offenders)}`,
  );
}

async function checkNoClippedPricingText(page, label) {
  const clippedText = await page.evaluate(() => {
    const cards = [
      ...document.querySelectorAll(
        "[data-membership-pricing] article, [data-monthly-pass-pricing] article",
      ),
    ];

    return cards.flatMap((card) => {
      const cardRectangle = card.getBoundingClientRect();

      return [...card.querySelectorAll("h3, p, li span, a")]
        .filter((element) => element.textContent?.trim())
        .flatMap((element) => {
          const range = document.createRange();
          range.selectNodeContents(element);
          const textRectangle = range.getBoundingClientRect();

          if (
            textRectangle.left >= cardRectangle.left - 1 &&
            textRectangle.right <= cardRectangle.right + 1
          ) {
            return [];
          }

          return [
            {
              element: element.tagName.toLowerCase(),
              text: element.textContent?.trim().replace(/\s+/g, " "),
            },
          ];
        });
    });
  });

  assert(
    clippedText.length === 0,
    `${label} clips pricing text: ${JSON.stringify(clippedText.slice(0, 5))}`,
  );
}

async function checkPricingOfferTabs(page, label) {
  const membershipTab = page.locator("#pricing-offer-tab-memberships");
  const passesTab = page.locator("#pricing-offer-tab-passes");

  assert(
    (await membershipTab.getAttribute("aria-selected")) === "true",
    `${label} does not select memberships by default.`,
  );

  await passesTab.click();

  assert(
    (await passesTab.getAttribute("aria-selected")) === "true",
    `${label} did not select the passes tab.`,
  );
  assert(
    (await page.locator("#pricing-offer-panel-passes article").count()) === 5,
    `${label} does not show the five training passes.`,
  );

  await checkNoHorizontalOverflow(page, `${label} passes tab`);
  await membershipTab.click();
}

async function loadLazyImages(page) {
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.75, 320);

    for (
      let position = 0;
      position < document.body.scrollHeight;
      position += step
    ) {
      window.scrollTo(0, position);
      await new Promise((resolve) => window.setTimeout(resolve, 40));
    }

    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
}

await mkdir(screenshotDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    for (const locale of locales) {
      for (const route of [
        "/",
        "/training",
        "/private",
        "/prices",
        "/about",
        "/coaches",
        "/contact",
        "/member-area",
      ]) {
        const url = localizedUrl(locale, route);
        await openPage(page, url);
        await checkNoHorizontalOverflow(
          page,
          `${locale}${route} at ${viewport.name}`,
        );
        if (route === "/prices") {
          await checkPricingOfferTabs(
            page,
            `${locale}${route} at ${viewport.name}`,
          );
        }

        const language = await page.locator("html").getAttribute("lang");
        assert(
          language === locale,
          `${url} has document language ${language}.`,
        );

        if (locale === "de") {
          await loadLazyImages(page);
          const routeName = route === "/" ? "home" : route.slice(1);
          const screenshotName = `${viewport.name}-${routeName}.jpg`;
          await page.screenshot({
            fullPage: true,
            path: join(screenshotDirectory, screenshotName),
            quality: 65,
            type: "jpeg",
          });
        }
      }
    }

    await context.close();
  }

  const enlargedTextContext = await browser.newContext({
    locale: "de-DE",
    viewport: { width: 320, height: 800 },
  });
  const enlargedTextPage = await enlargedTextContext.newPage();

  await openPage(enlargedTextPage, localizedUrl("de", "/prices"));
  await enlargedTextPage.addStyleTag({
    content: "html { font-size: 24px !important; }",
  });
  await checkNoClippedPricingText(
    enlargedTextPage,
    "de/prices memberships at 320px with 150% text scaling",
  );
  await enlargedTextPage.locator("#pricing-offer-tab-passes").click();
  await checkNoClippedPricingText(
    enlargedTextPage,
    "de/prices passes at 320px with 150% text scaling",
  );
  await enlargedTextContext.close();

  const metadataContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const metadataPage = await metadataContext.newPage();

  for (const locale of locales) {
    const titles = [];

    for (const route of routes) {
      const url = localizedUrl(locale, route);
      await openPage(metadataPage, url);
      titles.push(await metadataPage.title());

      const expectedCanonical = `${expectedOrigin}/${locale}${route === "/" ? "" : route}`;
      const canonical = await metadataPage
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      assert(
        canonical === expectedCanonical,
        `${url} canonical is ${canonical}; expected ${expectedCanonical}.`,
      );

      const openGraphUrl = await metadataPage
        .locator('meta[property="og:url"]')
        .getAttribute("content");
      const openGraphImage = await metadataPage
        .locator('meta[property="og:image"]')
        .first()
        .getAttribute("content");
      const twitterCard = await metadataPage
        .locator('meta[name="twitter:card"]')
        .getAttribute("content");
      const favicon = await metadataPage
        .locator('link[rel="icon"]')
        .first()
        .getAttribute("href");
      assert(
        openGraphUrl === expectedCanonical,
        `${url} has an incorrect og:url.`,
      );
      assert(
        openGraphImage === `${expectedOrigin}/images/home/main.png`,
        `${url} has an incorrect social preview image.`,
      );
      assert(
        twitterCard === "summary_large_image",
        `${url} has no large-image Twitter card metadata.`,
      );
      assert(
        favicon === "/images/home/kru-tiger-logo.png",
        `${url} does not expose the approved KRUTIGER logo as its icon.`,
      );

      for (const alternateLocale of locales) {
        const expectedAlternate = `${expectedOrigin}/${alternateLocale}${route === "/" ? "" : route}`;
        const alternate = await metadataPage
          .locator(`link[rel="alternate"][hreflang="${alternateLocale}"]`)
          .getAttribute("href");
        assert(
          alternate === expectedAlternate,
          `${url} ${alternateLocale} alternate is ${alternate}; expected ${expectedAlternate}.`,
        );
      }

      const defaultAlternate = await metadataPage
        .locator('link[rel="alternate"][hreflang="x-default"]')
        .getAttribute("href");
      const expectedDefault = `${expectedOrigin}/de${route === "/" ? "" : route}`;
      assert(
        defaultAlternate === expectedDefault,
        `${url} x-default alternate is ${defaultAlternate}; expected ${expectedDefault}.`,
      );
    }

    assert(
      new Set(titles).size === titles.length,
      `${locale} route titles are not unique: ${JSON.stringify(titles)}`,
    );
  }

  await metadataContext.close();

  const interactionContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const interactionPage = await interactionContext.newPage();
  await openPage(interactionPage, localizedUrl("de"));

  await interactionPage.keyboard.press("Tab");
  assert(
    (await interactionPage.locator(":focus").getAttribute("href")) ===
      "#main-content",
    "The skip link is not the first keyboard focus target.",
  );
  await interactionPage.keyboard.press("Enter");
  assert(
    await interactionPage
      .locator("#main-content")
      .evaluate((element) => element === document.activeElement),
    "Activating the skip link did not focus the main content.",
  );

  const menuButton = interactionPage.locator(
    'button[aria-controls="mobile-menu"]',
  );
  await menuButton.focus();
  await interactionPage.keyboard.press("Enter");
  assert(
    (await menuButton.getAttribute("aria-expanded")) === "true",
    "The mobile menu did not open from the keyboard.",
  );
  assert(
    await interactionPage
      .locator("#mobile-menu button")
      .first()
      .evaluate((element) => element === document.activeElement),
    "Opening the mobile menu did not move focus to its close control.",
  );
  await interactionPage.keyboard.press("Escape");
  await interactionPage.waitForFunction(
    () =>
      document
        .querySelector('button[aria-controls="mobile-menu"]')
        ?.getAttribute("aria-expanded") === "false",
  );
  assert(
    (await menuButton.getAttribute("aria-expanded")) === "false",
    "Escape did not close the mobile menu.",
  );
  assert(
    await menuButton.evaluate((element) => element === document.activeElement),
    "Closing the mobile menu did not restore focus to its trigger.",
  );
  await interactionContext.close();

  const reducedMotionContext = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 390, height: 844 },
  });
  const reducedMotionPage = await reducedMotionContext.newPage();
  await openPage(reducedMotionPage, localizedUrl("de"));
  const reducedMotion = await reducedMotionPage.evaluate(() => ({
    preferenceMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  assert(
    reducedMotion.preferenceMatches && reducedMotion.scrollBehavior === "auto",
    `Reduced-motion styles are not active: ${JSON.stringify(reducedMotion)}`,
  );
  await reducedMotionContext.close();

  // A 1440px desktop viewport at 200% browser zoom exposes roughly 720 CSS px.
  const zoomContext = await browser.newContext({
    viewport: { width: 720, height: 450 },
  });
  const zoomPage = await zoomContext.newPage();
  await openPage(zoomPage, localizedUrl("de"));
  await checkNoHorizontalOverflow(zoomPage, "de home at 200% zoom proxy");
  assert(
    await zoomPage.locator('button[aria-controls="mobile-menu"]').isVisible(),
    "The navigation does not reflow to its mobile control at the 200% zoom proxy.",
  );
  await zoomContext.close();
} finally {
  await browser.close();
}

console.log(
  `Browser quality checks passed. Screenshots: ${screenshotDirectory}`,
);
