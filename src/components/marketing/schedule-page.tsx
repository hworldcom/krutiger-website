import { BsportScheduleWidget } from "@/components/bsport/bsport-schedule-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries/types";

type SchedulePageProps = Readonly<{
  content: Dictionary["routes"]["schedule"];
  integration: Dictionary["integrations"]["schedule"];
}>;

export function SchedulePage({ content, integration }: SchedulePageProps) {
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
        <BsportScheduleWidget copy={integration} />
      </Container>
    </section>
  );
}
