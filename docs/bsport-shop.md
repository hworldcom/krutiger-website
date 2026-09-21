# bsport shop integration

The localized `/de/shop` and `/en/shop` routes load the shop and gift-card
widgets supplied by bsport. Product data, gift-card values, availability,
prices, and checkout remain owned by bsport.

## Current production configuration

- Script: `https://cdn.bsport.io/scripts/widget.js`
- Company ID: `6720`
- Widget type: `shop`
- Parent element: `bsport-widget-140155`
- Dialog mode: `1`
- Floating action button: disabled
- Full-screen popup: disabled

The gift-card section shares the production script and uses:

- Widget type: `giftcard`
- Parent element: `bsport-widget-29534`
- Dialog mode: `1`
- Gift-card filter: all available gift cards

The public company IDs can be overridden at build time with
`NEXT_PUBLIC_BSPORT_SHOP_COMPANY_ID` and
`NEXT_PUBLIC_BSPORT_GIFT_CARD_COMPANY_ID`. The external script loads only once
when a visitor opens a shop route. Each widget has an independent localized
loading and failure state supplied by the website.

With the local app running, verify all bsport integrations in Chrome with:

```bash
npm run qa:bsport
```

## Before launch

- Confirm which products should be visible and purchasable.
- Verify prices, taxes, stock behavior, delivery or collection options, and the
  complete checkout flow.
- Confirm how the widget selects German and English.
- Review cookies, storage, payment destinations, and privacy disclosure.
- Test mobile, tablet, desktop, keyboard, zoom, and screen-reader behavior.
