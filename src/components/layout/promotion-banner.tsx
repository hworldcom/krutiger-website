import Link from "next/link";

import type { SiteEditorialContent } from "@/content/editorial";

import { Container } from "../ui";

type PromotionBannerProps = Readonly<{
  promotion: SiteEditorialContent["promotion"];
}>;

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
      />
    </svg>
  );
}

function PromotionLink({
  href,
  label,
}: Readonly<{ href: string; label: string }>) {
  const className =
    "inline-flex min-h-8 shrink-0 items-center gap-1.5 font-display font-extrabold tracking-wide underline decoration-2 underline-offset-4 transition-opacity hover:opacity-75";
  const children = (
    <>
      <span>{label}</span>
      <ArrowIcon />
    </>
  );

  return href.startsWith("/") ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

export function PromotionBanner({ promotion }: PromotionBannerProps) {
  if (!promotion.enabled || !promotion.message) {
    return null;
  }

  return (
    <div className="bg-brand text-brand-ink" data-promotion-banner="true">
      <Container>
        <div className="flex min-h-11 flex-col items-center justify-center gap-x-5 gap-y-1 py-1.5 text-center sm:flex-row">
          <p className="whitespace-pre-line text-sm leading-5 font-semibold sm:text-base">
            {promotion.message}
          </p>
          {promotion.link ? <PromotionLink {...promotion.link} /> : null}
        </div>
      </Container>
    </div>
  );
}
