const defaultCompanyId = 6720;
const defaultCalendarCompanyId = 6720;
const defaultPricingCompanyId = 6720;
const defaultShopCompanyId = 6720;

export const bsportWidgetScriptUrl = "https://cdn.bsport.io/scripts/widget.js";
export const bsportCalendarWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportPricingWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportShopWidgetScriptUrl =
  "https://cdn.bsport.io/scripts/widget.js";
export const bsportScheduleElementId = "bsport-widget-368485";
export const bsportMemberAreaElementId = "bsport-widget-832086";
export const bsportPricingElementId = "bsport-widget-361765";
export const bsportShopElementId = "bsport-widget-140155";

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

export function prepareBsportWidgetEnvironment(
  scriptUrl: string,
  reload = () => window.location.reload(),
) {
  const activeScriptUrl = window.__krutigerBsportWidgetScriptUrl;

  if (activeScriptUrl && activeScriptUrl !== scriptUrl) {
    reload();
    return false;
  }

  window.__krutigerBsportWidgetScriptUrl = scriptUrl;
  return true;
}

export function createBsportCalendarConfig(parentElement: string) {
  return {
    parentElement,
    companyId: bsportCalendarCompanyId,
    franchiseId: null,
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

export function createBsportLoginConfig(parentElement: string) {
  return {
    parentElement,
    companyId: bsportCompanyId,
    franchiseId: null,
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

export function createBsportSubscriptionConfig(parentElement: string) {
  return {
    parentElement,
    companyId: bsportPricingCompanyId,
    franchiseId: null,
    dialogMode: 3,
    widgetType: "subscription",
    showFab: false,
    fullScreenPopup: false,
    config: {
      subscription: {},
    },
  } as const;
}

export function createBsportShopConfig(parentElement: string) {
  return {
    parentElement,
    companyId: bsportShopCompanyId,
    franchiseId: null,
    dialogMode: 1,
    widgetType: "shop",
    showFab: false,
    fullScreenPopup: false,
    config: {
      shop: {},
    },
  } as const;
}

export type BsportWidgetConfig =
  | ReturnType<typeof createBsportCalendarConfig>
  | ReturnType<typeof createBsportLoginConfig>
  | ReturnType<typeof createBsportSubscriptionConfig>
  | ReturnType<typeof createBsportShopConfig>;
