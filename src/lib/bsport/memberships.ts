export const membershipDurations = [24, 12, 6, 3] as const;

export type MembershipDuration = (typeof membershipDurations)[number];

export type MembershipBenefit =
  "muayThai" | "openGym" | "yoga" | "strengthConditioning" | "mobility";

export type MembershipPlan = Readonly<{
  id: string;
  name: string;
  monthlyPrice: number;
  durationMonths: MembershipDuration;
  monthlySessions: number | "unlimited";
  benefits: readonly MembershipBenefit[];
  checkoutUrl: string;
}>;

export const membershipTerms = {
  autoRenewal: true,
  billingDay: 3,
  joiningFee: 29,
} as const;

const sharedClassBenefits = [
  "muayThai",
  "yoga",
  "strengthConditioning",
  "mobility",
] as const satisfies readonly MembershipBenefit[];

export const membershipsByDuration: Readonly<
  Record<MembershipDuration, readonly MembershipPlan[]>
> = {
  24: [
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
  ],
  12: [
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
  ],
  6: [
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
  ],
  3: [
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
  ],
};
