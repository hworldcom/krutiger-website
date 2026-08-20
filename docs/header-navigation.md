# Header and navigation

The localized application layout renders `SiteHeader` on every German and English route. Navigation labels come from the typed application dictionaries, while route membership and paths come from `src/lib/routes.ts`.

The primary navigation includes an explicit localized Home link (`Startseite` in German), and the live Thai wordmark `ครูเสือ` also links home. The wordmark uses a self-hosted Thai font. It is text rather than an extraction from the raster badge, keeping it sharp while leaving the approved master logo unchanged.

## States

- **Initial:** the sticky header uses the canvas surface with a transparent border.
- **Scrolled:** after 16 pixels, the header adds its token-backed border, shadow, and backdrop treatment without changing height.
- **Active route:** the current primary or secondary route has `aria-current="page"`, a persistent edge indicator, and visually hidden localized status text.
- **Menu open:** the mobile trigger reports `aria-expanded="true"`; a native modal dialog moves focus to Close, contains keyboard focus, makes background content inert, and locks page scrolling. Escape or Close returns focus to the trigger.

The desktop navigation appears at the `xl` breakpoint. Below it, the mobile dialog contains all primary and secondary navigation routes, the trial-class CTA, and the language switcher. Its content scrolls independently on short screens down to 320 pixels wide. Menu and backdrop transitions use shared duration/easing tokens and are effectively disabled when reduced motion is requested.

## Trial-class destination

`src/lib/header-navigation.ts` owns the CTA destination. It currently resolves to the localized Contact placeholder, making clear that no live booking is available before bsport access. Replace the configuration with an external destination when the approved bsport deep link is known; the header component does not need to change.

## Language switching

The visible `DE` / `EN` links use `replacePathLocale` to preserve the current route. A language's flag appears on hover or keyboard focus and remains visible for the selected language. Fixed flag space prevents layout shift. The selected language also has a thicker border, underline, `aria-current`, and a localized accessible label, so its state does not depend on color alone.
