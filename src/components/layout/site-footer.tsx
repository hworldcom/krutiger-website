import Link from "next/link";

import type { Locale } from "../../i18n/config";
import type { Dictionary } from "../../i18n/dictionaries/types";
import { getLocalizedPath } from "../../i18n/routing";
import {
  legalNavigationRoutes,
  primaryNavigationRoutes,
  secondaryNavigationRoutes,
  type RouteId,
  type SiteRoute,
} from "../../lib/routes";
import { siteConfig } from "../../lib/site";
import { siteSettings } from "../../lib/site-settings";
import { Container, ContentCard, IconLink, Logo } from "../ui";

type FooterLabels = Dictionary["shell"]["footer"];

export type SiteFooterProps = Readonly<{
  currentYear?: number;
  homeLinkLabel: string;
  labels: FooterLabels;
  locale: Locale;
  routeLabels: Readonly<Record<RouteId, string>>;
}>;

type FooterNavigationProps = Readonly<{
  label: string;
  locale: Locale;
  routeLabels: Readonly<Record<RouteId, string>>;
  routes: readonly SiteRoute[];
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

function FooterNavigation({
  label,
  locale,
  routeLabels,
  routes,
}: FooterNavigationProps) {
  return (
    <nav aria-label={label}>
      <h2 className="font-display text-lg font-extrabold tracking-wide text-copy uppercase">
        {label}
      </h2>
      <ul className="mt-5 space-y-1">
        {routes.map((route) => (
          <li key={route.id}>
            <Link
              className="inline-flex min-h-11 items-center text-copy-muted underline-offset-4 transition-colors hover:text-copy hover:underline"
              href={getLocalizedPath(locale, route.path)}
            >
              {routeLabels[route.id]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter({
  currentYear = new Date().getFullYear(),
  homeLinkLabel,
  labels,
  locale,
  routeLabels,
}: SiteFooterProps) {
  const { contact, social } = siteSettings;
  const placeholderNoticeId =
    contact.status === "placeholder" ? "footer-placeholder-notice" : undefined;

  return (
    <footer className="border-t border-line bg-panel">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <Link
              aria-label={homeLinkLabel}
              className="inline-flex rounded-control"
              href={getLocalizedPath(locale)}
            >
              <Logo decorative display="footer" />
            </Link>
            <p className="mt-6 max-w-narrow leading-7 text-copy-muted">
              {labels.brandStatement}
            </p>

            <div className="mt-8">
              <h2 className="font-display text-lg font-extrabold tracking-wide text-copy uppercase">
                {labels.socialHeading}
              </h2>
              <div className="mt-4 flex items-center gap-4">
                <IconLink
                  href={social.instagram.url}
                  icon={<InstagramIcon />}
                  label={labels.instagramLinkLabel}
                />
                <span className="break-all text-sm text-copy-muted">
                  {social.instagram.handle}
                </span>
              </div>
            </div>
          </div>

          <FooterNavigation
            label={labels.primaryNavigationLabel}
            locale={locale}
            routeLabels={routeLabels}
            routes={primaryNavigationRoutes}
          />

          <FooterNavigation
            label={labels.secondaryNavigationLabel}
            locale={locale}
            routeLabels={routeLabels}
            routes={secondaryNavigationRoutes}
          />

          <section aria-describedby={placeholderNoticeId}>
            <h2 className="font-display text-lg font-extrabold tracking-wide text-copy uppercase">
              {labels.contactHeading}
            </h2>

            <div className="mt-5 space-y-7 text-copy-muted">
              <div>
                <h3 className="text-sm font-bold tracking-wide text-copy uppercase">
                  {labels.addressLabel}
                </h3>
                <address className="mt-2 leading-7 not-italic">
                  {contact.address.lines.map((line) => (
                    <span className="block" key={line}>
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  className="mt-2 inline-flex min-h-11 items-center font-bold text-copy underline decoration-brand decoration-2 underline-offset-4"
                  href={contact.address.mapUrl}
                >
                  {labels.mapAction}
                </a>
              </div>

              <dl className="space-y-5">
                <div>
                  <dt className="text-sm font-bold tracking-wide text-copy uppercase">
                    {labels.emailLabel}
                  </dt>
                  <dd className="mt-1">
                    <a
                      className="inline-flex min-h-11 items-center underline-offset-4 hover:text-copy hover:underline"
                      href={contact.email.href}
                    >
                      {contact.email.displayValue}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-bold tracking-wide text-copy uppercase">
                    {labels.phoneLabel}
                  </dt>
                  <dd className="mt-1">
                    <a
                      className="inline-flex min-h-11 items-center underline-offset-4 hover:text-copy hover:underline"
                      href={contact.phone.href}
                    >
                      {contact.phone.displayValue}
                    </a>
                  </dd>
                </div>
              </dl>

              <div>
                <h3 className="text-sm font-bold tracking-wide text-copy uppercase">
                  {labels.openingHoursLabel}
                </h3>
                <dl className="mt-2 space-y-2">
                  {contact.openingHours.map((entry) => (
                    <div
                      className="flex flex-wrap justify-between gap-x-4 gap-y-1"
                      key={entry.days.de}
                    >
                      <dt>{entry.days[locale]}</dt>
                      <dd className="font-bold text-copy">
                        {entry.hours[locale]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        </div>

        {contact.status === "placeholder" ? (
          <ContentCard
            aria-labelledby="footer-placeholder-heading"
            as="section"
            id={placeholderNoticeId}
            padding="compact"
          >
            <h2
              className="font-display text-lg font-extrabold tracking-wide text-signal uppercase"
              id="footer-placeholder-heading"
            >
              {labels.placeholderDataLabel}
            </h2>
            <p className="mt-2 max-w-copy leading-7 text-copy-muted">
              {labels.placeholderDataDescription}
            </p>
          </ContentCard>
        ) : null}

        <div className="mt-12 flex flex-col gap-6 border-t border-line py-8 text-sm text-copy-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} {siteConfig.name}. {labels.rightsStatement}
          </p>
          <nav aria-label={labels.legalNavigationLabel}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNavigationRoutes.map((route) => (
                <li key={route.id}>
                  <Link
                    className="inline-flex min-h-11 items-center underline-offset-4 hover:text-copy hover:underline"
                    href={getLocalizedPath(locale, route.path)}
                  >
                    {routeLabels[route.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
