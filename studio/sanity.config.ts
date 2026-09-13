import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { studioEnvironment } from "./environment";
import { schemaTypes } from "./schemaTypes";
import { resolveDocumentActions, singletonTypes, structure } from "./structure";

export default defineConfig({
  name: "default",
  title: studioEnvironment.title,
  projectId: studioEnvironment.projectId,
  dataset: studioEnvironment.dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: studioEnvironment.apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: resolveDocumentActions,
    newDocumentOptions: (previousOptions, { creationContext }) =>
      creationContext.type === "global"
        ? previousOptions.filter(
            (template) => !singletonTypes.has(template.templateId),
          )
        : previousOptions,
  },
});
