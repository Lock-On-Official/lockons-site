import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";

import styles from "./InfoCards.module.css";

export interface InfoCardItem {
  icon: IconName;
  title: string;
  text: string;
  link?: { label: string; href: string };
}

interface InfoCardsProps {
  items: readonly InfoCardItem[];
  /** Colunas no desktop; escolha um número que as linhas preencham. */
  columns?: 2 | 3 | 4;
}

/** Grade de cartões com ícone, título e texto (e link no pé, quando houver). */
export function InfoCards({ items, columns = 2 }: InfoCardsProps) {
  return (
    <ul className={`${styles.grid} ${styles[`cols${columns}`]}`}>
      {items.map((item) => (
        // só o cartão com link é clicável: só ele sobe e ganha a pré-mira no hover e no foco
        <li key={item.title} className={item.link ? `${styles.card} lock-frame` : styles.card}>
          <span className={styles.iconWrap}>
            <Icon name={item.icon} />
          </span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {item.link && (
            <ButtonLink href={item.link.href} variant="text" className={styles.link}>
              {item.link.label}
            </ButtonLink>
          )}
        </li>
      ))}
    </ul>
  );
}
