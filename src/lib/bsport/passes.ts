export type MonthlyPass = Readonly<{
  checkoutUrl: string;
  id: string;
  name: string;
  price: number;
  sessions: number | "unlimited";
  validityMonths: number;
}>;

export const trialSessionPassCheckoutUrl =
  "https://backoffice.bsport.io/customer/payment/pass/795677/?membership=6720&force=true";

export const monthlyPasses: readonly MonthlyPass[] = [
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/795480/?membership=6720&force=true",
    id: "single-drop-in",
    name: "Single Drop In",
    price: 25,
    sessions: 1,
    validityMonths: 1,
  },
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/795521/?membership=6720&force=true",
    id: "five-session-pass",
    name: "5 x Pass",
    price: 115,
    sessions: 5,
    validityMonths: 3,
  },
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/795523/?membership=6720&force=true",
    id: "ten-session-pass",
    name: "10 x Pass",
    price: 200,
    sessions: 10,
    validityMonths: 3,
  },
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/795527/?membership=6720&force=true",
    id: "twenty-session-pass",
    name: "20 x Pass",
    price: 350,
    sessions: 20,
    validityMonths: 6,
  },
  {
    checkoutUrl:
      "https://backoffice.bsport.io/customer/payment/pass/795529/?membership=6720&force=true",
    id: "fifty-session-pass",
    name: "50 x Pass",
    price: 750,
    sessions: 50,
    validityMonths: 6,
  },
];
