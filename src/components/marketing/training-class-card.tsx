import Image from "next/image";

import { ButtonLink } from "@/components/ui";
import type { TrainingClass } from "@/content/training";
import type { Locale } from "@/i18n/config";
import type { TrainingPageCopy } from "@/i18n/dictionaries/types";
import { getLocalizedPath } from "@/i18n/routing";

type TrainingClassCardProps = Readonly<{
  index: number;
  labels: TrainingPageCopy;
  locale: Locale;
  trainingClass: TrainingClass;
}>;

function getActionLabel(template: string, name: string) {
  return template.replace("{name}", name);
}

export function TrainingClassCard({
  index,
  labels,
  locale,
  trainingClass,
}: TrainingClassCardProps) {
  const headingId = `training-class-${trainingClass.internalKey}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-labelledby={headingId}
      className="group flex h-full flex-col overflow-hidden border border-line bg-panel shadow-card transition-colors duration-200 hover:border-brand/70"
      data-training-class={trainingClass.internalKey}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-panel-raised">
        <Image
          alt={trainingClass.image.alternativeText}
          className="object-cover grayscale-[.2] contrast-[1.08] saturate-[.72] transition duration-500 ease-out motion-safe:group-hover:scale-[1.025] motion-safe:group-hover:grayscale-0"
          fill
          loading={index < 2 ? "eager" : "lazy"}
          sizes="(min-width: 768px) 50vw, 100vw"
          src={trainingClass.image.src}
          style={{ objectPosition: trainingClass.image.objectPosition }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-panel via-panel/15 to-transparent"
        />
        <p className="absolute left-5 top-5 font-display text-5xl leading-none font-extrabold text-brand sm:left-7 sm:top-7">
          {number}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 sm:px-8 sm:pb-8">
        <div className="-mt-5 relative flex flex-wrap items-center gap-2">
          <span className="border border-brand bg-panel px-3 py-2 font-display text-sm font-bold tracking-[0.12em] text-brand uppercase">
            {labels.levelLabels[trainingClass.level]}
          </span>
          <span className="border border-line bg-panel px-3 py-2 font-display text-sm font-bold tracking-[0.08em] text-copy-muted uppercase">
            {labels.duration.replace(
              "{minutes}",
              String(trainingClass.durationMinutes),
            )}
          </span>
        </div>

        <h3
          className="mt-7 font-display text-4xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-5xl"
          id={headingId}
        >
          {trainingClass.name}
        </h3>
        <p className="mt-5 text-lg leading-7 text-copy">
          {trainingClass.summary}
        </p>
        <p className="mt-4 leading-7 text-copy-muted">
          {trainingClass.description}
        </p>

        <dl className="mt-7 grid gap-6 border-t border-line pt-6">
          <div>
            <dt className="font-display text-sm font-bold tracking-[0.14em] text-brand uppercase">
              {labels.audienceLabel}
            </dt>
            <dd className="mt-2 leading-6 text-copy-muted">
              {trainingClass.audience}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-8">
          <ButtonLink
            aria-label={getActionLabel(
              labels.scheduleActionLabel,
              trainingClass.name,
            )}
            href={getLocalizedPath(locale, "/schedule")}
            stretch
          >
            {trainingClass.ctaLabel}
            <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
