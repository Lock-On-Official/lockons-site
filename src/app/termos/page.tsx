import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";
import { termsPage } from "@/content/legal";

export const metadata = legalMetadata(termsPage);

export default function TermsPage() {
  return <LegalDocument page={termsPage} />;
}
