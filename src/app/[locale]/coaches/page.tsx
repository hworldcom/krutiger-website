import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";

const route = createLocalizedPlaceholderRoute("coaches");

export const generateMetadata = route.generateMetadata;
export default route.Page;
