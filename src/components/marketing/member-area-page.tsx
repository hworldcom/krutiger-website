import { BsportMemberLoginWidget } from "@/components/bsport/bsport-member-login-widget";
import { Container, SectionHeader } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { Locale } from "@/i18n/config";

type MemberAreaPageProps = Readonly<{
  content: Dictionary["routes"]["memberArea"];
  integration: Dictionary["integrations"]["memberArea"];
  locale: Locale;
}>;

export function MemberAreaPage({
  content,
  integration,
  locale,
}: MemberAreaPageProps) {
  return (
    <section className="min-h-screen py-section">
      <Container>
        <SectionHeader
          description={content.description}
          eyebrow={content.eyebrow}
          level={1}
          size="page"
          title={content.title}
        />
        <BsportMemberLoginWidget copy={integration} locale={locale} />
      </Container>
    </section>
  );
}
