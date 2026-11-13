# Kids & Teens page

The `/de/kids` and `/en/kids` routes use the reviewed German DE-v5 and English EN-v3 copy, the selected cartoon illustration of Kru Tiger training with two fictional children, and the shared website header and footer.

The four fixed sections are the introduction, Why Muay Thai, age-group classes, and practical questions with next steps. Age groups are 6–8, 9–12, and 13+. Every group accepts beginners. Only the 6–8 description confirms loan gloves for the trial; the copy directs other equipment questions to the team.

The free kids trial opens the project owner's supplied bsport pass:

`https://backoffice.bsport.io/customer/payment/pass/814783/?membership=6720&force=true`

The destination is centralized in `src/lib/bsport/passes.ts`, independently of the existing general trial pass. Content editors can change button labels, while the application owns checkout, schedule, pricing, and contact destinations. The page itself loads no bsport widget or payment script.

## Content management

In Sanity, open **Training → Kids & Teens page**. This bilingual singleton covers the hero, illustration, four benefit cards, three age-group cards, FAQ, labels, and SEO. Benefit keys select fixed icons; keep each key exactly once. The page rejects incomplete translations or invalid lists and falls back to the reviewed local copy in the same language. Draft Mode exposes the reason for the fallback.

The development seed includes a `drafts.kidsPage` document. It follows the existing development-only, create-if-missing seed workflow; no production content is written by implementation or TypeGen. The existing image-rights review fields remain part of Studio publishing validation.

For first-time setup, run `npm run sanity:seed:development` to audit the missing documents and `npm run sanity:seed:development:apply` to create the draft. Deploy the updated Studio with `npm run studio:deploy`. Include `kidsPage` in the website revalidation webhook filter, as documented in [Sanity setup](./sanity-setup.md), so publishing changes refreshes the website like other pages.

The local baseline lives in `src/content/kids.ts`. The original working previews and stakeholder PDFs remain under `tmp/` and `output/`; they are not runtime dependencies.

## Illustration

`public/images/kids/kru-tiger-training.png` is the selected transparent v3 illustration, generated from the project owner's supplied reference and refined in the preview review. The children are fictional. The full composition is preserved with responsive `next/image` sizing. No original reference photograph is published on the kids page.
