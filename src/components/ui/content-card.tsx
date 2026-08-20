import type { HTMLAttributes, ReactNode } from "react";

export type ContentCardTone = "panel" | "warm";
export type ContentCardPadding = "compact" | "default";
export type ContentCardElevation = "flat" | "raised";

export type ContentCardProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "className" | "style"
> &
  Readonly<{
    as?: "article" | "div" | "section";
    children: ReactNode;
    elevation?: ContentCardElevation;
    padding?: ContentCardPadding;
    tone?: ContentCardTone;
  }>;

const toneClasses: Record<ContentCardTone, string> = {
  panel: "border-line bg-panel text-copy",
  warm: "border-line bg-warm-canvas text-ink",
};

const paddingClasses: Record<ContentCardPadding, string> = {
  compact: "p-5",
  default: "p-6 sm:p-8",
};

const elevationClasses: Record<ContentCardElevation, string> = {
  flat: "shadow-none",
  raised: "shadow-card",
};

export function ContentCard({
  as: Component = "article",
  children,
  elevation = "flat",
  padding = "default",
  tone = "panel",
  ...props
}: ContentCardProps) {
  return (
    <Component
      {...props}
      className={`rounded-card border ${toneClasses[tone]} ${paddingClasses[padding]} ${elevationClasses[elevation]}`}
    >
      {children}
    </Component>
  );
}
