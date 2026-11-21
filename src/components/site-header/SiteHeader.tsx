import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
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
          <Link href={demoPath} className={styles.cta}>
            Agendar demonstração
          </Link>
          <MobileMenu items={mainNav} appUrl={site.appUrl} />
        </div>
      </div>
    </header>
  );
}
