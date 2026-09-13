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
});
