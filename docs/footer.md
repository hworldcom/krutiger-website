# Footer and site settings

`SiteFooter` is rendered by the localized application shell, so every German and English route receives the same structure with locale-specific labels and destinations.

The footer includes:

- the approved KRUTIGER badge and localized brand statement;
- primary, secondary, and legal route groups from `src/lib/routes.ts`;
- structured address, map, email, phone, and opening-hours areas;
- the approved KRUTIGER Instagram account with an accessible icon link and visible handle;
- the current year generated during rendering.

## Contact-data status

`src/lib/site-settings.ts` is the single source of truth for contact and social values until Sanity `siteSettings` is available. The current address, map query, email, phone, and opening hours are dummy development data. They are stored under `contact.status: "placeholder"`, and the footer displays a localized warning explaining that the values are not approved for visits or enquiries.

When verified client data arrives, replace every contact value together and change the status to `verified`. Do not change the footer component, copy values from the legacy site, or remove the warning independently of the status. The Instagram account is already the approved real destination.
