import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";
import { privacyPage } from "@/content/legal";

export const metadata = legalMetadata(privacyPage);

export default function PrivacyPage() {
  return <LegalDocument page={privacyPage} />;
}
