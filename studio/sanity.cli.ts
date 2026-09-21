import { defineCliConfig } from "sanity/cli";

import { studioEnvironment } from "./environment";

export default defineCliConfig({
  api: {
    dataset: studioEnvironment.dataset,
    projectId: studioEnvironment.projectId,
  },
  deployment: {
    autoUpdates: true,
    ...(studioEnvironment.appId ? { appId: studioEnvironment.appId } : {}),
  },
  typegen: {
    generates: "../src/lib/sanity/sanity.types.ts",
    overloadClientMethods: true,
    path: "../src/lib/sanity/queries.ts",
    schema: "../sanity.schema.json",
  },
});
