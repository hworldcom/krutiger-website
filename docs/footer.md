# Footer and site settings

`SiteFooter` is rendered by the localized application shell, so every German and English route receives the same structure with locale-specific labels and destinations.

The footer includes:

- the approved KRUTIGER badge and localized brand statement;
- primary, secondary, and legal route groups from `src/lib/routes.ts`;
- structured address, map, email, phone, and opening-hours areas;
- the approved KRUTIGER Instagram account with an accessible icon link and visible handle;
- the current year generated during rendering.

## Contact-data status

Sanity `siteSettings` is the editorial source for contact, social, footer, and opening-hours values. `src/lib/site-settings.ts` remains the resilient fallback when Sanity is unavailable or incomplete. The fallback contains the approved address, map destination, email address, and Instagram profile, but deliberately omits a telephone number. Its opening hours remain dummy development data, so fallback contact remains under `contact.status: "placeholder"` and the footer displays a localized warning.

When verified opening information is entered in Sanity, change the contact status to `verified`. A telephone number is optional; leaving it empty removes the telephone block from the website. Do not remove the warning independently of the status. The approved address is Karl-Marx-Allee 3, 10178 Berlin, the approved email is `info@krutigermuaythai.de`, and the approved Instagram account is `@krutigermuaythai`.
