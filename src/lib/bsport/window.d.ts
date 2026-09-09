import type { BsportWidgetConfig } from "./widget";

declare global {
  interface Window {
    __krutigerBsportWidgetMountElement?: HTMLElement;
    __krutigerBsportWidgetReloadPending?: boolean;
    __krutigerBsportWidgetScriptUrl?: string;
    BsportWidget?: Readonly<{
      mount: (config: BsportWidgetConfig) => void;
    }>;
  }
}

export {};
