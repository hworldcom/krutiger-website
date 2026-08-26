import type { BsportWidgetConfig } from "./widget";

declare global {
  interface Window {
    BsportWidget?: Readonly<{
      mount: (config: BsportWidgetConfig) => void;
    }>;
  }
}

export {};
