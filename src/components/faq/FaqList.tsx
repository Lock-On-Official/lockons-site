import type { FaqItem } from "@/content/faq";

import styles from "./FaqList.module.css";

interface FaqListProps {
  items: readonly FaqItem[];
}

/** Perguntas em acordeão nativo (<details>): funciona sem JavaScript e o texto fica no HTML. */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.question}>
            <span>{item.question}</span>
            <span className={styles.toggle} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
