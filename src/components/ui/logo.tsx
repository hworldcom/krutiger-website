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
  header: "h-16 w-16",
  footer: "h-28 w-28",
  hero: "h-auto w-full",
};

const displaySizes: Record<LogoDisplay, string> = {
  header: "4rem",
  footer: "7rem",
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
      data-logo="kru-tiger-logo"
      height={1254}
      preload={preload}
      sizes={displaySizes[display]}
      src="/images/home/kru-tiger-logo.png"
      width={1254}
    />
  );
}
