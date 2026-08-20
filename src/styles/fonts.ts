import { Barlow_Condensed, Noto_Sans, Noto_Sans_Thai } from "next/font/google";

export const bodyFont = Noto_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
});

export const headingFont = Barlow_Condensed({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

export const thaiFont = Noto_Sans_Thai({
  display: "swap",
  subsets: ["thai"],
  variable: "--font-brand-thai",
  weight: ["700", "800"],
});
