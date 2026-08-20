import { notFound } from "next/navigation";

import {
  ButtonLink,
  Container,
  ContentCard,
  Logo,
  Section,
} from "@/components/ui";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const swatches = [
  { className: "bg-brand", key: "brand", value: "#F96900" },
  { className: "bg-signal", key: "signal", value: "#F8003D" },
  { className: "bg-copy", key: "copy", value: "#FAFAFA" },
  {
    className: "bg-warm-canvas",
    key: "warmCanvas",
    value: "#F5F0E8",
  },
] as const;

type LocalePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function Home({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const { preview } = dictionary;

  return (
    <div>
      <section className="flex min-h-screen items-center py-section">
        <Container>
          <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1fr)_28rem]">
            <div>
              <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
                {preview.eyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-6xl leading-[0.88] font-extrabold tracking-tight uppercase xs:text-7xl md:text-8xl">
                {preview.heading}
              </h1>
              <p className="mt-8 max-w-copy text-lg leading-8 text-copy-muted">
                {preview.introduction}
              </p>

              <div className="mt-10 flex flex-col gap-4 xs:flex-row">
                <ButtonLink href="#typography">
                  {preview.typographyAction}
                </ButtonLink>
                <ButtonLink href="#palette" variant="secondary">
                  {preview.paletteAction}
                </ButtonLink>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md">
              <Logo alt={preview.logoAlt} display="hero" preload />
            </div>
          </div>
        </Container>
      </section>

      <Section id="typography" tone="panel">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
                {preview.typography.displayLabel}
              </p>
              <h2 className="mt-4 font-display text-5xl leading-none font-extrabold uppercase sm:text-7xl">
                Barlow Condensed
              </h2>
              <p className="mt-5 max-w-copy text-copy-muted">
                {preview.typography.displayDescription}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold tracking-[0.16em] text-brand uppercase">
                {preview.typography.bodyLabel}
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Noto Sans
              </h2>
              <p className="mt-5 max-w-copy text-lg leading-8 text-copy-muted">
                {preview.typography.bodyDescription}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="palette" tone="warm">
        <Container>
          <p className="font-display text-sm font-bold tracking-[0.22em] text-ink-muted uppercase">
            {preview.palette.label}
          </p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-display text-5xl leading-none font-extrabold uppercase sm:text-7xl">
              {preview.palette.heading}
            </h2>
            <p className="max-w-narrow text-lg leading-8 text-ink-muted">
              {preview.palette.introduction}
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {swatches.map((swatch) => (
              <li
                className="overflow-hidden rounded-card border border-line bg-warm-canvas"
                key={swatch.key}
              >
                <div
                  aria-hidden="true"
                  className={`h-28 ${swatch.className}`}
                />
                <div className="flex items-center justify-between gap-4 p-4">
                  <span className="font-bold">
                    {preview.palette.swatches[swatch.key]}
                  </span>
                  <code className="text-sm text-ink-muted">{swatch.value}</code>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <ContentCard elevation="raised">
              <div className="h-1 w-16 bg-brand" aria-hidden="true" />
              <h3 className="mt-8 font-display text-4xl font-bold uppercase">
                {preview.palette.darkSurfaceHeading}
              </h3>
              <p className="mt-4 leading-7 text-copy-muted">
                {preview.palette.darkSurfaceDescription}
              </p>
            </ContentCard>
            <ContentCard tone="warm">
              <div className="h-1 w-16 bg-signal" aria-hidden="true" />
              <h3 className="mt-8 font-display text-4xl font-bold uppercase">
                {preview.palette.lightSurfaceHeading}
              </h3>
              <p className="mt-4 leading-7 text-ink-muted">
                {preview.palette.lightSurfaceDescription}
              </p>
            </ContentCard>
          </div>
        </Container>
      </Section>
    </div>
  );
}
