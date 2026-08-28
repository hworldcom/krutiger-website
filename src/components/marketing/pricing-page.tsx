import { BsportPricingWidget } from "@/components/bsport/bsport-pricing-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries/types";

type PricingPageProps = Readonly<{
  content: Dictionary["routes"]["prices"];
  integration: Dictionary["integrations"]["pricing"];
}>;

export function PricingPage({ content, integration }: PricingPageProps) {
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
        <BsportPricingWidget copy={integration} />
      </Container>
    </section>
  );
}
