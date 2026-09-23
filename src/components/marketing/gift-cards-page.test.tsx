import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { GiftCardsPage } from "./gift-cards-page";

describe("GiftCardsPage", () => {
  it.each([
    ["de", de],
    ["en", en],
  ] as const)(
    "renders the dedicated %s gift-card page",
    (locale, dictionary) => {
      const markup = renderToStaticMarkup(
        <GiftCardsPage
          content={dictionary.routes.giftCards}
          integration={dictionary.integrations.giftCards}
          locale={locale}
        />,
      );

      expect(markup.match(/<h1\b/g)).toHaveLength(1);
      expect(markup).toContain(dictionary.routes.giftCards.title);
      expect(markup).toContain(dictionary.routes.giftCards.description);
      expect(markup).toContain('data-integration-boundary="giftCards"');
      expect(markup).toContain('id="bsport-widget-29534"');
    },
  );
});
