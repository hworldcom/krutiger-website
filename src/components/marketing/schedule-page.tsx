import Image from "next/image";

import { BsportScheduleWidget } from "@/components/bsport/bsport-schedule-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { EditorialImage } from "@/content/editorial";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { Locale } from "@/i18n/config";

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
          <figure className="mt-12">
            <div
              aria-label={timetableImage.alternativeText}
              className="overflow-x-auto rounded-control bg-panel"
              role="region"
              tabIndex={0}
            >
              <Image
                alt=""
                className="h-auto min-w-[70rem] w-full"
                height={934}
                sizes="(min-width: 1440px) 1360px, 100vw"
                src={timetableImage.src}
                width={1640}
              />
            </div>
            {timetableImage.caption ? (
              <figcaption className="mt-3 text-sm leading-6 text-copy-muted">
                {timetableImage.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
        <BsportScheduleWidget copy={integration} locale={locale} />
      </Container>
    </section>
  );
}
