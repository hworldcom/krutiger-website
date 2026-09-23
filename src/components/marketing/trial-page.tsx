import { ButtonLink, Container, SectionHeader } from "@/components/ui";
import type { Dictionary, TrialPageCopy } from "@/i18n/dictionaries/types";
import { trialSessionPassCheckoutUrl } from "@/lib/bsport/passes";

type TrialPageProps = Readonly<{
  content: Dictionary["routes"]["trialClass"];
  details: TrialPageCopy;
}>;

export function TrialPage({ content, details }: TrialPageProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-canvas py-section text-copy">
      <Container>
        <section aria-labelledby="trial-page-title" className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-24 right-[-8rem] -z-10 h-96 w-96 rounded-full bg-brand/10 blur-3xl sm:right-0"
          />
          <SectionHeader
            description={content.description}
            eyebrow={content.eyebrow}
            headingId="trial-page-title"
            level={1}
            size="page"
            title={content.title}
          />
        </section>

        <section
          aria-labelledby="trial-offer-title"
          className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-16"
          data-trial-offer="true"
        >
          <div className="max-w-3xl">
            <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
              {details.offerEyebrow}
            </p>
            <h2
              className="mt-4 font-display text-5xl leading-none font-extrabold tracking-tight uppercase sm:text-7xl"
              id="trial-offer-title"
            >
              {details.offerTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-copy-muted sm:text-lg">
              {details.offerDescription}
            </p>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            {details.benefits.map((benefit, index) => (
              <li
                className="flex min-h-64 flex-col border border-line bg-panel/70 p-6 sm:p-8"
                key={benefit.title}
              >
                <p className="font-display text-lg font-bold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 font-display text-3xl leading-none font-extrabold uppercase">
                  {benefit.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-copy-muted">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="trial-booking-title"
          className="mt-16 border-t-2 border-brand bg-panel px-5 py-10 sm:mt-20 sm:px-10 sm:py-14 lg:flex lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-3xl">
            <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
              {details.bookingEyebrow}
            </p>
            <h2
              className="mt-4 font-display text-4xl leading-none font-extrabold uppercase sm:text-6xl"
              id="trial-booking-title"
            >
              {details.bookingTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-copy-muted">
              {details.bookingDescription}
            </p>
          </div>

          <div className="mt-8 shrink-0 lg:mt-0 lg:max-w-sm">
            <ButtonLink href={trialSessionPassCheckoutUrl} stretch>
              {details.bookingAction}
              <span aria-hidden="true">→</span>
            </ButtonLink>
            <p className="mt-4 text-sm leading-6 text-copy-muted">
              {details.secureNotice}
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}
