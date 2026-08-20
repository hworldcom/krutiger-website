import type { Dictionary } from "./types";

const en = {
  metadata: {
    title: "KRUTIGER Muay Thai Berlin",
    description:
      "Authentic Muay Thai training in Berlin for beginners, advanced students, and fighters.",
  },
  locale: {
    currentLanguage: "English",
    currentLanguageLabel: "Current language",
    navigationLabel: "Language selection",
    languageNames: {
      de: "German",
      en: "English",
    },
    switchTo: {
      de: "Switch to the German version",
      en: "Switch to the English version",
    },
  },
  shell: {
    skipToContent: "Skip to main content",
    header: {
      homeLinkLabel: "Go to the KRUTIGER homepage",
      primaryNavigationLabel: "Primary navigation",
      secondaryNavigationLabel: "More pages",
      menuTitle: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      currentPage: "Current page",
      trialClassAction: "Ask about a trial class",
    },
    footer: {
      brandStatement:
        "Authentic Muay Thai with Thai roots, clear instruction, and an open training community in Berlin.",
      primaryNavigationLabel: "Training and services",
      secondaryNavigationLabel: "Information",
      contactHeading: "Contact and visit",
      addressLabel: "Address",
      mapAction: "View on map",
      emailLabel: "Email",
      phoneLabel: "Phone",
      openingHoursLabel: "Opening hours",
      socialHeading: "Follow KRUTIGER",
      instagramLinkLabel: "Open KRUTIGER on Instagram",
      legalNavigationLabel: "Legal information",
      placeholderDataLabel: "Development data",
      placeholderDataDescription:
        "The address, contact details, and opening hours are sample data and are not yet approved for visits or enquiries.",
      rightsStatement: "All rights reserved.",
    },
  },
  routes: {
    home: {
      navigationLabel: "Home",
      eyebrow: "KRUTIGER Muay Thai Berlin",
      title: "Authentic Muay Thai in Berlin",
      description:
        "Training with Thai roots, clear instruction, and an open community in Berlin.",
    },
    training: {
      navigationLabel: "Training",
      eyebrow: "Training options",
      title: "Find the right Muay Thai training",
      description:
        "This page will introduce training formats for beginners, advanced students, children, and private sessions.",
    },
    schedule: {
      navigationLabel: "Schedule",
      eyebrow: "Schedule",
      title: "Plan your next training session",
      description:
        "The current schedule and booking options will later be embedded directly from bsport.",
    },
    prices: {
      navigationLabel: "Prices",
      eyebrow: "Prices",
      title: "Memberships and training passes",
      description:
        "Verified memberships, passes, and conditions will be presented here for clear comparison.",
    },
    coaches: {
      navigationLabel: "Coaches",
      eyebrow: "Coaching team",
      title: "Meet the people behind the training",
      description:
        "This page will introduce Kru Tiger and the coaching team through their experience, focus, and personal background.",
    },
    about: {
      navigationLabel: "About",
      eyebrow: "About KRUTIGER",
      title: "Thai experience, Berlin community",
      description:
        "This page will tell the story, values, and training philosophy of KRUTIGER Muay Thai Berlin.",
    },
    faq: {
      navigationLabel: "FAQ",
      eyebrow: "Frequently asked questions",
      title: "Arrive prepared for your first session",
      description:
        "This page will answer practical questions about getting started, equipment, training, and what to expect.",
    },
    contact: {
      navigationLabel: "Contact",
      eyebrow: "Contact",
      title: "Get in touch with KRUTIGER",
      description:
        "Verified contact options, the gym address, and directions will be provided here.",
    },
    giftCards: {
      navigationLabel: "Gift cards",
      eyebrow: "Gift cards",
      title: "Give the gift of Muay Thai training",
      description:
        "Available gift cards and the purchase flow will later be connected through bsport.",
    },
    imprint: {
      navigationLabel: "Imprint",
      eyebrow: "Legal",
      title: "Imprint",
      description:
        "This page is reserved for current, legally reviewed provider information. Final details will follow before launch.",
    },
    privacy: {
      navigationLabel: "Privacy",
      eyebrow: "Legal",
      title: "Privacy policy",
      description:
        "This page is reserved for the current, legally reviewed privacy policy. The final text will follow before launch.",
    },
  },
  integrations: {
    schedule: {
      heading: "Live schedule coming later",
      description:
        "The bsport schedule will be embedded here once access is available. No class times or availability are currently displayed.",
    },
    pricing: {
      heading: "Verified prices and purchase links coming later",
      description:
        "Prices will only be published after confirmation. Purchases and memberships will later hand off securely to bsport.",
    },
    giftCards: {
      heading: "Gift-card purchases coming later",
      description:
        "Gift cards will later be sold through bsport. This preview does not simulate a purchase flow.",
    },
  },
  notFound: {
    eyebrow: "Error 404",
    title: "This page could not be found",
    description:
      "The address may no longer be valid, or it may have been entered incorrectly.",
    homeAction: "Go to homepage",
  },
  error: {
    eyebrow: "Technical error",
    title: "Something went wrong",
    description: "The page could not be loaded right now. Please try again.",
    retryAction: "Try again",
  },
  preview: {
    eyebrow: "Brand foundation · Milestone 1",
    heading: "Authentic Muay Thai in Berlin",
    introduction:
      "A clear, powerful foundation for Kru Tiger’s experience, Thai Muay Thai culture, and an open training community.",
    typographyAction: "View typography",
    paletteAction: "View color system",
    logoAlt:
      "Circular KRUTIGER Muay Thai Berlin badge featuring an illustrated tiger and Thai lettering",
    typography: {
      displayLabel: "Display type",
      displayDescription:
        "Compact and direct—reserved for headings, calls to action, labels, and strong numeric information.",
      bodyLabel: "Body type",
      bodyDescription:
        "Clear and highly legible for longer text: beginners, advanced students, fighters, and everyone who wants to discover Muay Thai.",
    },
    palette: {
      label: "Color system",
      heading: "Energy with discipline",
      introduction:
        "Orange leads every primary action. Black, warm ivory, and restrained red keep the identity recognizable without overwhelming the content.",
      swatches: {
        brand: "Brand",
        signal: "Signal",
        copy: "Copy",
        warmCanvas: "Warm canvas",
      },
      darkSurfaceHeading: "Dark-first surface",
      darkSurfaceDescription:
        "Strong contrast supports navigation, schedules, prices, and decisive calls to action.",
      lightSurfaceHeading: "Warm editorial surface",
      lightSurfaceDescription:
        "Light sections create rhythm for biographies, training explanations, and practical information.",
    },
  },
} satisfies Dictionary;

export default en;
