import Link from "next/link";

import { LogoMark } from "./LogoMark";
import styles from "./Logo.module.css";

interface LogoProps {
  idPrefix: string;
}

export function Logo({ idPrefix }: LogoProps) {
  return (
    <Link href="/" className={styles.logo} aria-label="LOCKONS, página inicial">
      <LogoMark idPrefix={idPrefix} className={styles.mark} />
      <span className={styles.wordmark} aria-hidden="true">
        LOCK<span>ONS</span>
      </span>
    </Link>
  );
}
