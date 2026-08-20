import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";

const route = createLocalizedPlaceholderRoute("faq");

export const generateMetadata = route.generateMetadata;
export default route.Page;
