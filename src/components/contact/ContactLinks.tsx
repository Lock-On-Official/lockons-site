import { Icon } from "@/components/ui/Icon";
import { WHATSAPP_MESSAGE, formatWhatsapp, whatsappLink } from "@/lib/contact";
import { site } from "@/lib/site";

import styles from "./ContactLinks.module.css";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

interface ContactLinksProps {
  /** Frase antes dos links, ex.: "Prefere conversar agora?". */
  lead?: string;
  /** Sobre o azul-marinho: texto e ícones claros. */
  onDark?: boolean;
  className?: string;
}

/**
 * WhatsApp e e-mail da equipe, quando configurados (LOCKON_WHATSAPP e LOCKON_CONTACT_EMAIL).
 * Sem nenhum dos dois, não renderiza nada. Componente de servidor: lê as variáveis do build.
 */
export function ContactLinks({ lead, onDark = false, className }: ContactLinksProps) {
  const { whatsapp, email } = site.contact;
  if (!whatsapp && !email) return null;

  return (
    <div className={[styles.contact, onDark && styles.onDark, className].filter(Boolean).join(" ")}>
      {lead && <p className={styles.lead}>{lead}</p>}
      <ul className={styles.list}>
        {whatsapp && (
          <li>
            <a href={whatsappLink(whatsapp, WHATSAPP_MESSAGE)} className={styles.link} rel="noopener noreferrer" target="_blank">
              <WhatsAppGlyph className={styles.icon} />
              WhatsApp {formatWhatsapp(whatsapp)}
              <span className="visually-hidden"> (abre em outra aba)</span>
            </a>
          </li>
        )}
        {email && (
          <li>
            <a href={`mailto:${email}`} className={styles.link}>
              <Icon name="mail" className={styles.icon} />
              {email}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
