import { getCliClient } from "sanity/cli";

import { monthlyPasses } from "../../src/lib/bsport/passes";
import { studioEnvironment } from "../environment";

const legacyPassCardIds = [
  "monthly-pass-card-basic-monthly-pass",
  "monthly-pass-card-flex-monthly-pass",
  "monthly-pass-card-plus-monthly-pass",
  "monthly-pass-card-unlimited-monthly-pass",
] as const;

const verifiedAt = "2026-09-21T00:00:00.000Z";

function localizedName(name: string) {
  return { _type: "localizedString", de: name, en: name };
}

function buildPassCard(pass: (typeof monthlyPasses)[number], order: number) {
  return {
    _id: `monthly-pass-card-${pass.id}`,
    _type: "monthlyPassCard",
    internalKey: { _type: "slug", current: pass.id },
    name: localizedName(pass.name),
    priceCents: Math.round(pass.price * 100),
    validityMonths: pass.validityMonths,
    accessType: pass.sessions === "unlimited" ? "unlimited" : "limited",
    ...(pass.sessions === "unlimited" ? {} : { sessions: pass.sessions }),
    checkoutUrl: pass.checkoutUrl,
    verifiedAt,
    order,
    active: true,
    editorialState: "ready",
  };
}

async function main() {
  const apply = process.argv.includes("--apply");
  const client = getCliClient({ apiVersion: studioEnvironment.apiVersion });
  const dataset = client.config().dataset;

  if (dataset !== "development") {
    throw new Error(
      `The training-pass sync only targets the development dataset; received ${String(dataset)}.`,
    );
  }

  const passCards = monthlyPasses.map((pass, index) =>
    buildPassCard(pass, (index + 1) * 10),
  );
  const ids = [
    ...legacyPassCardIds,
    ...legacyPassCardIds.map((id) => `drafts.${id}`),
    ...passCards.map(({ _id }) => _id),
    ...passCards.map(({ _id }) => `drafts.${_id}`),
  ];
  const existingDocuments = await client.fetch<
    Array<Readonly<{ _id: string; active?: boolean }>>
  >(`*[_id in $ids]{_id, active}`, { ids }, { perspective: "raw" });
  const existingIds = new Set(existingDocuments.map(({ _id }) => _id));
  const legacyIdsToHide = existingDocuments
    .filter(
      ({ _id, active }) =>
        active !== false &&
        legacyPassCardIds.includes(
          _id.replace(/^drafts\./, "") as (typeof legacyPassCardIds)[number],
        ),
    )
    .map(({ _id }) => _id);
  const passCardsToCreate = passCards.filter(
    ({ _id }) => !existingIds.has(_id) && !existingIds.has(`drafts.${_id}`),
  );

  console.log(
    `${legacyIdsToHide.length} legacy pass cards will be hidden and ${passCardsToCreate.length} training-pass cards will be created in ${dataset}.`,
  );
  for (const id of legacyIdsToHide) {
    console.log(`- hide: ${id}`);
  }
  for (const { _id, name } of passCardsToCreate) {
    console.log(`- create: ${_id} (${name.de})`);
  }

  if (legacyIdsToHide.length === 0 && passCardsToCreate.length === 0) {
    console.log("Training-pass cards are already synchronized.");
    return;
  }

  if (!apply) {
    console.log("Dry run only. Re-run the apply script to make these changes.");
    return;
  }

  let transaction = client.transaction();

  for (const id of legacyIdsToHide) {
    transaction = transaction.patch(id, (patch) =>
      patch.set({ active: false }),
    );
  }
  for (const passCard of passCardsToCreate) {
    transaction = transaction.createIfNotExists(passCard);
  }

  await transaction.commit();
  console.log("Training-pass cards synchronized.");
}

await main();
