export const membershipDurations = [3, 6, 12] as const;

export const membershipBenefits = [
  { title: "Muay Thai classes", value: "muayThai" },
  { title: "Open Gym", value: "openGym" },
  { title: "Yoga classes", value: "yoga" },
  { title: "Strength and Conditioning", value: "strengthConditioning" },
  { title: "Mobility classes", value: "mobility" },
] as const;

export type PricingCardKind = "membership" | "monthlyPass";

const accessTypes = ["limited", "unlimited"] as const;
const membershipBenefitValues = membershipBenefits.map(({ value }) => value);

const checkoutUrlGuidance: Record<PricingCardKind, string> = {
  membership:
    "Use a KRUTIGER bSport membership URL in the format https://backoffice.bsport.io/checkout/6720/subscription/[product-id]?force=true.",
  monthlyPass:
    "Use a KRUTIGER bSport pass URL in the format https://backoffice.bsport.io/customer/payment/pass/[product-id]/?membership=6720&force=true.",
};

function hasOnlyExpectedParameters(
  url: URL,
  expected: Readonly<Record<string, string>>,
) {
  const actualKeys = [...url.searchParams.keys()];
  const expectedKeys = Object.keys(expected);

  return (
    actualKeys.length === expectedKeys.length &&
    expectedKeys.every(
      (key) =>
        actualKeys.filter((actualKey) => actualKey === key).length === 1 &&
        url.searchParams.get(key) === expected[key],
    )
  );
}

export function validateBsportCheckoutUrl(
  value: unknown,
  kind: PricingCardKind,
) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return true;
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return checkoutUrlGuidance[kind];
  }

  if (
    url.protocol !== "https:" ||
    url.hostname !== "backoffice.bsport.io" ||
    url.port ||
    url.username ||
    url.password ||
    url.hash
  ) {
    return checkoutUrlGuidance[kind];
  }

  if (kind === "membership") {
    const hasMembershipPath =
      /^\/checkout\/6720\/subscription\/[0-9]+\/?$/.test(url.pathname);

    return hasMembershipPath &&
      hasOnlyExpectedParameters(url, { force: "true" })
      ? true
      : checkoutUrlGuidance[kind];
  }

  const hasPassPath = /^\/customer\/payment\/pass\/[0-9]+\/?$/.test(
    url.pathname,
  );

  return hasPassPath &&
    hasOnlyExpectedParameters(url, { membership: "6720", force: "true" })
    ? true
    : checkoutUrlGuidance[kind];
}

export function validateMembershipDuration(value: unknown) {
  return membershipDurations.some((duration) => duration === value)
    ? true
    : "Choose a supported membership duration: 3, 6, or 12 months.";
}

export function validateAccessType(value: unknown) {
  return accessTypes.some((accessType) => accessType === value)
    ? true
    : "Choose Limited sessions or Unlimited sessions.";
}

export function validateMembershipBenefitSelection(value: unknown) {
  if (!Array.isArray(value)) {
    return true;
  }

  return value.every(
    (benefit) =>
      typeof benefit === "string" &&
      membershipBenefitValues.some((allowed) => allowed === benefit),
  )
    ? true
    : "Choose only the supported website benefit identifiers.";
}

export function validatePositiveInteger(value: unknown, label: string) {
  return typeof value === "number" && Number.isInteger(value) && value > 0
    ? true
    : `${label} must be a whole number greater than zero.`;
}

export function validateSessionAllowance(value: unknown, accessType: unknown) {
  if (accessType !== "limited") {
    return true;
  }

  return validatePositiveInteger(value, "Session allowance");
}

export function validateVerificationTimestamp(value: unknown) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return true;
  }

  const timestamp = Date.parse(value);

  if (Number.isNaN(timestamp)) {
    return "Enter a valid bSport verification date and time.";
  }

  return timestamp <= Date.now()
    ? true
    : "The bSport verification time cannot be in the future.";
}

export function formatEuroCents(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value > 0
    ? `€${(value / 100).toFixed(2)}`
    : "Price missing";
}

export function formatVerificationDate(value: unknown) {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
    return "Verification missing";
  }

  return `Verified ${value.slice(0, 10)}`;
}
