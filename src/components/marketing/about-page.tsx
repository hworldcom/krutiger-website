import Image from "next/image";

import type { AboutPageCopy } from "@/i18n/dictionaries/types";

const chapterMedia = [
  {
    src: "/images/about/second.png",
    position: "object-[center_14%]",
    tone: "dark",
  },
  {
    src: "/images/about/third.jpg",
    position: "object-[center_20%]",
    tone: "paper",
  },
  {
    src: "/images/about/fourth.jpg",
    position: "object-[center_12%]",
    tone: "dark",
  },
  {
    src: "/images/about/fifth.jpg",
    position: "object-[center_48%]",
    secondary: {
      src: "/images/about/six.jpg",
      position: "object-[center_12%]",
    },
    tone: "paper",
  },
] as const;

type AboutPageProps = Readonly<{
  content: AboutPageCopy;
}>;

function ValueIcon({ index }: Readonly<{ index: number }>) {
  if (index === 0) {
    return (
      <svg
        aria-hidden="true"
        className="size-11"
        fill="none"
        viewBox="0 0 48 48"
      >
        <path
          d="m12 36 24-24M12 12l24 24M9 39l6-1-5-5-1 6Zm30 0-1-6-5 5 6 1ZM9 9l1 6 5-5-6-1Zm30 0-6 1 5 5 1-6Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        aria-hidden="true"
        className="size-11"
        fill="none"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="10" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M24 15v12m0-7-9 8m9-8 9 8M11 36c4-5 8-7 13-7s9 2 13 7M8 39h32"
          stroke="currentColor"
          strokeLinecap="round"
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
        className="size-11"
        fill="none"
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="10" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M24 15v10m-9 14 9-14 9 14M12 39h24M17 23l7 5 7-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-11" fill="none" viewBox="0 0 48 48">
      <circle cx="24" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="11" cy="17" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="37" cy="17" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 37v-5c0-5 4-9 9-9s9 4 9 9v5M4 37v-4c0-4 3-7 7-7 2 0 4 1 5 2m28 9v-4c0-4-3-7-7-7-2 0-4 1-5 2M7 40h34"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function AboutPage({ content }: AboutPageProps) {
  return (
    <div className="overflow-hidden bg-canvas text-copy">
      <section
        aria-labelledby="about-page-title"
        className="relative isolate min-h-[42rem] overflow-hidden sm:min-h-[46rem] lg:min-h-[38rem]"
      >
        <div className="about-hero-media absolute inset-0 lg:left-[34%]">
          <Image
            alt={content.hero.imageAlt}
            className="object-cover object-[62%_center] lg:object-[center_35%]"
            fill
            preload
            sizes="(min-width: 1024px) 66vw, 100vw"
            src="/images/about/main.png"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.98)_0%,rgba(8,8,8,0.9)_34%,rgba(8,8,8,0.4)_68%,rgba(8,8,8,0.12)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,0.98)_0%,rgba(8,8,8,0.12)_48%,rgba(8,8,8,0.22)_100%)] lg:bg-[linear-gradient(0deg,rgba(8,8,8,0.74)_0%,transparent_38%)]"
        />

        <div className="relative mx-auto flex min-h-[42rem] w-full max-w-shell items-end px-6 py-16 sm:min-h-[46rem] lg:min-h-[38rem] lg:items-center lg:px-10 lg:py-20">
          <header className="max-w-[42rem]">
            <p className="font-display text-sm font-bold tracking-[0.24em] text-brand uppercase sm:text-base">
              {content.hero.eyebrow}
            </p>
            <h1
              className="mt-5 font-display text-[2.6rem] leading-[0.88] font-extrabold tracking-tight uppercase xs:text-5xl sm:text-6xl lg:text-8xl"
              id="about-page-title"
            >
              <span className="block">{content.hero.titlePrimary}</span>
              <span className="mt-2 block">{content.hero.titleSecondary}</span>
            </h1>
            <p className="mt-7 max-w-[36rem] text-base leading-7 text-copy-muted sm:text-lg sm:leading-8">
              {content.hero.introduction}
            </p>
          </header>
        </div>
      </section>

      <section aria-labelledby="about-story-title">
        <h2 className="sr-only" id="about-story-title">
          {content.storyHeading}
        </h2>
        <ol>
          {content.chapters.map((chapter, index) => {
            const media = chapterMedia[index];
            const headingId = `about-chapter-${chapter.number}`;
            const isPaper = media.tone === "paper";
            const secondaryMedia =
              "secondary" in media ? media.secondary : undefined;
            const imageClassName = `object-cover ${isPaper ? "mix-blend-multiply grayscale sepia-[.45] contrast-[1.03]" : "sepia-[.18] contrast-[1.08] saturate-[.72]"}`;

            return (
              <li
                className={`overflow-hidden ${isPaper ? "about-paper-row text-ink" : "bg-canvas text-copy"}`}
                data-chapter-number={chapter.number}
                key={chapter.number}
              >
                <div className="grid w-full pl-6 lg:grid-cols-[24rem_minmax(0,1fr)] lg:pl-10">
                  <article
                    aria-labelledby={headingId}
                    className={`relative z-10 flex flex-col justify-center border-l px-8 py-10 lg:px-10 lg:py-12 ${isPaper ? "border-[#705c3f]/60" : "border-brand/50"}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-12 -left-[0.4375rem] size-3 rounded-pill bg-brand lg:top-1/2 lg:-translate-y-1/2"
                    />
                    <p
                      className={`font-display text-4xl leading-none font-extrabold ${isPaper ? "text-[#a93600]" : "text-brand"}`}
                    >
                      {chapter.number}
                    </p>
                    <h3
                      className="mt-1 font-display text-4xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-5xl"
                      id={headingId}
                    >
                      {chapter.title}
                    </h3>
                    <p
                      className={`mt-5 text-base leading-7 ${isPaper ? "text-ink/75" : "text-copy-muted"}`}
                    >
                      {chapter.description}
                    </p>
                    <p
                      className={`mt-6 font-display text-sm font-bold tracking-[0.12em] uppercase ${isPaper ? "text-[#923100]" : "text-brand"}`}
                    >
                      {chapter.accent}
                    </p>
                  </article>

                  <figure
                    className={`about-chapter-media relative min-h-72 overflow-hidden lg:-ml-14 lg:min-h-[22rem] ${isPaper ? "bg-[#c8b38f]" : "bg-canvas"}`}
                  >
                    {secondaryMedia ? (
                      <div className="absolute inset-0 grid grid-cols-[44%_56%]">
                        <div className="relative overflow-hidden">
                          <Image
                            alt={chapter.imageAlt}
                            className={`${imageClassName} ${media.position}`}
                            fill
                            sizes="(min-width: 1024px) 30vw, 44vw"
                            src={media.src}
                          />
                        </div>
                        <div className="relative -ml-px overflow-hidden">
                          <Image
                            alt={chapter.secondaryImageAlt ?? ""}
                            className={`${imageClassName} ${secondaryMedia.position}`}
                            fill
                            sizes="(min-width: 1024px) 38vw, 56vw"
                            src={secondaryMedia.src}
                          />
                        </div>
                      </div>
                    ) : (
                      <Image
                        alt={chapter.imageAlt}
                        className={`${imageClassName} ${media.position}`}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        src={media.src}
                      />
                    )}
                  </figure>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section
        aria-labelledby="about-philosophy-title"
        className="border-y border-brand/40 bg-panel py-14 sm:py-16"
      >
        <div className="mx-auto w-full max-w-shell px-6 lg:px-10">
          <header className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <p className="font-display text-4xl leading-none font-extrabold text-brand">
              {content.philosophy.number}
            </p>
            <h2
              className="font-display text-4xl leading-none font-extrabold tracking-tight uppercase sm:text-5xl"
              id="about-philosophy-title"
            >
              {content.philosophy.title}
            </h2>
          </header>

          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4">
            {content.philosophy.values.map((value, index) => (
              <li
                className="border-t border-line px-2 py-8 sm:px-6 lg:border-t-0 lg:border-l lg:first:border-l-0"
                key={value.title}
              >
                <div className="text-brand">
                  <ValueIcon index={index} />
                </div>
                <h3 className="mt-4 font-display text-2xl font-extrabold uppercase">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-64 text-sm leading-6 text-copy-muted">
                  {value.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
