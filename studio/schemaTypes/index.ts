import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./documents/aboutPage";
import { classType } from "./documents/classType";
import { coach } from "./documents/coach";
import { faq } from "./documents/faq";
import { homepage } from "./documents/homepage";
import { membershipCard } from "./documents/membershipCard";
import { monthlyPassCard } from "./documents/monthlyPassCard";
import { siteSettings } from "./documents/siteSettings";
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
  siteSettings,
  homepage,
  aboutPage,
  classType,
  coach,
  faq,
  membershipCard,
  monthlyPassCard,
];
