import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";

const route = createLocalizedPlaceholderRoute("contact");

export const generateMetadata = route.generateMetadata;
export default route.Page;
