import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { studioEnvironment } from "./environment";
import {
  contactStatusBadge,
  editorialStateBadge,
} from "./schemaTypes/editorialWorkflow";
import { schemaTypes } from "./schemaTypes";
import { presentationResolve } from "./presentation/resolve";
import { resolveDocumentActions, singletonTypes, structure } from "./structure";

export default defineConfig({
  name: "default",
  title: studioEnvironment.title,
  projectId: studioEnvironment.projectId,
  dataset: studioEnvironment.dataset,
  plugins: [
    presentationTool({
      title: "Preview",
      previewUrl: {
        initial: `${studioEnvironment.previewOrigin}/de`,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      allowOrigins: [studioEnvironment.previewOrigin],
      resolve: presentationResolve,
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: studioEnvironment.apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    badges: (previousBadges) => [
      ...previousBadges,
      editorialStateBadge,
      contactStatusBadge,
    ],
    actions: resolveDocumentActions,
    newDocumentOptions: (previousOptions, { creationContext }) =>
      creationContext.type === "global"
        ? previousOptions.filter(
            (template) => !singletonTypes.has(template.templateId),
          )
        : previousOptions,
  },
});
