import { ContentCard } from "@/components/ui";
import type { IntegrationArea } from "@/lib/routes";

type IntegrationPlaceholderProps = Readonly<{
  area: IntegrationArea;
  heading: string;
  description: string;
}>;

export function IntegrationPlaceholder({
  area,
  heading,
  description,
}: IntegrationPlaceholderProps) {
  const headingId = `${area}-integration-heading`;

  return (
    <div className="mt-12 max-w-copy">
      <ContentCard
        aria-labelledby={headingId}
        as="section"
        data-integration-boundary={area}
      >
        <div className="h-1 w-12 bg-brand" aria-hidden="true" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id={headingId}
        >
          {heading}
        </h2>
        <p className="mt-4 max-w-copy leading-7 text-copy-muted">
          {description}
        </p>
      </ContentCard>
    </div>
  );
}
