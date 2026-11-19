import { ButtonLink, Container } from "@/components/ui";
import type {
  Dictionary,
  TrialOfferCopy,
  TrialPageCopy,
} from "@/i18n/dictionaries/types";
import {
  singleTrialSessionPassCheckoutUrl,
  trialSessionPassCheckoutUrl,
} from "@/lib/bsport/passes";

import styles from "./trial-page.module.css";

type TrialPageProps = Readonly<{
  content: Dictionary["routes"]["trialClass"];
  details: TrialPageCopy;
}>;

function OfferBenefits({
  benefits,
  className,
}: Readonly<{ benefits: TrialOfferCopy["benefits"]; className?: string }>) {
  return (
    <ul className={className}>
      {benefits.map((benefit) => (
        <li className="flex items-start gap-2.5" key={benefit}>
          <span aria-hidden="true" className="shrink-0 font-bold text-brand">
            ✓
          </span>
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  );
}

export function TrialPage({ content, details }: TrialPageProps) {
  const offers = [
    {
      id: "trial-pass",
      copy: details.trialPass,
      href: trialSessionPassCheckoutUrl,
      recommended: true,
    },
    {
      id: "single-session",
      copy: details.singleSession,
      href: singleTrialSessionPassCheckoutUrl,
      recommended: false,
    },
  ] as const;

  return (
    <div className="bg-canvas py-7 text-copy sm:py-10">
      <Container>
        <header>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h1 className={styles.pageTitle}>{content.title}</h1>
          <p className="mt-3 text-sm leading-6 text-copy-muted sm:text-base">
            {content.description}
          </p>
        </header>

        <section
          aria-labelledby="trial-offer-title"
          className="mt-6 border-t border-line pt-5 sm:mt-8 sm:pt-6"
          data-trial-offer="true"
        >
          <p className={styles.eyebrow}>{details.offerEyebrow}</p>
          <h2 className={styles.offerTitle} id="trial-offer-title">
            {details.offerTitle}
          </h2>

          <div className={styles.offers}>
            {offers.map(({ id, copy, href, recommended }) => (
              <article
                aria-labelledby={`${id}-title`}
                className={`${styles.offer} ${recommended ? styles.recommended : ""}`}
                key={id}
              >
                {recommended ? (
                  <p className={styles.badge}>{details.recommendedBadge}</p>
                ) : (
                  <div aria-hidden="true" className={styles.badgeSpacer} />
                )}

                <div className={styles.productHeading}>
                  <h3 id={`${id}-title`}>{copy.title}</h3>
                  <p className={styles.price}>{copy.price}</p>
                </div>

                <p className={styles.audience}>
                  <em>{copy.audience}</em>
                </p>

                <p className={styles.description}>{copy.description}</p>
                <OfferBenefits
                  benefits={copy.benefits}
                  className={styles.benefits}
                />

                <p className={styles.compactSummary}>{copy.compactSummary}</p>

                <div className={styles.booking}>
                  <ButtonLink
                    href={href}
                    stretch
                    variant={recommended ? "primary" : "secondary"}
                  >
                    <span>{copy.bookingAction}</span>
                    <span aria-hidden="true" className="shrink-0">
                      →
                    </span>
                  </ButtonLink>
                </div>

                <details className={styles.mobileDetails}>
                  <summary>
                    {details.detailsAction}
                    <span aria-hidden="true" className={styles.detailsIcon} />
                  </summary>
                  <p>{copy.description}</p>
                  <OfferBenefits benefits={copy.benefits} />
                </details>
              </article>
            ))}
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-copy-muted">
            {details.secureNotice}
          </p>
        </section>
      </Container>
    </div>
  );
}
