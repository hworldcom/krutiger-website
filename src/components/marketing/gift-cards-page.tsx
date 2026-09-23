import { BsportGiftCardWidget } from "@/components/bsport/bsport-gift-card-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type GiftCardsPageProps = Readonly<{
  content: Dictionary["routes"]["giftCards"];
  integration: Dictionary["integrations"]["giftCards"];
  locale: Locale;
}>;

export function GiftCardsPage({
  content,
  integration,
  locale,
}: GiftCardsPageProps) {
  return (
    <section className="min-h-screen py-section">
      <Container>
        <SectionHeader
          description={content.description}
          eyebrow={content.eyebrow}
          headingId="gift-cards-page-title"
          level={1}
          size="page"
          title={content.title}
        />

        <BsportGiftCardWidget copy={integration} locale={locale} />
      </Container>
    </section>
  );
}
