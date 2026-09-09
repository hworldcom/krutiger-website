import type { BsportWidgetConfig } from "./widget";

declare global {
  interface Window {
    __krutigerBsportWidgetScriptUrl?: string;
    BsportWidget?: Readonly<{
      mount: (config: BsportWidgetConfig) => void;
    }>;
  }
}

export {};
