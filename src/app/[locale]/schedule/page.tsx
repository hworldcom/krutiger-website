import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";

const route = createLocalizedPlaceholderRoute("schedule");

export const generateMetadata = route.generateMetadata;
export default route.Page;
