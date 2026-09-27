import Image from "next/image";

import type { TeamMember } from "@/content/team";
import type { TeamPageCopy } from "@/i18n/dictionaries/types";

type TeamMemberCardProps = Readonly<{
  labels: Pick<
    TeamPageCopy,
    | "biographyHideAction"
    | "biographyReadAction"
    | "socialLinkAction"
    | "socialLinkLabel"
    | "socialLinkUnavailable"
  >;
  member: TeamMember;
}>;

function getSocialLinkLabel(template: string, name: string) {
  return template.replace("{name}", name);
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0"
      data-instagram-icon="true"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
        width="17"
        x="3.5"
        y="3.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.7" fill="currentColor" r="1.1" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform group-open/bio:rotate-180"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m7 9 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      />
    </svg>
  );
}

export function TeamMemberCard({ labels, member }: TeamMemberCardProps) {
  const headingId = `team-member-${member.internalKey}`;

  return (
    <article
      aria-labelledby={headingId}
      className="group flex min-w-0 self-start flex-col overflow-hidden rounded-card border border-line bg-panel shadow-card"
      data-team-member={member.internalKey}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-panel-raised">
        <Image
          alt={member.photo.alternativeText}
          className="object-cover grayscale-[.12] contrast-[1.05] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025]"
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          src={member.photo.src}
          style={{ objectPosition: member.photo.objectPosition }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-panel via-panel/45 to-transparent"
        />
      </div>

      <div className="relative -mt-24 flex flex-1 flex-col px-6 pb-7 sm:px-7 sm:pb-8">
        <p className="font-display text-sm font-bold tracking-[0.18em] text-brand uppercase">
          {member.role}
        </p>
        <h3
          className="mt-2 font-display text-4xl leading-none font-extrabold tracking-tight uppercase"
          id={headingId}
        >
          {member.name}
        </h3>
      </div>

      <details
        className="group/bio border-t border-line bg-panel-raised/15"
        data-team-biography="disclosure"
      >
        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-6 font-display text-sm font-bold tracking-[0.08em] text-copy uppercase transition-colors hover:bg-panel-raised hover:text-brand sm:px-7 [&::-webkit-details-marker]:hidden">
          <span className="group-open/bio:hidden">
            {labels.biographyReadAction}
          </span>
          <span className="hidden group-open/bio:inline">
            {labels.biographyHideAction}
          </span>
          <span className="ml-auto text-brand">
            <ChevronIcon />
          </span>
        </summary>
        <p className="px-6 pb-6 text-base leading-7 whitespace-pre-line text-copy-muted sm:px-7 sm:pb-7">
          {member.biography}
        </p>
      </details>

      {member.socialUrl ? (
        <a
          aria-label={getSocialLinkLabel(labels.socialLinkLabel, member.name)}
          className="group/profile flex min-h-16 items-center gap-3 border-t border-line bg-panel-raised/35 px-6 font-display text-base font-bold tracking-[0.08em] text-copy uppercase transition-colors hover:bg-panel-raised hover:text-brand sm:px-7"
          data-team-profile-link="instagram"
          href={member.socialUrl}
          rel="noreferrer"
          target="_blank"
        >
          <span className="text-brand">
            <InstagramIcon />
          </span>
          <span>{labels.socialLinkAction}</span>
          <span
            aria-hidden="true"
            className="ml-auto text-brand transition-transform group-hover/profile:translate-x-0.5 group-hover/profile:-translate-y-0.5"
          >
            ↗
          </span>
        </a>
      ) : (
        <div
          className="flex min-h-16 items-center gap-3 border-t border-line bg-panel-raised/20 px-6 font-display text-sm font-bold tracking-[0.06em] text-copy-muted uppercase sm:px-7"
          data-team-profile-status="unavailable"
        >
          <span className="text-copy-muted/60">
            <InstagramIcon />
          </span>
          <span>{labels.socialLinkUnavailable}</span>
        </div>
      )}
    </article>
  );
}
