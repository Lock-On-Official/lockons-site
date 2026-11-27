import type { ReactNode } from "react";

import styles from "./Chip.module.css";

/**
 * Tom da etiqueta, pelo significado (nunca o acento laranja): default é a etiqueta azul de etapa ou contato;
 * warning, negociação e alta prioridade; success, ganho; danger, vencida ou perdida.
 */
export type ChipTone = "default" | "warning" | "success" | "danger";

interface ChipProps {
  children: ReactNode;
  tone?: ChipTone;
}

/** Etiqueta de etapa do funil ou de status. Os tons de status ganham um ponto colorido à esquerda. */
export function Chip({ children, tone = "default" }: ChipProps) {
  return <span className={tone === "default" ? styles.chip : `${styles.chip} ${styles.status} ${styles[tone]}`}>{children}</span>;
}
