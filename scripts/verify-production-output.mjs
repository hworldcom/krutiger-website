import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const buildDirectory = join(process.cwd(), ".next");
const clientDirectory = join(buildDirectory, "static");
const serverAppDirectory = join(buildDirectory, "server", "app");

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? listFiles(path) : [path];
    }),
  );

  return files.flat();
}

function fail(message, files) {
  const locations = files
    .map((file) => relative(process.cwd(), file))
    .join(", ");

  throw new Error(`${message} Found in: ${locations}`);
}

async function findText(files, pattern) {
  const matches = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");

    if (
      typeof pattern === "string"
        ? content.includes(pattern)
        : pattern.test(content)
    ) {
      matches.push(file);
    }
  }

  return matches;
}

let clientFiles;

try {
  clientFiles = (await listFiles(clientDirectory)).filter((file) =>
    [".js", ".css"].includes(extname(file)),
  );
} catch {
  throw new Error(
    "No Next.js client build was found. Run this check after `next build`.",
  );
}

for (const variableName of ["SANITY_API_READ_TOKEN", "BSPORT_API_KEY"]) {
  const value = process.env[variableName];

  if (!value) {
    continue;
  }

  const matches = await findText(clientFiles, value);

  if (matches.length > 0) {
    fail(`${variableName} was exposed in generated client assets.`, matches);
  }
}

const forbiddenRuntimeSources = [
  "cdn.sanity.io",
  "api.sanity.io",
  "bsport.io/widget",
  "bsport.com/widget",
  "instagram.com/embed",
  "instagram.com/static/bundles",
  "googletagmanager.com/gtag/js",
  "google-analytics.com/analytics.js",
  "plausible.io/js/",
  "cdn.segment.com/analytics",
  "posthog.com/static",
];

for (const source of forbiddenRuntimeSources) {
  const matches = await findText(clientFiles, source);

  if (matches.length > 0) {
    fail(
      `Unexpected third-party runtime source (${source}) is in the client build.`,
      matches,
    );
  }
}

let renderedHtmlFiles = [];

try {
  renderedHtmlFiles = (await listFiles(serverAppDirectory)).filter(
    (file) => extname(file) === ".html",
  );
} catch {
  // A valid Next.js build may not emit prerendered HTML for every route.
}

const allowedExternalScripts = new Set([
  "https://cdn.staging.bsport.io/scripts/widget.js",
]);
const unexpectedExternalScriptFiles = [];
const misplacedBsportScriptFiles = [];

for (const file of renderedHtmlFiles) {
  const content = await readFile(file, "utf8");
  const sources = [
    ...content.matchAll(/<script\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["']/gi),
  ].map((match) => match[1]);

  if (sources.some((source) => !allowedExternalScripts.has(source))) {
    unexpectedExternalScriptFiles.push(file);
  }

  if (
    sources.includes("https://cdn.staging.bsport.io/scripts/widget.js") &&
    !relative(serverAppDirectory, file).includes("schedule")
  ) {
    misplacedBsportScriptFiles.push(file);
  }
}

if (unexpectedExternalScriptFiles.length > 0) {
  fail(
    "An unapproved external script is loaded by prerendered application HTML.",
    unexpectedExternalScriptFiles,
  );
}

if (misplacedBsportScriptFiles.length > 0) {
  fail(
    "The approved bsport widget script is loaded outside a schedule route.",
    misplacedBsportScriptFiles,
  );
}

console.log(
  `Production output verified: ${clientFiles.length} client assets and ${renderedHtmlFiles.length} prerendered HTML files checked.`,
);
