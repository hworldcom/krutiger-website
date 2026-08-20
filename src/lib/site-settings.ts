import type { Locale } from "../i18n/config";

export type ContactDataStatus = "placeholder" | "verified";

type LocalizedValue = Readonly<Record<Locale, string>>;

export type SiteSettings = Readonly<{
  contact: Readonly<{
    status: ContactDataStatus;
    address: Readonly<{
      lines: readonly string[];
      mapUrl: string;
    }>;
    email: Readonly<{
      displayValue: string;
      href: `mailto:${string}`;
    }>;
    phone: Readonly<{
      displayValue: string;
      href: `tel:${string}`;
    }>;
    openingHours: readonly Readonly<{
      days: LocalizedValue;
      hours: LocalizedValue;
    }>[];
  }>;
  social: Readonly<{
    instagram: Readonly<{
      handle: string;
      url: string;
    }>;
  }>;
}>;

export const siteSettings = {
  contact: {
    status: "placeholder",
    address: {
      lines: ["Musterstraße 24", "10999 Berlin"],
      mapUrl:
        "https://www.google.com/maps/search/?api=1&query=Musterstra%C3%9Fe+24%2C+10999+Berlin",
    },
    email: {
      displayValue: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    phone: {
      displayValue: "+49 30 00000000",
      href: "tel:+493000000000",
    },
    openingHours: [
      {
        days: {
          de: "Montag–Freitag",
          en: "Monday–Friday",
        },
        hours: {
          de: "16:00–22:00",
          en: "16:00–22:00",
        },
      },
      {
        days: {
          de: "Samstag",
          en: "Saturday",
        },
        hours: {
          de: "10:00–14:00",
          en: "10:00–14:00",
        },
      },
      {
        days: {
          de: "Sonntag",
          en: "Sunday",
        },
        hours: {
          de: "Geschlossen",
          en: "Closed",
        },
      },
    ],
  },
  social: {
    instagram: {
      handle: "@krutiger.muay_thai_in_berlin",
      url: "https://www.instagram.com/krutiger.muay_thai_in_berlin/",
    },
  },
} as const satisfies SiteSettings;
