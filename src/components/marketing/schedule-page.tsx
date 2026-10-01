import { BsportScheduleWidget } from "@/components/bsport/bsport-schedule-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { EditorialImage } from "@/content/editorial";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { Locale } from "@/i18n/config";

import { ScheduleTimetable } from "./schedule-timetable";

type SchedulePageProps = Readonly<{
  content: Dictionary["routes"]["schedule"];
  integration: Dictionary["integrations"]["schedule"];
  locale: Locale;
  timetableImage?: EditorialImage;
  draftContentIssue?: string;
}>;

export function SchedulePage({
  content,
  integration,
  locale,
  timetableImage,
  draftContentIssue,
}: SchedulePageProps) {
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
        {draftContentIssue ? (
          <p
            className="mt-8 border border-brand bg-brand/10 px-5 py-4 text-sm leading-6 text-copy sm:text-base"
            data-draft-content-issue
            role="alert"
          >
            {draftContentIssue}
          </p>
        ) : null}
        {timetableImage ? (
          <ScheduleTimetable
            image={timetableImage}
            labels={content.timetable}
          />
        ) : null}
        <BsportScheduleWidget copy={integration} locale={locale} />
      </Container>
    </section>
  );
}
