import { Icon, type IconName } from "@/components/ui/Icon";

import styles from "./cards.module.css";

interface ModuleCardProps {
  icon: IconName;
  label: string;
}

/** Cartão pequeno com um módulo do produto, para a cena da página Produto. */
export function ModuleCard({ icon, label }: ModuleCardProps) {
  return (
    <div className={`${styles.card} ${styles.module}`}>
      <span className={styles.storeIcon}>
        <Icon name={icon} />
      </span>
      <span className={styles.name}>{label}</span>
    </div>
  );
}
