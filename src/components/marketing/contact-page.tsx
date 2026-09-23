import { ContactForm } from "@/components/marketing/contact-form";
import { ButtonLink, Container, SectionHeader } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { ContactPageCopy, Dictionary } from "@/i18n/dictionaries/types";
import { getLocalizedPath } from "@/i18n/routing";
import { siteSettings } from "@/lib/site-settings";

type ContactPageProps = Readonly<{
  content: Dictionary["routes"]["contact"];
  details: ContactPageCopy;
  locale: Locale;
}>;

export function ContactPage({ content, details, locale }: ContactPageProps) {
  const { address, email } = siteSettings.contact;
  const { instagram } = siteSettings.social;

  return (
    <div className="min-h-screen overflow-hidden bg-canvas py-section text-copy">
      <Container>
        <section aria-labelledby="contact-page-title" className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-20 right-[-7rem] -z-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl sm:right-0"
          />
          <SectionHeader
            description={content.description}
            eyebrow={content.eyebrow}
            headingId="contact-page-title"
            level={1}
            size="page"
            title={content.title}
          />
        </section>

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <ContactForm
            copy={details.form}
            privacyHref={getLocalizedPath(locale, "/datenschutz")}
            recipient={email.displayValue}
          />

          <aside className="border-t-2 border-brand bg-panel p-6 sm:p-8">
            <p className="font-display text-sm font-bold tracking-[0.22em] text-brand uppercase">
              {details.details.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-none font-extrabold uppercase">
              {details.details.title}
            </h2>

            <dl className="mt-9 space-y-8">
              <div>
                <dt className="font-display text-sm font-bold tracking-wider text-copy-muted uppercase">
                  {details.details.emailLabel}
                </dt>
                <dd className="mt-2 break-words">
                  <a
                    className="text-lg font-bold underline decoration-brand underline-offset-4 hover:text-brand"
                    href={email.href}
                  >
                    {email.displayValue}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="font-display text-sm font-bold tracking-wider text-copy-muted uppercase">
                  {details.details.addressLabel}
                </dt>
                <dd className="mt-2">
                  <address className="text-base leading-7 not-italic">
                    {address.lines.map((line) => (
                      <span className="block" key={line}>
                        {line}
                      </span>
                    ))}
                  </address>
                  <ButtonLink
                    href={address.mapUrl}
                    rel="noreferrer"
                    size="compact"
                    target="_blank"
                    variant="ghost"
                  >
                    {details.details.addressAction}
                    <span aria-hidden="true">↗</span>
                  </ButtonLink>
                </dd>
              </div>

              <div>
                <dt className="font-display text-sm font-bold tracking-wider text-copy-muted uppercase">
                  {details.details.instagramLabel}
                </dt>
                <dd className="mt-2">
                  <a
                    className="text-lg font-bold underline decoration-brand underline-offset-4 hover:text-brand"
                    href={instagram.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {instagram.handle}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </div>
  );
}
