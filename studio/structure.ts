import type { DocumentActionsResolver } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set([
  "siteSettings",
  "homepage",
  "aboutPage",
]);

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
      S.divider(),
      S.documentTypeListItem("classType").title("Training classes"),
      S.documentTypeListItem("coach").title("Team"),
      S.documentTypeListItem("faq").title("FAQ"),
    ]);
