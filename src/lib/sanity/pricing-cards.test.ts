import { describe, expect, it } from "vitest";

import {
  formatEuroCents,
  formatVerificationDate,
  validateAccessType,
  validateBsportCheckoutUrl,
  validateMembershipBenefitSelection,
  validateMembershipDuration,
  validatePositiveInteger,
  validateSessionAllowance,
  validateVerificationTimestamp,
} from "../../../studio/schemaTypes/pricingCards";

const membershipCheckout =
  "https://backoffice.bsport.io/checkout/6720/subscription/55347?force=true";
const passCheckout =
  "https://backoffice.bsport.io/customer/payment/pass/792602/?membership=6720&force=true";

describe("Sanity pricing-card validation", () => {
  it("accepts the current KRUTIGER bSport checkout shapes", () => {
    expect(validateBsportCheckoutUrl(membershipCheckout, "membership")).toBe(
      true,
    );
    expect(validateBsportCheckoutUrl(passCheckout, "monthlyPass")).toBe(true);
  });

  it.each([
    "https://example.com/checkout/6720/subscription/55347?force=true",
    "http://backoffice.bsport.io/checkout/6720/subscription/55347?force=true",
    "https://backoffice.bsport.io/checkout/14416/subscription/55347?force=true",
    "https://backoffice.bsport.io/checkout/6720/subscription/55347",
    "https://backoffice.bsport.io/checkout/6720/subscription/55347?force=true&redirect=https://example.com",
  ])("rejects the unsafe membership destination %s", (checkoutUrl) => {
    expect(validateBsportCheckoutUrl(checkoutUrl, "membership")).toMatch(
      /KRUTIGER bSport membership URL/,
    );
  });

  it.each([
    "https://example.com/customer/payment/pass/792602/?membership=6720&force=true",
    "https://backoffice.bsport.io/customer/payment/pass/792602/?membership=14416&force=true",
    "https://backoffice.bsport.io/customer/payment/pass/792602/?membership=6720",
    "https://backoffice.bsport.io/checkout/6720/subscription/55347?force=true",
  ])("rejects the unsafe pass destination %s", (checkoutUrl) => {
    expect(validateBsportCheckoutUrl(checkoutUrl, "monthlyPass")).toMatch(
      /KRUTIGER bSport pass URL/,
    );
  });

  it("accepts only the supported membership durations", () => {
    expect(validateMembershipDuration(3)).toBe(true);
    expect(validateMembershipDuration(6)).toBe(true);
    expect(validateMembershipDuration(12)).toBe(true);
    expect(validateMembershipDuration(24)).toBe(true);
    expect(validateMembershipDuration(1)).toMatch(/3, 6, 12, or 24/);
  });

  it("requires positive whole-number quantities for limited products", () => {
    expect(validatePositiveInteger(6900, "Price")).toBe(true);
    expect(validatePositiveInteger(69.5, "Price")).toBe(
      "Price must be a whole number greater than zero.",
    );
    expect(validateSessionAllowance(4, "limited")).toBe(true);
    expect(validateSessionAllowance(undefined, "limited")).toMatch(
      /Session allowance/,
    );
    expect(validateSessionAllowance(undefined, "unlimited")).toBe(true);
  });

  it("rejects unsupported access and benefit values", () => {
    expect(validateAccessType("limited")).toBe(true);
    expect(validateAccessType("unlimited")).toBe(true);
    expect(validateAccessType("drop-in")).toMatch(/Limited sessions/);
    expect(validateMembershipBenefitSelection(["muayThai", "openGym"])).toBe(
      true,
    );
    expect(validateMembershipBenefitSelection(["freeMerchandise"])).toMatch(
      /supported website benefit/,
    );
  });

  it("accepts only valid, non-future verification timestamps", () => {
    expect(validateVerificationTimestamp("2026-09-01T10:00:00Z")).toBe(true);
    expect(validateVerificationTimestamp("not-a-date")).toMatch(/valid/);
    expect(validateVerificationTimestamp("2999-01-01T00:00:00Z")).toMatch(
      /future/,
    );
  });

  it("formats price and verification values for Studio previews", () => {
    expect(formatEuroCents(6900)).toBe("€69.00");
    expect(formatEuroCents(undefined)).toBe("Price missing");
    expect(formatVerificationDate("2026-09-01T10:00:00Z")).toBe(
      "Verified 2026-09-01",
    );
    expect(formatVerificationDate(undefined)).toBe("Verification missing");
  });
});
