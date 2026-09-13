import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./documents/siteSettings";
import { postalAddress, openingHoursEntry } from "./objects/contactDetails";
import { editorialImage } from "./objects/editorialImage";
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
  siteSettings,
];
