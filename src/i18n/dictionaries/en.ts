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
        "From clean foundations to demanding technical work, choose the training that matches your experience and progress step by step.",
    },
    schedule: {
      navigationLabel: "Schedule",
      eyebrow: "Schedule",
      title: "Plan your next training session",
      description:
        "View the current schedule and start your booking directly through bsport.",
    },
    prices: {
      navigationLabel: "Prices",
      eyebrow: "Prices",
      title: "Memberships and training passes",
      description:
        "Verified memberships, passes, and conditions will be presented here for clear comparison.",
    },
    shop: {
      navigationLabel: "Shop",
      eyebrow: "KRUTIGER Shop",
      title: "Training gear and KRUTIGER products",
      description:
        "Discover the products currently available and order them directly through bsport.",
    },
    coaches: {
      navigationLabel: "Team",
      eyebrow: "Coaching team",
      title: "Meet the people behind the training",
      description:
        "Meet the people who share traditional Muay Thai at KRUTIGER with experience, clarity, and respect.",
    },
    about: {
      navigationLabel: "About",
      eyebrow: "About KRUTIGER",
      title: "Real Muay Thai. Real roots.",
      description:
        "Kru Tiger stands for traditional Muay Thai, shaped by years of experience in Thailand and now passed on in Berlin.",
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
    memberArea: {
      navigationLabel: "Member area",
      eyebrow: "For members",
      title: "Your member area",
      description: "Sign in through bsport to open your personal member area.",
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
  homePage: {
    hero: {
      eyebrow: "Traditional Muay Thai · Berlin",
      titleLines: ["Authentic", "Muay Thai", "in Berlin"],
      introduction:
        "Real Muay Thai in an open and respectful atmosphere. Discipline, respect, and solidarity—values we live by in training and beyond.",
      imageAlt:
        "Kru Tiger gives a thumbs-up inside a Muay Thai gym in Thailand.",
      trialAction: "Request a trial class",
      scheduleAction: "View schedule",
    },
    schedule: {
      title: "Today at Kru Tiger",
      action: "View schedule",
      loading: "Today's classes are loading…",
      error:
        "Today's classes could not be loaded right now. Open the schedule for all current times.",
      empty: "There are no classes today. Next available classes:",
      nextLoading: "The next classes are loading…",
      nextUnavailable:
        "No upcoming classes could be found right now. Open the schedule for all sessions.",
      allLevels: "All levels",
      location: {
        district: "Kreuzberg",
        addressLineOne: "Melechstr. 11",
        addressLineTwo: "10961 Berlin",
      },
    },
    values: {
      eyebrow: "Why Kru Tiger?",
      titlePrimary: "More than training.",
      titleAccent: "A culture.",
      introduction:
        "Learn authentic Muay Thai in an open and respectful environment. Whether you are a beginner or a fighter, you will find a team that supports your path.",
      items: [
        {
          title: "Authentic",
          description: "Traditional Muay Thai in the Thai lineage.",
        },
        {
          title: "For every level",
          description:
            "From first session to competition—we coach you individually.",
        },
        {
          title: "Community",
          description: "Respect, discipline, and solidarity as a team.",
        },
        {
          title: "Experienced coaches",
          description: "Learn from experienced Kru and fighters.",
        },
      ],
    },
  },
  aboutPage: {
    hero: {
      eyebrow: "The story of KRUTIGER",
      titlePrimary: "Real Muay Thai.",
      titleSecondary: "Real roots.",
      introduction:
        "Kru Tiger stands for traditional Muay Thai, shaped by years of experience in Thailand and now passed on in Berlin.",
      imageAlt:
        "Kru Tiger sits with championship belts and medals in a Muay Thai ring in Thailand.",
    },
    storyHeading: "The story of Kru Tiger",
    chapters: [
      {
        number: "01",
        title: "Kru Tiger",
        description:
          "For Kru Tiger, Muay Thai is more than a sport. It is a path that has accompanied him since his youth—as a fighter, coach, and Kru.",
        accent: "Fighter · Coach · Kru",
        imageAlt:
          "Historic newspaper clipping showing two Muay Thai fighters in the ring.",
      },
      {
        number: "02",
        title: "Roots in Thailand",
        description:
          "Years in the ring, training in Thailand, and experience from a time when Muay Thai shaped everyday life.",
        accent: "Thailand · Training · Daily life",
        imageAlt:
          "Historic group photograph of a young Muay Thai fighter with his team.",
      },
      {
        number: "03",
        title: "Experience in the ring",
        description:
          "Technique is learned in training. Calm, timing, and an understanding of the fight come through experience.",
        accent: "Technique · Timing · Calm",
        imageAlt: "Historic color photograph of a Muay Thai bout in the ring.",
      },
      {
        number: "04",
        title: "From Thailand to Berlin",
        description:
          "What was learned in Thailand’s rings is now passed on in Berlin—technique, discipline, respect, and the culture of Muay Thai.",
        accent: "In Berlin today",
        imageAlt:
          "Thai newspaper profile featuring a portrait of a Muay Thai fighter.",
        secondaryImageAlt:
          "Historic group photograph of Kru Tiger with fighters and companions after a bout.",
      },
    ],
    philosophy: {
      number: "05",
      title: "Our philosophy",
      values: [
        {
          title: "Technique",
          description: "Clean foundations before unnecessary complexity.",
        },
        {
          title: "Discipline",
          description: "Consistency and full attention in training.",
        },
        {
          title: "Respect",
          description:
            "Mutual respect for coaches, training partners, and the tradition.",
        },
        {
          title: "Community",
          description: "Improving together, regardless of experience level.",
        },
      ],
    },
  },
  teamPage: {
    sectionHeading: "The team",
    specialtiesLabel: "Focus areas",
    socialLinkAction: "View profile",
    socialLinkLabel: "Open {name}'s social profile",
  },
  trainingPage: {
    sectionHeading: "Our classes",
    sectionIntroduction:
      "Four formats provide a clear starting point and room to progress. If you are unsure which level fits, speak with our coaching team before training.",
    levelLabels: {
      beginners: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
      allLevels: "All levels",
    },
    duration: "Typically {minutes} min",
    audienceLabel: "Who is it for?",
    equipmentLabel: "Recommended equipment",
    scheduleActionLabel: "Open the schedule for {name}",
    scheduleNotice:
      "These cards describe our training formats. Current dates, coaches, and available places are always shown in the live schedule.",
  },
  integrations: {
    schedule: {
      heading: "Live schedule",
      description:
        "Classes, times, and available places are loaded directly from bsport. Booking continues in the bsport system.",
      loading: "The live schedule is loading…",
      error:
        "The live schedule could not be loaded right now. Please try again later.",
    },
    memberArea: {
      heading: "Sign in with bsport",
      description:
        "Your sign-in and personal membership account are provided securely by bsport.",
      loading: "The member sign-in is loading…",
      error:
        "The member sign-in could not be loaded right now. Please try again later.",
    },
    pricing: {
      heading: "Memberships",
      description:
        "Choose the contract length and membership that suit your training.",
      secureCheckoutNotice:
        "Payment and checkout for all memberships and passes are handled securely through bSport.",
      termsLabel: "Applies to all memberships",
      loading: "The current prices are loading…",
      error:
        "The prices could not be loaded right now. Please try again later.",
      durationSelectorLabel: "Choose a membership duration",
      durationLabels: {
        12: "12 months",
        6: "6 months",
        3: "3 months",
      },
      membershipLabel: "Membership",
      perMonth: "/ month",
      billingDay: "Billed on the {day}st of each month",
      joiningFee: "Joining fee",
      autoRenewal:
        "Your membership renews automatically after the selected contract term unless cancelled in time.",
      monthlyAccess: "{count} sessions per month for:",
      unlimitedAccess: "Unlimited access to:",
      benefits: {
        muayThai: "All Muay Thai classes",
        openGym: "Open Gym",
        yoga: "Yoga classes",
        strengthConditioning: "Strength and Conditioning",
        mobility: "Mobility classes",
      },
      bookAction: "Book now",
      unavailableHeading: "Plans coming soon",
      unavailableDescription:
        "Memberships for this duration will be added as soon as the confirmed terms and checkout links are available.",
      monthlyPasses: {
        heading: "Monthly passes",
        description: "Choose the pass that matches your training rhythm.",
        validityLabel: "Validity",
        validity: "Valid for {count} month from the billing date.",
        passLabel: "Monthly pass",
        sessions: "{count} sessions",
        unlimitedSessions: "Unlimited sessions",
        buyAction: "Buy pass",
      },
    },
    shop: {
      heading: "Shop with bsport",
      description:
        "Available products are loaded directly from bsport. Your order continues securely in the bsport system.",
      loading: "The shop is loading…",
      error: "The shop could not be loaded right now. Please try again later.",
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
  draftMode: {
    landmarkLabel: "Draft preview",
    status:
      "Draft preview is active. You are viewing unpublished Sanity content.",
    exitAction: "Exit preview",
    incompleteContent:
      "This draft is incomplete or invalid for the selected language. The page is showing its local fallback until the marked fields are corrected.",
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
