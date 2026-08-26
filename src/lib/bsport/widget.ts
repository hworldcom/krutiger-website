const defaultCompanyId = 14416;

export const bsportWidgetScriptUrl =
  "https://cdn.staging.bsport.io/scripts/widget.js";
export const bsportScheduleElementId = "bsport-widget-163824";

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
