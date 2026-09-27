import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { ReactNode } from "react";

import type { LegalPageEditorialContent } from "@/content/editorial";

import { Container, SectionHeader } from "../ui";

type LegalPageProps = Readonly<{
  content: LegalPageEditorialContent;
  contentSource: "sanity" | "fallback";
  draftContentIssue?: string;
}>;

type LinkValue = Readonly<{
  href?: unknown;
  openInNewTab?: unknown;
}>;

function safeLinkHref(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  return /^(https?:|mailto:|tel:)/.test(value) ? value : undefined;
}

function LegalLink({
  children,
  value,
}: Readonly<{ children: ReactNode; value?: LinkValue }>) {
  const href = safeLinkHref(value?.href);

  if (!href) {
    return <span>{children}</span>;
  }

  const openInNewTab = value?.openInNewTab === true;

  return (
    <a
      className="font-semibold text-copy underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
      href={href}
      rel={openInNewTab ? "noreferrer" : undefined}
      target={openInNewTab ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

const legalTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 leading-8 text-copy-muted first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-3xl leading-tight font-extrabold tracking-tight text-copy uppercase first:mt-0 sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 font-display text-xl leading-tight font-bold text-copy uppercase sm:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-7 border-l-2 border-brand pl-5 leading-8 text-copy-muted italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-copy-muted marker:text-brand">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-copy-muted marker:font-bold marker:text-brand">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
    number: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  },
  marks: {
    link: LegalLink,
    code: ({ children }) => (
      <code className="rounded-sm bg-panel px-1.5 py-0.5 font-mono text-sm text-copy">
        {children}
      </code>
    ),
  },
} satisfies PortableTextComponents;

export function LegalPage({
  content,
  contentSource,
  draftContentIssue,
}: LegalPageProps) {
  return (
    <div
      className="min-h-screen overflow-hidden bg-canvas py-section text-copy"
      data-content-source={contentSource}
    >
      <Container>
        <section aria-labelledby="legal-page-title" className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-24 right-[-8rem] -z-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl sm:right-0"
          />
          <SectionHeader
            description={content.hero.introduction}
            eyebrow={content.hero.eyebrow}
            headingId="legal-page-title"
            level={1}
            size="page"
            title={content.hero.title}
          />
        </section>

        {draftContentIssue ? (
          <p
            className="mt-10 max-w-copy border border-brand bg-brand/10 px-5 py-4 text-sm leading-6 text-copy sm:text-base"
            data-draft-content-issue
            role="alert"
          >
            {draftContentIssue}
          </p>
        ) : null}

        {content.body.length > 0 ? (
          <article className="mt-14 max-w-3xl border-t border-line pt-12 sm:mt-20 sm:pt-16">
            <PortableText
              components={legalTextComponents}
              value={content.body}
            />
          </article>
        ) : null}
      </Container>
    </div>
  );
}
