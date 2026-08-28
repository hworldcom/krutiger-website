const defaultCompanyId = 14416;

export const bsportWidgetScriptUrl =
  "https://cdn.staging.bsport.io/scripts/widget.js";
export const bsportScheduleElementId = "bsport-widget-163824";
export const bsportMemberAreaElementId = "bsport-widget-235346";
export const bsportPricingElementId = "bsport-widget-107643";

export function resolveBsportCompanyId(configuredId?: string) {
  const candidate = configuredId?.trim();

  if (!candidate) {
    return defaultCompanyId;
  }

  const companyId = Number(candidate);

  if (!Number.isSafeInteger(companyId) || companyId <= 0) {
    throw new Error(
      "NEXT_PUBLIC_BSPORT_COMPANY_ID must be a positive integer.",
    );
  }

  return companyId;
}

export const bsportCompanyId = resolveBsportCompanyId(
  process.env.NEXT_PUBLIC_BSPORT_COMPANY_ID,
);

export function createBsportCalendarConfig(parentElement: string) {
  return {
    parentElement,
    companyId: bsportCompanyId,
    franchiseId: null,
    dialogMode: 1,
    widgetType: "calendar",
    showFab: false,
    fullScreenPopup: false,
    config: {
      calendar: {},
    },
  } as const;
}

export function createBsportLoginConfig(parentElement: string) {
  return {
    parentElement,
    companyId: bsportCompanyId,
    franchiseId: null,
    dialogMode: 1,
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

export function createBsportPassConfig(parentElement: string) {
  return {
    parentElement,
    companyId: bsportCompanyId,
    franchiseId: null,
    dialogMode: 1,
    widgetType: "pass",
    showFab: false,
    fullScreenPopup: false,
    config: {
      pass: {
        paymentPackCategories: [],
        privatePassCategories: [],
      },
    },
  } as const;
}

export type BsportWidgetConfig =
  | ReturnType<typeof createBsportCalendarConfig>
  | ReturnType<typeof createBsportLoginConfig>
  | ReturnType<typeof createBsportPassConfig>;
