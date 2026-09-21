import { describe, expect, it } from "vitest";

import {
  membershipDurations,
  membershipsByDuration,
  type MembershipDuration,
} from "./memberships";

const expectedKidsPlans: Readonly<
  Record<
    MembershipDuration,
    readonly Readonly<{
      checkoutId: number;
      name: string;
      price: number;
    }>[]
  >
> = {
  24: [
    { name: "Basic", price: 39, checkoutId: 56117 },
    { name: "Flex", price: 59, checkoutId: 56124 },
    { name: "Plus", price: 69, checkoutId: 56129 },
    { name: "Unlimited", price: 89, checkoutId: 56133 },
  ],
  12: [
    { name: "Basic", price: 49, checkoutId: 56116 },
    { name: "Flex", price: 69, checkoutId: 56123 },
    { name: "Plus", price: 89, checkoutId: 56128 },
    { name: "Unlimited", price: 109, checkoutId: 56132 },
  ],
  6: [
    { name: "Basic", price: 59, checkoutId: 56115 },
    { name: "Flex", price: 79, checkoutId: 56122 },
    { name: "Plus", price: 99, checkoutId: 56127 },
    { name: "Unlimited", price: 119, checkoutId: 56131 },
  ],
  3: [
    { name: "Basic", price: 69, checkoutId: 56114 },
    { name: "Flex", price: 89, checkoutId: 56121 },
    { name: "Plus", price: 109, checkoutId: 56125 },
    { name: "Unlimited", price: 129, checkoutId: 56130 },
  ],
};

const expectedStudentPlans: typeof expectedKidsPlans = {
  24: [
    { name: "Basic", price: 39, checkoutId: 56092 },
    { name: "Flex", price: 59, checkoutId: 56097 },
    { name: "Plus", price: 79, checkoutId: 56101 },
    { name: "Unlimited", price: 99, checkoutId: 56105 },
  ],
  12: [
    { name: "Basic", price: 59, checkoutId: 56091 },
    { name: "Flex", price: 79, checkoutId: 56096 },
    { name: "Plus", price: 99, checkoutId: 56100 },
    { name: "Unlimited", price: 119, checkoutId: 56104 },
  ],
  6: [
    { name: "Basic", price: 69, checkoutId: 56090 },
    { name: "Flex", price: 89, checkoutId: 56095 },
    { name: "Plus", price: 109, checkoutId: 56099 },
    { name: "Unlimited", price: 129, checkoutId: 56103 },
  ],
  3: [
    { name: "Basic", price: 79, checkoutId: 56089 },
    { name: "Flex", price: 99, checkoutId: 56094 },
    { name: "Plus", price: 119, checkoutId: 56098 },
    { name: "Unlimited", price: 139, checkoutId: 56102 },
  ],
};

describe("Kids memberships", () => {
  it.each(membershipDurations)(
    "maps every %s-month plan to its verified price and checkout",
    (duration) => {
      const plans = membershipsByDuration[duration].filter(
        ({ audience }) => audience === "kid",
      );

      expect(plans).toHaveLength(4);
      expect(
        plans.map(({ benefits, checkoutUrl, monthlyPrice, name }) => ({
          benefits,
          checkoutId: Number(
            checkoutUrl.match(/subscription\/(\d+)/)?.[1] ?? 0,
          ),
          name,
          price: monthlyPrice,
        })),
      ).toEqual(
        expectedKidsPlans[duration].map((plan) => ({
          ...plan,
          benefits: ["muayThai"],
        })),
      );
    },
  );
});

describe("Student memberships", () => {
  it.each(membershipDurations)(
    "maps every %s-month plan to its verified price and checkout",
    (duration) => {
      const plans = membershipsByDuration[duration].filter(
        ({ audience }) => audience === "student",
      );

      expect(plans).toHaveLength(4);
      expect(
        plans.map(({ benefits, checkoutUrl, monthlyPrice, name }) => ({
          benefits,
          checkoutId: Number(
            checkoutUrl.match(/subscription\/(\d+)/)?.[1] ?? 0,
          ),
          name,
          price: monthlyPrice,
        })),
      ).toEqual(
        expectedStudentPlans[duration].map((plan) => ({
          ...plan,
          benefits: ["muayThai", "yoga", "strengthConditioning", "mobility"],
        })),
      );
    },
  );
});
