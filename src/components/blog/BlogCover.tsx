import { Icon, type IconName } from "@/components/ui/Icon";

import styles from "./BlogCover.module.css";

interface BlogCoverProps {
  icon: IconName;
  category: string;
  size?: "md" | "lg";
}

/**
 * Capa ilustrada do artigo, só com CSS (sem foto): grade fina, o ícone do assunto num cartão
 * e linhas que lembram a tela do sistema. Decorativa: o título do artigo diz o assunto.
 */
export function BlogCover({ icon, category, size = "md" }: BlogCoverProps) {
  return (
    <div className={`${styles.cover} ${styles[size]}`} aria-hidden="true">
      <span className={styles.window}>
        <span className={styles.iconBox}>
          <Icon name={icon} />
        </span>
        <span className={styles.lines}>
          <span className={styles.category}>{category}</span>
          <i />
          <i />
        </span>
      </span>
    </div>
  );
}
