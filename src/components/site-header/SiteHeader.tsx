import { Logo } from "@/components/brand/Logo";
import { headerMenu } from "@/content/navigation";
import { site } from "@/lib/site";

import { HeaderCta } from "./HeaderCta";
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
          <HeaderCta />
          <MobileMenu items={headerMenu} appUrl={site.appUrl} />
        </div>
      </div>
    </header>
  );
}
