import type { ReactNode } from "react";

import styles from "./SplitGrid.module.css";

interface SplitGridProps {
  /** Coluna da esquerda, em geral o SectionHeader. */
  aside: ReactNode;
  children: ReactNode;
  /** "wide": conteúdo mais largo, como a lista de perguntas. */
  variant?: "default" | "wide";
}

/** Duas colunas: título da seção à esquerda, conteúdo à direita. Empilha no celular. */
export function SplitGrid({ aside, children, variant = "default" }: SplitGridProps) {
  return (
    <div className={`container ${styles.grid} ${variant === "wide" ? styles.wide : ""}`}>
      <div className={styles.cell}>{aside}</div>
      <div className={styles.cell}>{children}</div>
    </div>
  );
}
