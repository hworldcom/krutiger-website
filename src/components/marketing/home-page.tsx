import Image from "next/image";

import type { Locale } from "@/i18n/config";
import type { HomePageCopy } from "@/i18n/dictionaries/types";

import { getLocalizedPath } from "../../i18n/routing";
import { ButtonLink, Container } from "../ui";

type HomePageProps = Readonly<{
  content: HomePageCopy;
  locale: Locale;
}>;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-7 shrink-0"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M25 13c0 7-9 15-9 15S7 20 7 13a9 9 0 1 1 18 0Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FeatureIcon({ index }: Readonly<{ index: number }>) {
  if (index === 0) {
    return (
      <svg
        aria-hidden="true"
        className="size-14"
        fill="none"
        viewBox="0 0 64 64"
      >
        <path
          d="m10 22 9 8 13-18 13 18 9-8-5 25H15l-5-25Zm7 31h30"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path d="M20 38h24" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        aria-hidden="true"
        className="size-14"
        fill="none"
        viewBox="0 0 64 64"
      >
        <path
          d="M18 18c4-5 10-7 15-3l11 9c4 3 5 9 2 13l-6 9c-3 4-8 5-12 3l-12-7c-6-4-8-12-4-18l6-6Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="m40 22 6-4c4-2 8 1 8 5v9c0 4-3 7-7 7h-2M17 42l-3 7 12 6 4-7"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        aria-hidden="true"
        className="size-14"
        fill="none"
        viewBox="0 0 64 64"
      >
        <circle cx="32" cy="21" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="13" cy="27" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="51" cy="27" r="6" stroke="currentColor" strokeWidth="2" />
        <path
          d="M18 53v-7c0-8 6-14 14-14s14 6 14 14v7M4 53v-6c0-7 4-12 10-12 4 0 7 2 9 5m37 13v-6c0-7-4-12-10-12-4 0-7 2-9 5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-14" fill="none" viewBox="0 0 64 64">
      <path
        d="M14 22c4-6 11-8 17-4l9 6c6 4 8 11 4 17l-5 8c-3 5-10 7-15 4l-10-6c-8-5-10-17-4-24l4-1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m41 26 8-5c4-2 8 1 8 5v8c0 5-4 9-9 9h-5M17 49l-2 7m19-4 3 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function HomePage({ content, locale }: HomePageProps) {
  const contactHref = getLocalizedPath(locale, "/contact");
  const scheduleHref = getLocalizedPath(locale, "/schedule");

  return (
    <div className="overflow-hidden bg-canvas text-copy">
      <section
        aria-labelledby="home-page-title"
        className="relative isolate min-h-[47rem] overflow-hidden lg:min-h-[clamp(40rem,72svh,46rem)]"
      >
        <div className="home-hero-media absolute inset-0 lg:left-[34%]">
          <Image
            alt={content.hero.imageAlt}
            className="object-cover object-[52%_center] sm:object-[center_42%]"
            fill
            preload
            sizes="(min-width: 1024px) 66vw, 100vw"
            src="/images/home/main.png"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.99)_0%,rgba(8,8,8,0.94)_26%,rgba(8,8,8,0.58)_53%,rgba(8,8,8,0.08)_100%)] lg:bg-[linear-gradient(90deg,rgba(8,8,8,0.99)_0%,rgba(8,8,8,0.94)_28%,rgba(8,8,8,0.64)_50%,rgba(8,8,8,0.26)_62%,rgba(8,8,8,0.08)_78%,rgba(8,8,8,0.02)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,1)_0%,rgba(8,8,8,0.74)_24%,rgba(8,8,8,0.04)_62%,rgba(8,8,8,0.36)_100%)] lg:bg-[linear-gradient(0deg,rgba(8,8,8,0.96)_0%,rgba(8,8,8,0.18)_30%,rgba(8,8,8,0.04)_72%,rgba(8,8,8,0.28)_100%)]"
        />

        <Container>
          <div className="relative flex min-h-[47rem] items-end pb-24 lg:min-h-[clamp(40rem,72svh,46rem)] lg:items-center lg:pb-20">
            <header className="max-w-[43rem] pt-24 lg:pt-8">
              <p className="font-display text-sm font-bold tracking-[0.28em] text-brand uppercase sm:text-base">
                {content.hero.eyebrow}
              </p>
              <h1
                className="mt-4 font-display text-[3.25rem] leading-[0.84] font-extrabold tracking-[-0.025em] uppercase xs:text-6xl sm:text-7xl lg:text-[6.25rem]"
                id="home-page-title"
              >
                {content.hero.titleLines.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </h1>
              <div aria-hidden="true" className="mt-5 h-0.5 w-14 bg-brand" />
              <p className="mt-5 max-w-[37rem] text-base leading-7 text-copy-muted sm:text-lg sm:leading-8">
                {content.hero.introduction}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactHref}>
                  {content.hero.trialAction}
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink href={scheduleHref} variant="secondary">
                  {content.hero.scheduleAction}
                  <ArrowIcon />
                </ButtonLink>
              </div>
            </header>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="home-schedule-title"
        className="relative z-10 -mt-12"
        data-placeholder-data="true"
      >
        <Container>
          <div className="border border-line bg-canvas/95 shadow-card backdrop-blur-sm">
            <div className="grid lg:grid-cols-2 xl:grid-cols-[17rem_repeat(3,minmax(0,1fr))_17rem]">
              <header className="p-6">
                <p
                  className="font-display text-3xl leading-none font-extrabold uppercase"
                  id="home-schedule-title"
                >
                  {content.schedule.title}
                </p>
                <ButtonLink href={scheduleHref} size="compact" variant="ghost">
                  {content.schedule.action}
                  <ArrowIcon />
                </ButtonLink>
              </header>

              {content.schedule.classes.map((classItem) => (
                <article
                  className="border-t border-line p-6 lg:border-l lg:first-of-type:border-t-0 xl:border-t-0"
                  key={`${classItem.time}-${classItem.title}`}
                >
                  <p className="font-display text-2xl leading-none font-extrabold text-brand">
                    {classItem.time}
                  </p>
                  <h3 className="mt-1 font-display text-xl leading-tight font-bold tracking-wide uppercase">
                    {classItem.title}
                  </h3>
                  <p className="mt-1 text-xs tracking-[0.08em] text-copy-muted uppercase">
                    {classItem.details}
                  </p>
                </article>
              ))}

              <div className="flex items-start gap-3 border-t border-line p-6 text-brand lg:border-l xl:border-t-0">
                <LocationIcon />
                <div className="text-copy">
                  <p className="font-display text-lg font-bold tracking-wide uppercase">
                    {content.schedule.location.district}
                  </p>
                  <p className="mt-1 text-xs leading-5 tracking-[0.08em] text-copy-muted uppercase">
                    {content.schedule.location.addressLineOne}
                    <br />
                    {content.schedule.location.addressLineTwo}
                  </p>
                </div>
              </div>
            </div>
            <p className="border-t border-line px-6 py-3 text-xs leading-5 text-copy-muted">
              {content.schedule.placeholderNotice}
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="home-values-title"
        className="relative py-16 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(249,105,0,0.2),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(249,105,0,0.12),transparent_25%)]"
        />
        <Container>
          <div className="relative grid gap-10 xl:grid-cols-[19rem_minmax(0,1fr)]">
            <header>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-brand uppercase">
                {content.values.eyebrow}
              </p>
              <h2
                className="mt-3 font-display text-4xl leading-[0.92] font-extrabold uppercase sm:text-5xl"
                id="home-values-title"
              >
                {content.values.titlePrimary}
                <span className="block text-brand">
                  {content.values.titleAccent}
                </span>
              </h2>
              <p className="mt-5 text-sm leading-6 text-copy-muted sm:text-base">
                {content.values.introduction}
              </p>
            </header>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.values.items.map((item, index) => (
                <li
                  className="flex min-h-60 flex-col items-center justify-center border border-brand/35 bg-panel/45 p-6 text-center transition-colors hover:border-brand/70 hover:bg-panel"
                  key={item.title}
                >
                  <div className="text-brand">
                    <FeatureIcon index={index} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-none font-extrabold uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-copy-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
