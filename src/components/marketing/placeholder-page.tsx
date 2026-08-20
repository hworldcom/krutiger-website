import { IntegrationPlaceholder } from "@/components/bsport/integration-placeholder";
import { Container, SectionHeader } from "@/components/ui";
import type { IntegrationArea } from "@/lib/routes";

type PlaceholderPageProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  integration?: Readonly<{
    area: IntegrationArea;
    heading: string;
    description: string;
  }>;
}>;

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  integration,
}: PlaceholderPageProps) {
  return (
    <section className="flex min-h-screen items-center py-section">
      <Container>
        <SectionHeader
          description={description}
          eyebrow={eyebrow}
          level={1}
          size="page"
          title={title}
        />

        {integration ? (
          <IntegrationPlaceholder
            area={integration.area}
            description={integration.description}
            heading={integration.heading}
          />
        ) : null}
      </Container>
    </section>
  );
}
