import { BsportShopWidget } from "@/components/bsport/bsport-shop-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries/types";

type ShopPageProps = Readonly<{
  content: Dictionary["routes"]["shop"];
  giftCards: Dictionary["integrations"]["giftCards"];
  integration: Dictionary["integrations"]["shop"];
}>;

export function ShopPage({ content, giftCards, integration }: ShopPageProps) {
  return (
    <section className="min-h-screen py-section">
      <Container>
        <SectionHeader
          description={content.description}
          eyebrow={content.eyebrow}
          level={1}
          size="page"
          title={content.title}
        />
        <BsportShopWidget copy={integration} giftCardCopy={giftCards} />
      </Container>
    </section>
  );
}
