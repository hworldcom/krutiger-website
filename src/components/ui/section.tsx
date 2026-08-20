import type { ComponentPropsWithRef } from "react";

export type SectionTone = "canvas" | "panel" | "warm";
export type SectionSpacing = "compact" | "default";

const toneClasses: Record<SectionTone, string> = {
  canvas: "bg-canvas text-copy",
  panel: "bg-panel text-copy",
  warm: "bg-warm-canvas text-ink",
};

const spacingClasses: Record<SectionSpacing, string> = {
  compact: "py-12 sm:py-16",
  default: "py-section",
};

export type SectionProps = Omit<
  ComponentPropsWithRef<"section">,
  "className" | "style"
> &
  Readonly<{
    tone?: SectionTone;
    spacing?: SectionSpacing;
  }>;

export function Section({
  children,
  ref,
  spacing = "default",
  tone = "canvas",
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={`${toneClasses[tone]} ${spacingClasses[spacing]}`}
      ref={ref}
    >
      {children}
    </section>
  );
}
