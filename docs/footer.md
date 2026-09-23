# Footer and site settings

`SiteFooter` is rendered by the localized application shell, so every German and English route receives the same structure with locale-specific labels and destinations.

The footer includes:

- the approved KRUTIGER badge and localized brand statement;
- primary, secondary, and legal route groups from `src/lib/routes.ts`;
- structured address, map, email, phone, and opening-hours areas;
- the approved KRUTIGER Instagram account with an accessible icon link and visible handle;
- the current year generated during rendering.

## Contact-data status

`src/lib/site-settings.ts` is the single source of truth for contact and social values until Sanity `siteSettings` is available. The address, map destination, email address, and Instagram profile are approved public values. The phone number and opening hours remain dummy development data. Contact therefore remains under `contact.status: "placeholder"`, and the footer displays a localized warning explaining which values are not approved.

When the remaining verified client data arrives, replace the phone number and opening hours and change the status to `verified`. Do not remove the warning independently of the status. The approved address is Karl-Marx-Allee 3, 10178 Berlin, the approved email is `info@krutigermuaythai.de`, and the approved Instagram account is `@krutigermuaythai`.
