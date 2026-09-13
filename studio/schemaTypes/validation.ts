type InternalKeyItem = {
  internalKey?: unknown;
};

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
