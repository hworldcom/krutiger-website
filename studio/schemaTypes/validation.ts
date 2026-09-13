type InternalKeyItem = {
  internalKey?: unknown;
};

type LocalizedValue = {
  de?: unknown;
  en?: unknown;
};

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateUniqueInternalKeys(
  items: InternalKeyItem[] | undefined,
) {
  if (!items) {
    return true;
  }

  const keys = items.map((item) => item.internalKey);

  if (keys.some((key) => typeof key !== "string" || key.length === 0)) {
    return "Every item needs an internal key.";
  }

  return new Set(keys).size === keys.length
    ? true
    : "Each internal key can be used only once.";
}

export function validateOptionalLocalizedPair(value: unknown) {
  if (!value) {
    return true;
  }

  const localized = value as LocalizedValue;
  const hasGerman = hasText(localized.de);
  const hasEnglish = hasText(localized.en);

  return hasGerman === hasEnglish
    ? true
    : "Complete both German and English values, or leave both empty.";
}

export function validateLocalizedMaximumLength(
  value: unknown,
  maximum: number,
  label: string,
) {
  if (!value) {
    return true;
  }

  const localized = value as LocalizedValue;
  const longLanguages = [
    hasText(localized.de) && String(localized.de).length > maximum
      ? "German"
      : null,
    hasText(localized.en) && String(localized.en).length > maximum
      ? "English"
      : null,
  ].filter(Boolean);

  return longLanguages.length === 0
    ? true
    : `${label}: keep ${longLanguages.join(" and ")} at or below ${maximum} characters.`;
}
