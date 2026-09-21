import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  Button,
  ButtonLink,
  Container,
  ContentCard,
  IconLink,
  Logo,
  Section,
  SectionHeader,
  VisuallyHidden,
} from "@/components/ui";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Component showcase",
  robots: {
    follow: false,
    index: false,
  },
};

const copy = {
  de: {
    back: "Zur Startseite",
    description:
      "Interne Übersicht der gemeinsam verwendeten Layout- und Interaktionsbausteine.",
    eyebrow: "Nur Entwicklung",
    iconLink: "Instagram öffnen",
    title: "UI-Bausteine",
  },
  en: {
    back: "Back to home",
    description:
      "Internal review surface for the shared layout and interaction building blocks.",
    eyebrow: "Development only",
    iconLink: "Open Instagram",
    title: "UI primitives",
  },
} satisfies Record<Locale, Record<string, string>>;

type ComponentShowcasePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

function InstagramIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24">
      <rect
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
        width="17"
        x="3.5"
        y="3.5"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.7" cy="6.4" fill="currentColor" r="1" />
    </svg>
  );
}

export default async function ComponentShowcasePage({
  params,
}: ComponentShowcasePageProps) {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const labels = copy[locale];

  return (
    <div>
      <Section spacing="compact">
        <Container>
          <SectionHeader
            description={labels.description}
            eyebrow={labels.eyebrow}
            level={1}
            size="page"
            title={labels.title}
          />
          <div className="mt-10">
            <ButtonLink href={`/${locale}`} variant="secondary">
              {labels.back}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section id="buttons" tone="panel">
        <Container>
          <SectionHeader
            description="Buttons submit actions; button-style links navigate. Hover, active, focus-visible, and disabled states use the same token-backed rules."
            title="Buttons and links"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <ContentCard>
              <h3 className="font-display text-3xl font-bold uppercase">
                Button variants
              </h3>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button size="compact">Compact</Button>
                <Button disabled>Disabled</Button>
              </div>
            </ContentCard>
            <ContentCard>
              <h3 className="font-display text-3xl font-bold uppercase">
                Link variants
              </h3>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <ButtonLink href="#cards">Primary link</ButtonLink>
                <ButtonLink href="#cards" variant="secondary">
                  Secondary link
                </ButtonLink>
                <ButtonLink href="#cards" size="compact" variant="ghost">
                  Compact ghost link
                </ButtonLink>
              </div>
            </ContentCard>
          </div>
        </Container>
      </Section>

      <Section id="cards" tone="warm">
        <Container>
          <SectionHeader
            description="Cards provide two surface tones, two padding sizes, and optional elevation."
            title="Content cards"
            tone="ink"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ContentCard elevation="raised">
              <h3 className="font-display text-3xl font-bold uppercase">
                Panel, raised
              </h3>
              <p className="mt-4 leading-7 text-copy-muted">
                Default padding on the dark application surface.
              </p>
            </ContentCard>
            <ContentCard padding="compact" tone="warm">
              <h3 className="font-display text-3xl font-bold uppercase">
                Warm, compact
              </h3>
              <p className="mt-4 leading-7 text-ink-muted">
                Compact padding on the light editorial surface.
              </p>
            </ContentCard>
          </div>
        </Container>
      </Section>

      <Section id="layout">
        <Container>
          <SectionHeader
            description="Section owns vertical rhythm and surface tone; Container owns readable horizontal bounds."
            title="Layout and type"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <Logo alt="KRUTIGER Muay Thai" display="footer" />
            <div>
              <SectionHeader
                description="A level-three example for content nested below a page or section heading."
                eyebrow="SectionHeader"
                level={3}
                title="Semantic heading levels"
              />
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <IconLink
              href="https://www.instagram.com/krutigermuaythai/"
              icon={<InstagramIcon />}
              label={labels.iconLink}
            />
            <p className="text-copy-muted">
              IconLink includes a visually hidden accessible label.
            </p>
            <VisuallyHidden>
              This sentence is available to assistive technology only.
            </VisuallyHidden>
          </div>
        </Container>
      </Section>
    </div>
  );
}
