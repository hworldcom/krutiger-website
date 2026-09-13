import type { DocumentActionsResolver } from "sanity";
import type { StructureResolver } from "sanity/structure";

export const singletonTypes = new Set(["siteSettings"]);

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
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() ?? ""),
      ),
    ]);
