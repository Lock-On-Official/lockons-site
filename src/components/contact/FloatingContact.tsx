import { WHATSAPP_MESSAGE, whatsappLink } from "@/lib/contact";
import { site } from "@/lib/site";

import styles from "./FloatingContact.module.css";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

/**
 * Botão fixo do WhatsApp no canto inferior direito, em todas as páginas. No hover e no foco, a mira da marca
 * entra girada e maior e "crava" em volta dele. Enquanto LOCKON_WHATSAPP não estiver configurado, o botão
 * aparece como prévia: mostra "WhatsApp em breve" e não leva a lugar nenhum (decisão do time).
 * Componente de servidor: o número sai das variáveis do build.
 */
export function FloatingContact() {
  const { whatsapp } = site.contact;
  const label = whatsapp ? "Falar no WhatsApp" : "WhatsApp em breve";

  const content = (
    <>
      <span className={styles.tooltip} aria-hidden="true">
        {label}
      </span>
      <svg className={styles.reticle} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
        {/* o anel do logo: quatro arcos com aberturas nos eixos, e as marcas */}
        <circle cx="32" cy="32" r="27" strokeWidth="3" strokeDasharray="36.4 6" strokeDashoffset="39.4" />
        <g strokeWidth="3" strokeLinecap="round">
          <line x1="32" y1="1.5" x2="32" y2="8.5" />
          <line x1="55.5" y1="32" x2="62.5" y2="32" />
          <line x1="32" y1="55.5" x2="32" y2="62.5" />
          <line x1="1.5" y1="32" x2="8.5" y2="32" />
        </g>
      </svg>
      <WhatsAppGlyph className={styles.icon} />
    </>
  );

  if (!whatsapp) {
    return (
      <button type="button" className={`${styles.button} ${styles.preview}`} aria-disabled="true" aria-label={label}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={whatsappLink(whatsapp, WHATSAPP_MESSAGE)}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (abre em outra aba)`}
    >
      {content}
    </a>
  );
}
