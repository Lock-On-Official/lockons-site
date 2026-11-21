import { Chip } from "@/components/ui/Chip";

import { LockBrackets } from "./LockBrackets";
import styles from "./cards.module.css";

interface PersonCardProps {
  initials: string;
  name: string;
  detail: string;
  tag?: string;
  locked?: boolean;
}

/** Cartão de contato (pessoa ou empresa), para as cenas. Dados fictícios. */
export function PersonCard({ initials, name, detail, tag, locked = false }: PersonCardProps) {
  return (
    <div className={locked ? `${styles.card} ${styles.locked}` : styles.card}>
      <span className={styles.person}>
        <span className={styles.avatar}>{initials}</span>
        <span className={styles.personText}>
          <span className={styles.name}>{name}</span>
          <span>{detail}</span>
        </span>
      </span>
      {tag && <Chip>{tag}</Chip>}
      {locked && <LockBrackets />}
    </div>
  );
}
