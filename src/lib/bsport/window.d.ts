import type { BsportWidgetConfig } from "./widget";
import type { Locale } from "@/i18n/config";

declare global {
  interface Window {
    __krutigerBsportWidgetMountElement?: HTMLElement;
    __krutigerBsportWidgetLanguage?: Locale;
    __krutigerBsportWidgetReloadPending?: boolean;
    __krutigerBsportWidgetScriptUrl?: string;
    BsportWidget?: Readonly<{
      mount: (config: BsportWidgetConfig) => void;
    }>;
  }
}

export {};
