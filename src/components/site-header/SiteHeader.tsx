import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { headerMenu } from "@/content/navigation";
import { demoPath } from "@/content/routes";
import { site } from "@/lib/site";

import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Logo idPrefix="logo-header" />
        <MegaMenu items={headerMenu} />
        <div className={styles.actions}>
          {site.appUrl && (
            <a href={site.appUrl} className={styles.signIn}>
              Entrar
            </a>
          )}
          <ButtonLink href={demoPath} size="sm" className={styles.cta}>
            {/* um único item do botão (flex): sem isso o espaçamento entre itens alarga o texto */}
            <span>
              Agendar<span className={styles.ctaRest}> demonstração</span>
            </span>
          </ButtonLink>
          <MobileMenu items={headerMenu} appUrl={site.appUrl} />
        </div>
      </div>
    </header>
  );
}
