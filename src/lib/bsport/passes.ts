export type MonthlyPass = Readonly<{
  checkoutUrl: string;
  id: string;
  name: string;
  price: number;
  sessions: number | "unlimited";
}>;

export const monthlyPassValidityMonths = 1;

export const monthlyPasses: readonly MonthlyPass[] = [
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/792602/?membership=6720&force=true",
    id: "basic-monthly-pass",
    name: "Basic",
    price: 100,
    sessions: 4,
  },
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/792752/?membership=6720&force=true",
    id: "flex-monthly-pass",
    name: "Flex",
    price: 150,
    sessions: 8,
  },
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/792761/?membership=6720&force=true",
    id: "plus-monthly-pass",
    name: "Plus",
    price: 200,
    sessions: 12,
  },
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/792762/?membership=6720&force=true",
    id: "unlimited-monthly-pass",
    name: "Unlimited",
    price: 250,
    sessions: "unlimited",
  },
];
