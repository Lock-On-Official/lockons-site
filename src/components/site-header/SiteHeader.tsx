import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { demoPath, mainNav } from "@/content/routes";
import { site } from "@/lib/site";

import { MobileMenu } from "./MobileMenu";
import { PrimaryNav } from "./PrimaryNav";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Logo idPrefix="logo-header" />
        <PrimaryNav items={mainNav} />
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
          <MobileMenu items={mainNav} appUrl={site.appUrl} />
        </div>
      </div>
    </header>
  );
}
