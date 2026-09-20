import type { Locale } from "@/i18n/config";

const defaultCompanyId = 6720;
const defaultCalendarCompanyId = 6720;
const defaultPricingCompanyId = 6720;
const defaultShopCompanyId = 6720;
const defaultGiftCardCompanyId = 6720;
const defaultPrivateTrainingCompanyId = 6720;
const defaultPrivateTrainingServiceId = 30595;

export const bsportWidgetScriptUrl = "https://cdn.bsport.io/scripts/widget.js";
export const bsportCalendarWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportPricingWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportShopWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportGiftCardWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportPrivateTrainingWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportScheduleElementId = "bsport-widget-368485";
export const bsportTodayElementId = "bsport-widget-679237";
export const bsportMemberAreaElementId = "bsport-widget-832086";
export const bsportPricingElementId = "bsport-widget-361765";
export const bsportShopElementId = "bsport-widget-140155";
export const bsportGiftCardElementId = "bsport-widget-29534";
export const bsportPrivateTrainingElementId = "bsport-widget-856944";
const bsportLanguageCookieKey = "i18next";

export function setBsportWidgetLanguage(language: Locale) {
  try {
    document.cookie = `${bsportLanguageCookieKey}=${language}; path=/; SameSite=Lax`;
  } catch {
    // The explicit mount option still controls the widget when cookies are blocked.
  }
}

export function resolveBsportCompanyId(
  configuredId?: string,
  variableName = "NEXT_PUBLIC_BSPORT_COMPANY_ID",
  fallbackCompanyId = defaultCompanyId,
) {
  const candidate = configuredId?.trim();

  if (!candidate) {
    return fallbackCompanyId;
  }

  const companyId = Number(candidate);

  if (!Number.isSafeInteger(companyId) || companyId <= 0) {
    throw new Error(`${variableName} must be a positive integer.`);
  }

  return companyId;
}

export const bsportCompanyId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_COMPANY_ID,
);
export const bsportCalendarCompanyId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_CALENDAR_COMPANY_ID,
  "NEXT_PUBLIC_BSPORT_CALENDAR_COMPANY_ID",
  defaultCalendarCompanyId,
);
export const bsportPricingCompanyId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_PRICING_COMPANY_ID,
  "NEXT_PUBLIC_BSPORT_PRICING_COMPANY_ID",
  defaultPricingCompanyId,
);
export const bsportShopCompanyId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_SHOP_COMPANY_ID,
  "NEXT_PUBLIC_BSPORT_SHOP_COMPANY_ID",
  defaultShopCompanyId,
);
export const bsportGiftCardCompanyId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_GIFT_CARD_COMPANY_ID,
  "NEXT_PUBLIC_BSPORT_GIFT_CARD_COMPANY_ID",
  defaultGiftCardCompanyId,
);
export const bsportPrivateTrainingCompanyId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_COMPANY_ID,
  "NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_COMPANY_ID",
  defaultPrivateTrainingCompanyId,
);
export const bsportPrivateTrainingServiceId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_SERVICE_ID,
  "NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_SERVICE_ID",
  defaultPrivateTrainingServiceId,
);

export function prepareBsportWidgetMount(
  scriptUrl: string,
  mountElement: HTMLElement | null,
  language: Locale,
  reload = () => window.location.reload(),
) {
  if (!mountElement) {
    return false;
  }

  const activeScriptUrl = window.__krutigerBsportWidgetScriptUrl;
  const activeMountElement = window.__krutigerBsportWidgetMountElement;
  const activeLanguage = window.__krutigerBsportWidgetLanguage;
  const runtimeMustReload =
    (activeScriptUrl && activeScriptUrl !== scriptUrl) ||
    (activeMountElement && activeMountElement !== mountElement) ||
    (activeLanguage && activeLanguage !== language);

  if (runtimeMustReload) {
    setBsportWidgetLanguage(language);

    if (!window.__krutigerBsportWidgetReloadPending) {
      window.__krutigerBsportWidgetReloadPending = true;
      reload();
    }

    return false;
  }

  window.__krutigerBsportWidgetScriptUrl = scriptUrl;
  window.__krutigerBsportWidgetMountElement = mountElement;
  window.__krutigerBsportWidgetLanguage = language;
  setBsportWidgetLanguage(language);
  return true;
}

export function createBsportCalendarConfig(
  parentElement: string,
  language: Locale,
) {
  return {
    parentElement,
    companyId: bsportCalendarCompanyId,
    franchiseId: null,
    language,
    dialogMode: 3,
    widgetType: "calendar",
    showFab: false,
    fullScreenPopup: false,
    config: {
      calendar: {
        variant: "activityName",
      },
    },
  } as const;
}

export function createBsportTodayConfig(
  parentElement: string,
  language: Locale,
) {
  return {
    parentElement,
    companyId: bsportCalendarCompanyId,
    franchiseId: null,
    language,
    dialogMode: 1,
    widgetType: "calendar",
    showFab: false,
    fullScreenPopup: false,
    config: {
      calendar: {
        todayOnly: true,
        cardMode: false,
      },
    },
  } as const;
}

export function createBsportLoginConfig(
  parentElement: string,
  language: Locale,
) {
  return {
    parentElement,
    companyId: bsportCompanyId,
    franchiseId: null,
    language,
    dialogMode: 3,
    widgetType: "loginButton",
    showFab: false,
    fullScreenPopup: false,
    config: {
      loginButton: {
        openMemberProfile: true,
      },
    },
  } as const;
}

export function createBsportSubscriptionConfig(
  parentElement: string,
  language: Locale,
) {
  return {
    parentElement,
    companyId: bsportPricingCompanyId,
    franchiseId: null,
    language,
    dialogMode: 3,
    widgetType: "subscription",
    showFab: false,
    fullScreenPopup: false,
    config: {
      subscription: {},
    },
  } as const;
}

export function createBsportShopConfig(
  parentElement: string,
  language: Locale,
) {
  return {
    parentElement,
    companyId: bsportShopCompanyId,
    franchiseId: null,
    language,
    dialogMode: 1,
    widgetType: "shop",
    showFab: false,
    fullScreenPopup: false,
    config: {
      shop: {},
    },
  } as const;
}

export function createBsportGiftCardConfig(
  parentElement: string,
  language: Locale,
) {
  return {
    parentElement,
    companyId: bsportGiftCardCompanyId,
    franchiseId: null,
    language,
    dialogMode: 1,
    widgetType: "giftcard",
    showFab: false,
    fullScreenPopup: false,
    config: {
      giftcard: {
        giftcards: [],
      },
    },
  } as const;
}

export function createBsportPrivateTrainingConfig(
  parentElement: string,
  language: Locale,
) {
  return {
    parentElement,
    companyId: bsportPrivateTrainingCompanyId,
    franchiseId: null,
    language,
    dialogMode: 1,
    widgetType: "privateService",
    showFab: false,
    fullScreenPopup: false,
    config: {
      privateService: {
        type: "detail",
        serviceId: bsportPrivateTrainingServiceId,
      },
    },
  } as const;
}

export type BsportWidgetConfig =
  | ReturnType<typeof createBsportCalendarConfig>
  | ReturnType<typeof createBsportTodayConfig>
  | ReturnType<typeof createBsportLoginConfig>
  | ReturnType<typeof createBsportSubscriptionConfig>
  | ReturnType<typeof createBsportShopConfig>
  | ReturnType<typeof createBsportGiftCardConfig>
  | ReturnType<typeof createBsportPrivateTrainingConfig>;
