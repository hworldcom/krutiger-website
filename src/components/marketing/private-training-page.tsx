import { BsportPrivateTrainingWidget } from "@/components/bsport/bsport-private-training-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type PrivateTrainingPageProps = Readonly<{
  content: Dictionary["routes"]["privateTraining"];
  guide: Dictionary["privateTrainingPage"];
  integration: Dictionary["integrations"]["privateTraining"];
  locale: Locale;
}>;

export function PrivateTrainingPage({
  content,
  guide,
  integration,
  locale,
}: PrivateTrainingPageProps) {
  return (
    <section className="min-h-screen py-section">
      <Container>
        <SectionHeader
          description={content.description}
          eyebrow={content.eyebrow}
          headingId="private-training-page-title"
          level={1}
          size="page"
          title={content.title}
        />

        <section
          aria-labelledby="private-training-guide-title"
          className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-16"
        >
          <div className="max-w-3xl">
            <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
              {guide.eyebrow}
            </p>
            <h2
              className="mt-4 font-display text-3xl leading-none font-extrabold tracking-tight uppercase sm:text-5xl"
              id="private-training-guide-title"
            >
              {guide.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-copy-muted sm:text-lg">
              {guide.description}
            </p>
          </div>

          <ol className="mt-9 grid gap-5 lg:grid-cols-3">
            {guide.steps.map((step, index) => (
              <li
                className="border border-line bg-panel/70 p-6 sm:p-7"
                key={step.title}
              >
                <p className="font-display text-lg font-bold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-display text-2xl leading-none font-bold uppercase">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-copy-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <BsportPrivateTrainingWidget copy={integration} locale={locale} />
      </Container>
    </section>
  );
}
