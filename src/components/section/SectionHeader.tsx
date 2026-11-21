import type { ReactNode } from "react";

import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  /** id do título: a seção aponta para ele com aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  /** Link ou botão abaixo do texto. */
  action?: ReactNode;
}

export function SectionHeader({ id, eyebrow, title, lead, align = "start", action }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? `${styles.header} ${styles.center}` : styles.header}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
