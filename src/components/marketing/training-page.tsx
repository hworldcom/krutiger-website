import type { TrainingClass } from "@/content/training";
import type { Locale } from "@/i18n/config";
import type { TrainingPageCopy } from "@/i18n/dictionaries/types";

import { Container } from "../ui";
import { TrainingClassCard } from "./training-class-card";

type TrainingPageProps = Readonly<{
  content: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
  }>;
  labels: TrainingPageCopy;
  locale: Locale;
  trainingClasses: readonly TrainingClass[];
  draftContentIssue?: string;
}>;

export function TrainingPage({
  content,
  labels,
  locale,
  trainingClasses,
  draftContentIssue,
}: TrainingPageProps) {
  return (
    <div className="overflow-hidden bg-canvas text-copy">
      <section
        aria-labelledby="training-page-title"
        className="relative isolate overflow-hidden border-b border-brand/30 pb-20 pt-36 sm:pb-24 sm:pt-44"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_78%_28%,rgba(249,105,0,0.2),transparent_23%),radial-gradient(circle_at_22%_0%,rgba(255,255,255,0.055),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-8 bottom-[-0.18em] -z-10 font-display text-[clamp(8rem,27vw,26rem)] leading-[0.68] font-extrabold tracking-[-0.06em] text-copy/[0.025] uppercase"
        >
          Muay Thai
        </div>

        <Container>
          <header className="max-w-4xl">
            <p className="font-display text-sm font-bold tracking-[0.24em] text-brand uppercase sm:text-base">
              {content.eyebrow}
            </p>
            <h1
              className="mt-5 max-w-4xl font-display text-5xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl"
              id="training-page-title"
            >
              {content.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-copy-muted sm:text-lg sm:leading-8">
              {content.description}
            </p>
          </header>
        </Container>
      </section>

      <section
        aria-labelledby="training-classes-title"
        className="bg-panel/30 py-16 sm:py-24"
      >
        <Container>
          {draftContentIssue ? (
            <p
              className="mb-8 border border-brand bg-brand/10 px-5 py-4 text-sm leading-6 text-copy sm:text-base"
              data-draft-content-issue
              role="alert"
            >
              {draftContentIssue}
            </p>
          ) : null}
          <header className="max-w-2xl">
            <h2
              className="font-display text-4xl leading-none font-extrabold tracking-tight uppercase sm:text-5xl"
              id="training-classes-title"
            >
              {labels.sectionHeading}
            </h2>
            <p className="mt-5 text-base leading-7 text-copy-muted sm:text-lg">
              {labels.sectionIntroduction}
            </p>
          </header>

          <ol className="mt-10 grid gap-7 md:grid-cols-2 lg:gap-8">
            {trainingClasses.map((trainingClass, index) => (
              <li key={trainingClass.internalKey}>
                <TrainingClassCard
                  index={index}
                  labels={labels}
                  locale={locale}
                  trainingClass={trainingClass}
                />
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-3xl border-l-2 border-brand pl-5 text-sm leading-6 text-copy-muted sm:text-base sm:leading-7">
            {labels.scheduleNotice}
          </p>
        </Container>
      </section>
    </div>
  );
}
