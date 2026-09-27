import { createLocalizedLegalRoute } from "@/components/marketing/localized-legal-route";
import { getImprintPageContent } from "@/lib/sanity/content";

const route = createLocalizedLegalRoute("imprint", getImprintPageContent);

export const generateMetadata = route.generateMetadata;
export default route.Page;
