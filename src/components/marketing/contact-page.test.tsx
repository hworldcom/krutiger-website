import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";
import { siteSettings } from "@/lib/site-settings";

import { createContactMailto } from "./contact-form";
import { ContactPage } from "./contact-page";

describe("ContactPage", () => {
  it("renders the German form and verified contact destinations", () => {
    const markup = renderToStaticMarkup(
      <ContactPage
        content={de.routes.contact}
        details={de.contactPage}
        locale="de"
      />,
    );

    expect(markup).toContain('data-contact-form="true"');
    expect(markup).toContain('name="name"');
    expect(markup).toContain('name="email"');
    expect(markup).toContain('name="topic"');
    expect(markup).toContain('name="message"');
    expect(markup).toContain('href="/de/datenschutz"');
    expect(markup).toContain(siteSettings.contact.email.href);
    expect(markup).toContain("Karl-Marx-Allee 3");
    expect(markup).toContain(siteSettings.social.instagram.url);
  });

  it("renders English form copy without leaking the German heading", () => {
    const markup = renderToStaticMarkup(
      <ContactPage
        content={en.routes.contact}
        details={en.contactPage}
        locale="en"
      />,
    );

    expect(markup).toContain(en.contactPage.form.title);
    expect(markup).toContain('href="/en/datenschutz"');
    expect(markup).not.toContain(de.contactPage.form.title);
  });

  it("creates a localized, encoded email from the submitted values", () => {
    const mailto = createContactMailto(
      siteSettings.contact.email.displayValue,
      de.contactPage.form,
      {
        name: "Max Mustermann",
        email: "max@example.com",
        topic: "Probetraining",
        message: "Ich möchte ein Probetraining buchen.",
      },
    );

    expect(mailto).toMatch(/^mailto:info@krutigermuaythai\.de\?/);
    expect(decodeURIComponent(mailto)).toContain(
      "subject=Anfrage über die Website: Probetraining",
    );
    expect(decodeURIComponent(mailto)).toContain("Name: Max Mustermann");
    expect(decodeURIComponent(mailto)).toContain("max@example.com");
  });
});
