import type { DocumentActionsResolver } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set([
  "siteSettings",
  "homepage",
  "aboutPage",
]);

export const studioDeskSectionIds = [
  "siteSettings",
  "corePages",
  "training",
  "pricing",
  "team",
  "faq",
] as const;

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export const resolveDocumentActions: DocumentActionsResolver = (
  previousActions,
  context,
) =>
  singletonTypes.has(context.schemaType)
    ? previousActions.filter(
        (action) => action.action && singletonActions.has(action.action),
      )
    : previousActions;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("KRUTIGER content")
    .items([
      S.listItem()
        .id("siteSettings")
        .title("Site settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings"),
        ),
      S.listItem()
        .id("corePages")
        .title("Core pages")
        .child(
          S.list()
            .id("corePages")
            .title("Core pages")
            .items([
              S.listItem()
                .id("homepage")
                .title("Homepage")
                .child(
                  S.document()
                    .schemaType("homepage")
                    .documentId("homepage")
                    .title("Homepage"),
                ),
              S.listItem()
                .id("aboutPage")
                .title("About page")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                    .title("About page"),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .id("training")
        .title("Training")
        .child(
          S.documentTypeList("classType")
            .title("Training classes")
            .defaultOrdering([
              { field: "order", direction: "asc" },
              { field: "name.de", direction: "asc" },
            ]),
        ),
      S.listItem()
        .id("pricing")
        .title("Pricing cards")
        .child(
          S.list()
            .id("pricing")
            .title("Pricing cards")
            .items([
              S.listItem()
                .id("membershipCards")
                .title("Memberships")
                .child(
                  S.documentTypeList("membershipCard")
                    .title("Membership cards")
                    .defaultOrdering([
                      { field: "durationMonths", direction: "desc" },
                      { field: "order", direction: "asc" },
                      { field: "name.de", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .id("monthlyPassCards")
                .title("Passes")
                .child(
                  S.documentTypeList("monthlyPassCard")
                    .title("Pass cards")
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "name.de", direction: "asc" },
                    ]),
                ),
            ]),
        ),
      S.listItem()
        .id("team")
        .title("Team")
        .child(
          S.documentTypeList("coach")
            .title("Team")
            .defaultOrdering([
              { field: "order", direction: "asc" },
              { field: "name", direction: "asc" },
            ]),
        ),
      S.listItem()
        .id("faq")
        .title("FAQ")
        .child(
          S.documentTypeList("faq")
            .title("FAQ")
            .defaultOrdering([
              { field: "order", direction: "asc" },
              { field: "question.de", direction: "asc" },
            ]),
        ),
    ]);
