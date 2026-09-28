import { getCliClient } from "sanity/cli";

import { studioEnvironment } from "../environment";

const discountCents = 1_000;

type MembershipCardDocument = Readonly<{
  _id: string;
  name?: Readonly<{ de?: string; en?: string }> | null;
  audience?: string | null;
  durationMonths?: number | null;
  monthlyPriceCents?: number | null;
  discountEnabled?: boolean | null;
  discountedMonthlyPriceCents?: number | null;
}>;

function hasExistingDiscount(document: MembershipCardDocument) {
  return (
    document.discountEnabled === true ||
    (typeof document.discountedMonthlyPriceCents === "number" &&
      Number.isFinite(document.discountedMonthlyPriceCents))
  );
}

function getDocumentLabel(document: MembershipCardDocument) {
  const name = document.name?.de ?? document.name?.en ?? "Unnamed membership";
  const draftLabel = document._id.startsWith("drafts.") ? "draft" : "published";
  const details = [document.audience, document.durationMonths]
    .filter((value) => value !== null && value !== undefined)
    .join(", ");

  return `${name}${details ? ` (${details})` : ""} [${draftLabel}]`;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const client = getCliClient({ apiVersion: studioEnvironment.apiVersion });
  const dataset = client.config().dataset;

  if (dataset !== "development") {
    throw new Error(
      `The membership-discount migration only targets the development dataset; received ${String(dataset)}.`,
    );
  }

  const documents = await client.fetch<MembershipCardDocument[]>(
    `*[_type == "membershipCard"] | order(audience asc, durationMonths desc, order asc, _id asc) {
      _id,
      name,
      audience,
      durationMonths,
      monthlyPriceCents,
      discountEnabled,
      discountedMonthlyPriceCents
    }`,
    {},
    { perspective: "raw" },
  );

  const alreadyDiscounted = documents.filter(hasExistingDiscount);
  const invalidPrices = documents.filter(
    (document) =>
      !hasExistingDiscount(document) &&
      (typeof document.monthlyPriceCents !== "number" ||
        !Number.isInteger(document.monthlyPriceCents) ||
        document.monthlyPriceCents <= discountCents),
  );
  const candidates = documents.filter(
    (document) =>
      !hasExistingDiscount(document) &&
      typeof document.monthlyPriceCents === "number" &&
      Number.isInteger(document.monthlyPriceCents) &&
      document.monthlyPriceCents > discountCents,
  );

  console.log(
    `${documents.length} membership documents found in ${dataset}: ${candidates.length} to discount, ${alreadyDiscounted.length} already discounted, ${invalidPrices.length} skipped because their regular price is invalid.`,
  );

  for (const document of candidates) {
    const discountedPrice = document.monthlyPriceCents! - discountCents;
    console.log(
      `- update: ${getDocumentLabel(document)} €${(document.monthlyPriceCents! / 100).toFixed(2)} -> €${(discountedPrice / 100).toFixed(2)}`,
    );
  }

  for (const document of alreadyDiscounted) {
    console.log(`- keep existing discount: ${getDocumentLabel(document)}`);
  }

  for (const document of invalidPrices) {
    console.log(`- skip invalid price: ${getDocumentLabel(document)}`);
  }

  if (candidates.length === 0) {
    console.log("No membership discounts need to be changed.");
    return;
  }

  if (!apply) {
    console.log("Dry run only. Re-run the apply script to make these changes.");
    return;
  }

  let transaction = client.transaction();

  for (const document of candidates) {
    transaction = transaction.patch(document._id, (patch) =>
      patch.set({
        discountEnabled: true,
        discountedMonthlyPriceCents:
          document.monthlyPriceCents! - discountCents,
      }),
    );
  }

  await transaction.commit();

  const updatedDocuments = await client.fetch<MembershipCardDocument[]>(
    `*[_id in $ids] {
      _id,
      monthlyPriceCents,
      discountEnabled,
      discountedMonthlyPriceCents
    }`,
    { ids: candidates.map(({ _id }) => _id) },
    { perspective: "raw" },
  );
  const updatedById = new Map(
    updatedDocuments.map((document) => [document._id, document]),
  );
  const failedUpdates = candidates.filter((candidate) => {
    const updated = updatedById.get(candidate._id);

    return (
      updated?.discountEnabled !== true ||
      updated.discountedMonthlyPriceCents !==
        candidate.monthlyPriceCents! - discountCents
    );
  });

  if (failedUpdates.length > 0) {
    throw new Error(
      `Could not verify the discount on: ${failedUpdates.map(({ _id }) => _id).join(", ")}.`,
    );
  }

  console.log(
    `Applied and verified €10 discounts on ${candidates.length} documents.`,
  );
}

await main();
