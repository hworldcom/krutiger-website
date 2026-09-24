export const membershipDurations = [24, 12, 6, 3] as const;

export type MembershipDuration = (typeof membershipDurations)[number];

export const membershipAudiences = ["adult", "student", "kid"] as const;

export type MembershipAudience = (typeof membershipAudiences)[number];

export type MembershipBenefit =
  "muayThai" | "openGym" | "yoga" | "strengthConditioning" | "mobility";

export type MembershipPlan = Readonly<{
  id: string;
  audience: MembershipAudience;
  name: string;
  monthlyPrice: number;
  durationMonths: MembershipDuration;
  monthlySessions: number | "unlimited";
  benefits: readonly MembershipBenefit[];
  checkoutUrl: string;
}>;

type AdultMembershipPlan = Omit<MembershipPlan, "audience">;

function asAdultMemberships(
  memberships: readonly AdultMembershipPlan[],
): readonly MembershipPlan[] {
  return memberships.map((membership) => ({
    ...membership,
    audience: "adult",
  }));
}

type AudienceMembershipTier = Readonly<{
  id: string;
  name: string;
  monthlySessions: number | "unlimited";
  monthlyPrices: Readonly<Record<MembershipDuration, number>>;
  checkoutIds: Readonly<Record<MembershipDuration, number>>;
}>;

const kidMembershipTiers: readonly AudienceMembershipTier[] = [
  {
    id: "basic",
    name: "Basic",
    monthlySessions: 4,
    monthlyPrices: { 24: 39, 12: 49, 6: 59, 3: 69 },
    checkoutIds: { 24: 56117, 12: 56116, 6: 56115, 3: 56114 },
  },
  {
    id: "flex",
    name: "Flex",
    monthlySessions: 8,
    monthlyPrices: { 24: 59, 12: 69, 6: 79, 3: 89 },
    checkoutIds: { 24: 56124, 12: 56123, 6: 56122, 3: 56121 },
  },
  {
    id: "plus",
    name: "Plus",
    monthlySessions: 12,
    monthlyPrices: { 24: 69, 12: 89, 6: 99, 3: 109 },
    checkoutIds: { 24: 56129, 12: 56128, 6: 56127, 3: 56125 },
  },
  {
    id: "unlimited",
    name: "Unlimited",
    monthlySessions: "unlimited",
    monthlyPrices: { 24: 89, 12: 109, 6: 119, 3: 129 },
    checkoutIds: { 24: 56133, 12: 56132, 6: 56131, 3: 56130 },
  },
];

const studentMembershipTiers: readonly AudienceMembershipTier[] = [
  {
    id: "basic",
    name: "Basic",
    monthlySessions: 4,
    monthlyPrices: { 24: 39, 12: 59, 6: 69, 3: 79 },
    checkoutIds: { 24: 56092, 12: 56091, 6: 56090, 3: 56089 },
  },
  {
    id: "flex",
    name: "Flex",
    monthlySessions: 8,
    monthlyPrices: { 24: 59, 12: 79, 6: 89, 3: 99 },
    checkoutIds: { 24: 56097, 12: 56096, 6: 56095, 3: 56094 },
  },
  {
    id: "plus",
    name: "Plus",
    monthlySessions: 12,
    monthlyPrices: { 24: 79, 12: 99, 6: 109, 3: 119 },
    checkoutIds: { 24: 56101, 12: 56100, 6: 56099, 3: 56098 },
  },
  {
    id: "unlimited",
    name: "Unlimited",
    monthlySessions: "unlimited",
    monthlyPrices: { 24: 99, 12: 119, 6: 129, 3: 139 },
    checkoutIds: { 24: 56105, 12: 56104, 6: 56103, 3: 56102 },
  },
];

function createKidMemberships(
  durationMonths: MembershipDuration,
): readonly MembershipPlan[] {
  return kidMembershipTiers.map((tier) => ({
    id: `kids-${tier.id}-${durationMonths}`,
    audience: "kid",
    name: tier.name,
    monthlyPrice: tier.monthlyPrices[durationMonths],
    durationMonths,
    monthlySessions: tier.monthlySessions,
    benefits: ["muayThai"],
    checkoutUrl: `https://backoffice.bsport.io/checkout/6720/subscription/${tier.checkoutIds[durationMonths]}?force=true`,
  }));
}

function createStudentMemberships(
  durationMonths: MembershipDuration,
): readonly MembershipPlan[] {
  return studentMembershipTiers.map((tier) => ({
    id: `students-${tier.id}-${durationMonths}`,
    audience: "student",
    name: tier.name,
    monthlyPrice: tier.monthlyPrices[durationMonths],
    durationMonths,
    monthlySessions: tier.monthlySessions,
    benefits: ["muayThai", "yoga", "strengthConditioning", "mobility"],
    checkoutUrl: `https://backoffice.bsport.io/checkout/6720/subscription/${tier.checkoutIds[durationMonths]}?force=true`,
  }));
}

export const membershipTerms = {
  billingDay: 3,
  joiningFee: 29,
} as const;

const sharedClassBenefits = [
  "muayThai",
  "yoga",
  "strengthConditioning",
  "mobility",
] as const satisfies readonly MembershipBenefit[];

const adultMembershipsByDuration: Readonly<
  Record<MembershipDuration, readonly MembershipPlan[]>
> = {
  24: asAdultMemberships([
    {
      id: "basic-24",
      name: "Basic",
      monthlyPrice: 49,
      durationMonths: 24,
      monthlySessions: 4,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55692?force=true",
    },
    {
      id: "flex-24",
      name: "Flex",
      monthlyPrice: 69,
      durationMonths: 24,
      monthlySessions: 8,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55693?force=true",
    },
    {
      id: "plus-24",
      name: "Plus",
      monthlyPrice: 89,
      durationMonths: 24,
      monthlySessions: 12,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55694?force=true",
    },
    {
      id: "unlimited-24",
      name: "Unlimited",
      monthlyPrice: 109,
      durationMonths: 24,
      monthlySessions: "unlimited",
      benefits: [
        "muayThai",
        "openGym",
        "yoga",
        "strengthConditioning",
        "mobility",
      ],
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55695?force=true",
    },
  ]),
  12: asAdultMemberships([
    {
      id: "basic-12",
      name: "Basic",
      monthlyPrice: 69,
      durationMonths: 12,
      monthlySessions: 4,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55347?force=true",
    },
    {
      id: "flex-12",
      name: "Flex",
      monthlyPrice: 89,
      durationMonths: 12,
      monthlySessions: 8,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55344?force=true",
    },
    {
      id: "plus-12",
      name: "Plus",
      monthlyPrice: 109,
      durationMonths: 12,
      monthlySessions: 12,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55350?force=true",
    },
    {
      id: "unlimited-12",
      name: "Unlimited",
      monthlyPrice: 129,
      durationMonths: 12,
      monthlySessions: "unlimited",
      benefits: [
        "muayThai",
        "openGym",
        "yoga",
        "strengthConditioning",
        "mobility",
      ],
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55353?force=true",
    },
  ]),
  6: asAdultMemberships([
    {
      id: "basic-6",
      name: "Basic",
      monthlyPrice: 79,
      durationMonths: 6,
      monthlySessions: 4,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55346?force=true",
    },
    {
      id: "flex-6",
      name: "Flex",
      monthlyPrice: 99,
      durationMonths: 6,
      monthlySessions: 8,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55343?force=true",
    },
    {
      id: "plus-6",
      name: "Plus",
      monthlyPrice: 119,
      durationMonths: 6,
      monthlySessions: 12,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55349?force=true",
    },
    {
      id: "unlimited-6",
      name: "Unlimited",
      monthlyPrice: 139,
      durationMonths: 6,
      monthlySessions: "unlimited",
      benefits: [
        "muayThai",
        "openGym",
        "yoga",
        "strengthConditioning",
        "mobility",
      ],
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55352?force=true",
    },
  ]),
  3: asAdultMemberships([
    {
      id: "basic-3",
      name: "Basic",
      monthlyPrice: 89,
      durationMonths: 3,
      monthlySessions: 4,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55345?force=true",
    },
    {
      id: "flex-3",
      name: "Flex",
      monthlyPrice: 109,
      durationMonths: 3,
      monthlySessions: 8,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55342?force=true",
    },
    {
      id: "plus-3",
      name: "Plus",
      monthlyPrice: 129,
      durationMonths: 3,
      monthlySessions: 12,
      benefits: sharedClassBenefits,
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55348?force=true",
    },
    {
      id: "unlimited-3",
      name: "Unlimited",
      monthlyPrice: 149,
      durationMonths: 3,
      monthlySessions: "unlimited",
      benefits: [
        "muayThai",
        "openGym",
        "yoga",
        "strengthConditioning",
        "mobility",
      ],
      checkoutUrl:
        "https://backoffice.bsport.io/checkout/6720/subscription/55351?force=true",
    },
  ]),
};

export const membershipsByDuration = {
  24: [
    ...adultMembershipsByDuration[24],
    ...createStudentMemberships(24),
    ...createKidMemberships(24),
  ],
  12: [
    ...adultMembershipsByDuration[12],
    ...createStudentMemberships(12),
    ...createKidMemberships(12),
  ],
  6: [
    ...adultMembershipsByDuration[6],
    ...createStudentMemberships(6),
    ...createKidMemberships(6),
  ],
  3: [
    ...adultMembershipsByDuration[3],
    ...createStudentMemberships(3),
    ...createKidMemberships(3),
  ],
} satisfies Readonly<Record<MembershipDuration, readonly MembershipPlan[]>>;
