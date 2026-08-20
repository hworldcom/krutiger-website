import Image from "next/image";

export type LogoDisplay = "header" | "footer" | "hero";

type LogoAltProps =
  | Readonly<{
      decorative: true;
      alt?: never;
    }>
  | Readonly<{
      decorative?: false;
      alt: string;
    }>;

export type LogoProps = LogoAltProps &
  Readonly<{
    display?: LogoDisplay;
    preload?: boolean;
  }>;

const displayClasses: Record<LogoDisplay, string> = {
  header: "h-12 w-12",
  footer: "h-20 w-20",
  hero: "h-auto w-full",
};

const displaySizes: Record<LogoDisplay, string> = {
  header: "3rem",
  footer: "5rem",
  hero: "(min-width: 1024px) 36vw, 80vw",
};

export function Logo({
  alt,
  decorative = false,
  display = "header",
  preload = false,
}: LogoProps) {
  const resolvedAlt = decorative ? "" : (alt ?? "");

  return (
    <Image
      alt={resolvedAlt}
      aria-hidden={decorative || undefined}
      className={displayClasses[display]}
      data-logo="krutiger-badge"
      height={1000}
      preload={preload}
      sizes={displaySizes[display]}
      src="/brand/krutiger-badge.png"
      width={1000}
    />
  );
}
