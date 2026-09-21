import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "../../i18n/dictionaries/de";
import { footerRoutes, siteRoutes, type RouteId } from "../../lib/routes";
import { siteSettings } from "../../lib/site-settings";
import { SiteFooter } from "./site-footer";

const routeLabels = Object.fromEntries(
  siteRoutes.map((route) => [route.id, de.routes[route.id].navigationLabel]),
) as Record<RouteId, string>;

describe("SiteFooter", () => {
  it("renders every configured footer destination in the active locale", () => {
    const markup = renderToStaticMarkup(
      <SiteFooter
        currentYear={2030}
        homeLinkLabel={de.shell.header.homeLinkLabel}
        labels={de.shell.footer}
        locale="de"
        routeLabels={routeLabels}
      />,
    );

    expect(markup).toContain("<footer");
    expect(markup).toContain('href="/de"');

    for (const route of footerRoutes) {
      expect(markup).toContain(`href="/de${route.path}"`);
    }

    expect(markup).toContain("© 2030 KRUTIGER Muay Thai Berlin");
  });

  it("shows the verified address and labels remaining sample contact content", () => {
    const markup = renderToStaticMarkup(
      <SiteFooter
        currentYear={2030}
        homeLinkLabel={de.shell.header.homeLinkLabel}
        labels={de.shell.footer}
        locale="de"
        routeLabels={routeLabels}
      />,
    );

    expect(siteSettings.contact.status).toBe("placeholder");
    expect(markup).toContain(de.shell.footer.placeholderDataLabel);
    expect(markup).toContain('href="mailto:info@krutigermuaythai.de"');
    expect(markup).toContain('href="tel:+493000000000"');
    expect(markup).toContain("Karl-Marx-Allee 3");
    expect(markup).toContain("10178 Berlin");
    expect(markup).toContain("Karl-Marx-Allee+3%2C+10178+Berlin");
    expect(markup).toContain(siteSettings.social.instagram.url);
    expect(markup).toContain("@krutigermuaythai");
    expect(markup).toContain(de.shell.footer.instagramLinkLabel);
  });

  it("renders localized opening information without mixing languages", () => {
    const markup = renderToStaticMarkup(
      <SiteFooter
        currentYear={2030}
        homeLinkLabel={de.shell.header.homeLinkLabel}
        labels={de.shell.footer}
        locale="de"
        routeLabels={routeLabels}
      />,
    );

    expect(markup).toContain("Montag–Freitag");
    expect(markup).toContain("Geschlossen");
    expect(markup).not.toContain("Monday–Friday");
    expect(markup).not.toContain(">Closed<");
  });
});
