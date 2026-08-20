export type HeadingLevel = 1 | 2 | 3;
export type HeaderSize = "page" | "section";
export type HeaderTone = "default" | "ink";

export type SectionHeaderProps = Readonly<{
  title: string;
  eyebrow?: string;
  description?: string;
  headingId?: string;
  level?: HeadingLevel;
  size?: HeaderSize;
  tone?: HeaderTone;
}>;

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
} as const;

const headingClasses: Record<HeaderSize, string> = {
  page: "text-6xl leading-[0.9] sm:text-7xl lg:text-8xl",
  section: "text-5xl leading-none sm:text-7xl",
};

const toneClasses: Record<HeaderTone, { body: string; eyebrow: string }> = {
  default: {
    body: "text-copy-muted",
    eyebrow: "text-brand",
  },
  ink: {
    body: "text-ink-muted",
    eyebrow: "text-ink-muted",
  },
};

export function SectionHeader({
  description,
  eyebrow,
  headingId,
  level = 2,
  size = "section",
  title,
  tone = "default",
}: SectionHeaderProps) {
  const Heading = headingTags[level];

  return (
    <header>
      {eyebrow ? (
        <p
          className={`font-display text-sm font-bold tracking-[0.22em] uppercase ${toneClasses[tone].eyebrow}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={`mt-5 max-w-4xl font-display font-extrabold tracking-tight uppercase ${headingClasses[size]}`}
        id={headingId}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={`mt-8 max-w-copy text-lg leading-8 ${toneClasses[tone].body}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
