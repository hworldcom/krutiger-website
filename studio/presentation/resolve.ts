import {
  defineLocations,
  type PresentationPluginOptions,
} from "sanity/presentation";

function bilingualLocations(path = "") {
  return defineLocations({
    locations: [
      { title: "German", href: `/de${path}` },
      { title: "English", href: `/en${path}` },
    ],
  });
}

export const presentationResolve = {
  locations: {
    siteSettings: defineLocations({
      locations: [
        { title: "German homepage", href: "/de" },
        { title: "English homepage", href: "/en" },
        { title: "German contact page", href: "/de/contact" },
        { title: "English contact page", href: "/en/contact" },
      ],
    }),
    homepage: bilingualLocations(),
    aboutPage: bilingualLocations("/about"),
    trainingPage: bilingualLocations("/training"),
    classType: bilingualLocations("/training"),
    teamPage: bilingualLocations("/coaches"),
    coach: bilingualLocations("/coaches"),
    faq: bilingualLocations("/faq"),
    pricingPage: bilingualLocations("/prices"),
    membershipCard: bilingualLocations("/prices"),
    monthlyPassCard: bilingualLocations("/prices"),
  },
} satisfies NonNullable<PresentationPluginOptions["resolve"]>;
