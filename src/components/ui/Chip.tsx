import type { ReactNode } from "react";

import styles from "./Chip.module.css";

interface ChipProps {
  children: ReactNode;
  /** "hot": destaque de prioridade, como o "Alta prioridade" do hero. */
  tone?: "default" | "hot";
}

/** Etiqueta de etapa do funil. */
export function Chip({ children, tone = "default" }: ChipProps) {
  return <span className={tone === "hot" ? `${styles.chip} ${styles.hot}` : styles.chip}>{children}</span>;
}
