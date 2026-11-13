import Image from "next/image";
import Link from "next/link";

import type { KidsBenefitKey, KidsPageEditorialContent } from "@/content/kids";
import type { Locale } from "@/i18n/config";
import { getLocalizedPath } from "@/i18n/routing";
import { kidsTrialSessionPassCheckoutUrl } from "@/lib/bsport/passes";
import { getRouteById } from "@/lib/routes";

import { ButtonLink, Container } from "../ui";

type KidsPageProps = Readonly<{
  content: KidsPageEditorialContent;
  contentSource: "sanity" | "fallback";
  locale: Locale;
  draftContentIssue?: string;
}>;

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function BenefitIcon({ kind }: Readonly<{ kind: KidsBenefitKey }>) {
  return (
    <svg
      aria-hidden="true"
      className="size-9 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      viewBox="0 0 40 40"
    >
      {kind === "coordination" ? (
        <>
          <circle cx="20" cy="7" r="3" />
          <path d="M11 15l9-4 9 4m-9-4v13m0-5-9 14m9-9 9 9M7 22l-3 5m29-5 3 5" />
        </>
      ) : null}
      {kind === "confidence" ? (
        <>
          <path d="M20 4l13 6v10c0 8-13 15-13 15S7 28 7 20V10L20 4Z" />
          <path d="m13 19 5 5 10-11" />
        </>
      ) : null}
      {kind === "discipline" ? (
        <>
          <circle cx="20" cy="20" r="12" />
          <circle cx="20" cy="20" r="5" />
          <path d="M20 2v8m0 20v8M2 20h8m20 0h8" />
        </>
      ) : null}
      {kind === "fairness" ? (
        <>
          <circle cx="20" cy="11" r="4" />
          <circle cx="7" cy="16" r="3" />
          <circle cx="33" cy="16" r="3" />
          <path d="M12 34v-7a8 8 0 0 1 16 0v7M2 33v-7a5 5 0 0 1 9-3m27 10v-7a5 5 0 0 0-9-3" />
        </>
      ) : null}
    </svg>
  );
}

const eyebrowClass =
  "font-display text-sm font-bold tracking-[0.2em] text-brand uppercase";
const headingClass =
  "font-display text-4xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-5xl lg:text-6xl";

export function KidsPage({
  content,
  contentSource,
  locale,
  draftContentIssue,
}: KidsPageProps) {
  const contactHref = getLocalizedPath(locale, getRouteById("contact").path);
  const scheduleHref = getLocalizedPath(locale, getRouteById("schedule").path);
  const pricesHref = getLocalizedPath(locale, getRouteById("prices").path);

  return (
    <div
      className="overflow-hidden bg-canvas text-copy"
      data-content-source={contentSource}
    >
      <section
        aria-labelledby="kids-page-title"
        className="border-b border-brand/30 py-12 sm:py-16 lg:py-20"
      >
        <Container>
          {draftContentIssue ? (
            <p
              className="mb-8 border border-brand bg-brand/10 px-5 py-4 text-sm leading-6"
              data-draft-content-issue
              role="alert"
            >
              {draftContentIssue}
            </p>
          ) : null}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-6">
            <header>
              <p className={eyebrowClass}>{content.hero.eyebrow}</p>
              <h1
                className="mt-6 font-display text-[clamp(1.7rem,9.5vw,4.5rem)] leading-[0.94] font-extrabold tracking-[-0.02em] uppercase lg:text-[clamp(2.75rem,4.7vw,4.5rem)]"
                id="kids-page-title"
              >
                {content.hero.titleLines.map((line, index) => (
                  <span
                    className={`block ${index === 2 ? "text-brand" : ""}`}
                    key={index}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-copy-muted">
                {content.hero.introduction}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink
                  href={kidsTrialSessionPassCheckoutUrl}
                  prefetch={false}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.hero.trialAction}
                  <ArrowIcon />
                </ButtonLink>
              </div>
            </header>
            <Image
              alt={content.hero.image.alternativeText}
              className="mx-auto h-auto w-full max-w-[35rem]"
              height={1122}
              preload
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 560px, calc(100vw - 32px)"
              src={content.hero.image.src}
              width={1402}
            />
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="kids-benefits-title"
        className="bg-panel/70 py-14 sm:py-20"
        id="kids-benefits"
      >
        <Container>
          <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-16">
            <div>
              <p className={eyebrowClass}>{content.benefits.eyebrow}</p>
              <h2 className={`mt-4 ${headingClass}`} id="kids-benefits-title">
                {content.benefits.title}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-8 text-copy-muted">
              {content.benefits.introduction}
            </p>
          </header>
          <ol className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {content.benefits.items.map((benefit, index) => (
              <li
                className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-line pt-6 sm:block"
                key={benefit.internalKey}
              >
                <div className="row-span-2 flex items-center justify-between">
                  <BenefitIcon kind={benefit.internalKey} />
                  <span
                    aria-hidden="true"
                    className="hidden text-xs text-copy-muted sm:block"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-none font-extrabold uppercase sm:mt-6 sm:text-3xl">
                  {benefit.title}
                </h3>
                <p className="col-start-2 text-sm leading-7 text-copy-muted sm:mt-4">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="kids-classes-title"
        className="py-14 sm:py-20"
        id="kids-classes"
      >
        <Container>
          <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-10">
            <div>
              <p className={eyebrowClass}>{content.classes.eyebrow}</p>
              <h2 className={`mt-4 ${headingClass}`} id="kids-classes-title">
                {content.classes.title}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-8 text-copy-muted">
              {content.classes.introduction}
            </p>
          </header>
          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.classes.items.map((trainingClass, index) => (
              <li
                className="border border-line border-t-2 border-t-brand bg-panel p-6 sm:p-8 lg:p-6"
                key={trainingClass.internalKey}
              >
                <article
                  aria-labelledby={`kids-class-${trainingClass.internalKey}`}
                >
                  <p
                    aria-hidden="true"
                    className="font-display text-xs font-bold tracking-widest text-brand uppercase"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <strong className="font-display text-7xl leading-none font-extrabold tracking-tight whitespace-nowrap sm:text-8xl">
                      {trainingClass.ageRange}
                    </strong>
                    <span className="text-sm text-copy-muted">
                      {content.classes.ageUnit}
                    </span>
                  </p>
                  <h3
                    className="mt-3 font-display text-2xl leading-none font-extrabold uppercase"
                    id={`kids-class-${trainingClass.internalKey}`}
                  >
                    {trainingClass.name}
                  </h3>
                  <div aria-hidden="true" className="my-6 h-0.5 w-9 bg-brand" />
                  <h4 className="font-display text-2xl leading-tight font-extrabold uppercase">
                    {trainingClass.focus}
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-copy-muted">
                    {trainingClass.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="kids-faq-title"
        className="border-t border-line py-14 sm:py-20"
        id="kids-faq"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <header>
              <p className={eyebrowClass}>{content.faq.eyebrow}</p>
              <h2 className={`mt-4 ${headingClass}`} id="kids-faq-title">
                {content.faq.title}
              </h2>
            </header>
            <div>
              {content.faq.items.map((faq, index) => (
                <details
                  className="group border-t border-line"
                  key={faq.internalKey}
                  open={index === 0}
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-sm leading-7 font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl font-normal text-brand transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-6 text-sm leading-7 text-copy-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
              <p className="mt-7 text-sm leading-7 text-copy-muted">
                {content.faq.contactPrompt}{" "}
                <Link
                  className="text-copy underline decoration-brand underline-offset-4 hover:decoration-copy"
                  href={contactHref}
                >
                  {content.faq.contactAction}
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-6 border-t-2 border-brand bg-panel p-6 sm:p-8 xl:flex-row xl:items-center">
            <div>
              <p className={eyebrowClass}>{content.nextSteps.eyebrow}</p>
              <h3 className="mt-3 font-display text-3xl leading-none font-extrabold uppercase sm:text-4xl">
                {content.nextSteps.title}
              </h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={scheduleHref} size="compact">
                {content.nextSteps.scheduleAction}
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href={pricesHref} size="compact" variant="secondary">
                {content.nextSteps.pricesAction}
                <ArrowIcon />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
