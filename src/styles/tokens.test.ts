import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const tokenCss = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");

function token(name: string) {
  const match = tokenCss.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));

  if (!match) {
    throw new Error(`Missing color token: ${name}`);
  }

  return match[1];
}

function relativeLuminance(hex: string) {
  const channels = hex
    .match(/[0-9a-f]{2}/gi)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  if (!channels || channels.length !== 3) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string) {
  const luminances = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((first, second) => second - first);

  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

describe("brand color tokens", () => {
  it.each([
    ["--krutiger-copy", "--krutiger-canvas"],
    ["--krutiger-copy-muted", "--krutiger-canvas"],
    ["--krutiger-brand-ink", "--krutiger-brand"],
    ["--krutiger-ink", "--krutiger-warm-canvas"],
    ["--krutiger-ink-muted", "--krutiger-warm-canvas"],
  ])("keeps %s accessible on %s", (foreground, background) => {
    expect(
      contrastRatio(token(foreground), token(background)),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps the focus color visible on raised panels", () => {
    expect(
      contrastRatio(
        token("--krutiger-focus"),
        token("--krutiger-panel-raised"),
      ),
    ).toBeGreaterThanOrEqual(3);
  });
});
