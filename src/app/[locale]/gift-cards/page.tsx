import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";

const route = createLocalizedPlaceholderRoute("giftCards");

export const generateMetadata = route.generateMetadata;
export default route.Page;
