import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";

const route = createLocalizedPlaceholderRoute("imprint");

export const generateMetadata = route.generateMetadata;
export default route.Page;
