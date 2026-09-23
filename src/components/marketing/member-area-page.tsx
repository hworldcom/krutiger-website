import { BsportMemberLoginWidget } from "@/components/bsport/bsport-member-login-widget";
import { ButtonLink, Container, SectionHeader } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { Locale } from "@/i18n/config";
import { getLocalizedPath } from "@/i18n/routing";

type MemberAreaPageProps = Readonly<{
  content: Dictionary["routes"]["memberArea"];
  guide: Dictionary["memberAreaPage"];
  integration: Dictionary["integrations"]["memberArea"];
  locale: Locale;
}>;

const choiceIds = ["membership", "passes", "trial"] as const;

export function MemberAreaPage({
  content,
  guide,
  integration,
  locale,
}: MemberAreaPageProps) {
  const pricingHref = getLocalizedPath(locale, "/prices");
  const scheduleHref = getLocalizedPath(locale, "/schedule");
  const choiceHrefs = {
    membership: `${pricingHref}#pricing-offer-tab-memberships`,
    passes: `${pricingHref}#pricing-offer-tab-passes`,
    trial: getLocalizedPath(locale, "/trial"),
  } as const;

  return (
    <div className="min-h-screen overflow-hidden bg-canvas py-section text-copy">
      <Container>
        <section aria-labelledby="member-area-title" className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-20 right-[-7rem] -z-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl sm:right-0"
          />
          <SectionHeader
            description={content.description}
            eyebrow={content.eyebrow}
            headingId="member-area-title"
            level={1}
            size="page"
            title={content.title}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={pricingHref}>{guide.pricingAction}</ButtonLink>
            <ButtonLink href="#member-login" variant="secondary">
              {guide.existingMemberAction}
            </ButtonLink>
          </div>
        </section>

        <section
          aria-labelledby="member-choice-title"
          className="mt-20 border-t border-line pt-14 sm:mt-28 sm:pt-20"
        >
          <div className="max-w-3xl">
            <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
              {guide.choices.eyebrow}
            </p>
            <h2
              className="mt-4 font-display text-4xl leading-none font-extrabold tracking-tight uppercase sm:text-6xl"
              id="member-choice-title"
            >
              {guide.choices.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-copy-muted sm:text-lg">
              {guide.choices.description}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {choiceIds.map((choiceId, index) => {
              const choice = guide.choices[choiceId];

              return (
                <article
                  className="group flex min-h-72 flex-col border border-line bg-panel/70 p-6 transition-colors hover:border-brand/70 sm:p-8"
                  key={choiceId}
                >
                  <p className="font-display text-lg font-bold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-7 font-display text-3xl leading-none font-extrabold uppercase">
                    {choice.title}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-7 text-copy-muted">
                    {choice.description}
                  </p>
                  <ButtonLink
                    href={choiceHrefs[choiceId]}
                    size="compact"
                    stretch
                    variant={choiceId === "trial" ? "primary" : "secondary"}
                  >
                    {choice.action}
                    <span aria-hidden="true">→</span>
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="member-steps-title"
          className="mt-20 bg-panel px-5 py-12 sm:mt-28 sm:px-10 sm:py-16 lg:px-14"
        >
          <div className="max-w-3xl">
            <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
              {guide.steps.eyebrow}
            </p>
            <h2
              className="mt-4 font-display text-4xl leading-none font-extrabold tracking-tight uppercase sm:text-6xl"
              id="member-steps-title"
            >
              {guide.steps.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-copy-muted sm:text-lg">
              {guide.steps.description}
            </p>
          </div>

          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {guide.steps.items.map((step, index) => (
              <li className="border-t border-brand/60 pt-5" key={step.title}>
                <div className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl leading-none font-extrabold text-brand"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-none font-bold uppercase">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-copy-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <ButtonLink href={scheduleHref} variant="secondary">
              {guide.steps.scheduleAction}
              <span aria-hidden="true">→</span>
            </ButtonLink>
          </div>
        </section>

        <div className="scroll-mt-28 pt-10 sm:pt-16" id="member-login">
          <BsportMemberLoginWidget copy={integration} locale={locale} />
        </div>
      </Container>
    </div>
  );
}
