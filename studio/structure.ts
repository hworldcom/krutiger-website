import type { DocumentActionsResolver } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set([
  "siteSettings",
  "homepage",
  "aboutPage",
  "trainingPage",
  "teamPage",
  "pricingPage",
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
          S.list()
            .id("training")
            .title("Training")
            .items([
              S.listItem()
                .id("trainingPage")
                .title("Training page")
                .child(
                  S.document()
                    .schemaType("trainingPage")
                    .documentId("trainingPage")
                    .title("Training page"),
                ),
              S.listItem()
                .id("trainingClasses")
                .title("Training classes")
                .child(
                  S.documentTypeList("classType")
                    .title("Training classes")
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "name.de", direction: "asc" },
                    ]),
                ),
            ]),
        ),
      S.listItem()
        .id("pricing")
        .title("Pricing")
        .child(
          S.list()
            .id("pricing")
            .title("Pricing")
            .items([
              S.listItem()
                .id("pricingPage")
                .title("Pricing page")
                .child(
                  S.document()
                    .schemaType("pricingPage")
                    .documentId("pricingPage")
                    .title("Pricing page"),
                ),
              S.listItem()
                .id("membershipCards")
                .title("Memberships")
                .child(
                  S.documentTypeList("membershipCard")
                    .title("Membership cards")
                    .defaultOrdering([
                      { field: "audience", direction: "asc" },
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
          S.list()
            .id("team")
            .title("Team")
            .items([
              S.listItem()
                .id("teamPage")
                .title("Team page")
                .child(
                  S.document()
                    .schemaType("teamPage")
                    .documentId("teamPage")
                    .title("Team page"),
                ),
              S.listItem()
                .id("teamMembers")
                .title("Team members")
                .child(
                  S.documentTypeList("coach")
                    .title("Team members")
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "name", direction: "asc" },
                    ]),
                ),
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
