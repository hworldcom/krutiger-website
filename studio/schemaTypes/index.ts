import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./documents/aboutPage";
import { classType } from "./documents/classType";
import { coach } from "./documents/coach";
import { faq } from "./documents/faq";
import { homepage } from "./documents/homepage";
import { kidsPage } from "./documents/kidsPage";
import { kidsBenefit, kidsClass, kidsFaq } from "./objects/kidsContent";
import { imprintPage, privacyPage } from "./documents/legalPage";
import { membershipCard } from "./documents/membershipCard";
import { monthlyPassCard } from "./documents/monthlyPassCard";
import { pricingPage } from "./documents/pricingPage";
import { schedulePage } from "./documents/schedulePage";
import { siteSettings } from "./documents/siteSettings";
import { teamPage } from "./documents/teamPage";
import { trainingPage } from "./documents/trainingPage";
import { aboutChapter, philosophyValue } from "./objects/aboutContent";
import { postalAddress, openingHoursEntry } from "./objects/contactDetails";
import { editorialImage } from "./objects/editorialImage";
import { homepageFeature } from "./objects/homepageFeature";
import {
  localizedAlternativeText,
  localizedRichText,
  localizedString,
  localizedText,
} from "./objects/localizedContent";
import { seoMetadata } from "./objects/seoMetadata";

export const schemaTypes: SchemaTypeDefinition[] = [
  localizedString,
  localizedText,
  localizedRichText,
  localizedAlternativeText,
  editorialImage,
  seoMetadata,
  postalAddress,
  openingHoursEntry,
  homepageFeature,
  aboutChapter,
  philosophyValue,
  kidsBenefit,
  kidsClass,
  kidsFaq,
  siteSettings,
  homepage,
  aboutPage,
  trainingPage,
  kidsPage,
  schedulePage,
  teamPage,
  pricingPage,
  imprintPage,
  privacyPage,
  classType,
  coach,
  faq,
  membershipCard,
  monthlyPassCard,
];
