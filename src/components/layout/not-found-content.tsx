import { ButtonLink, Container } from "@/components/ui";
import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

export function NotFoundContent() {
  const germanContent = de.notFound;
  const englishContent = en.notFound;

  return (
    <section className="flex min-h-screen items-center py-section">
      <Container>
        <p className="font-display text-sm font-bold tracking-[0.22em] text-signal uppercase">
          {germanContent.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl">
          {germanContent.title}
        </h1>
        <p className="mt-8 max-w-copy text-lg leading-8 text-copy-muted">
          {germanContent.description}
        </p>
        <p
          className="mt-4 max-w-copy text-lg leading-8 text-copy-muted"
          lang="en"
        >
          {englishContent.title}. {englishContent.description}
        </p>
        <div className="mt-10 flex flex-col gap-4 xs:flex-row">
          <ButtonLink href="/de">{germanContent.homeAction}</ButtonLink>
          <ButtonLink href="/en" lang="en" variant="secondary">
            {englishContent.homeAction}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
