import { createLocalizedLegalRoute } from "@/components/marketing/localized-legal-route";
import { getPrivacyPageContent } from "@/lib/sanity/content";

const route = createLocalizedLegalRoute("privacy", getPrivacyPageContent);

export const generateMetadata = route.generateMetadata;
export default route.Page;
