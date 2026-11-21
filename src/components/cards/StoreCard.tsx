import { Icon } from "@/components/ui/Icon";
import { formatBRL } from "@/lib/format";

import { LockBrackets } from "./LockBrackets";
import styles from "./cards.module.css";

interface StoreCardProps {
  name: string;
  detail: string;
  value: number;
  locked?: boolean;
}

/** Cartão de loja com o valor ganho, para as cenas. Dados fictícios. */
export function StoreCard({ name, detail, value, locked = false }: StoreCardProps) {
  return (
    <div className={locked ? `${styles.card} ${styles.locked}` : styles.card}>
      <span className={styles.person}>
        <span className={styles.storeIcon}>
          <Icon name="store" />
        </span>
        <span className={styles.personText}>
          <span className={styles.name}>{name}</span>
          <span>{detail}</span>
        </span>
      </span>
      <span className={styles.value}>{formatBRL(value)}</span>
      {locked && <LockBrackets />}
    </div>
  );
}
