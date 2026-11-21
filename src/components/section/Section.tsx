import type { ReactNode } from "react";

import styles from "./Section.module.css";

/**
 * Fundo da seção. As páginas alternam "plain" (fundo pontilhado) e "tint" (azul-claro),
 * com "navy" para o momento de destaque; é o ritmo claro/escuro das referências.
 */
export type SectionTone = "plain" | "tint" | "navy";

interface SectionProps {
  /** id do título da seção (aria-labelledby). */
  labelledBy: string;
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

export function Section({ labelledBy, id, tone = "plain", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[styles.section, styles[tone], className].filter(Boolean).join(" ")}
    >
      {children}
    </section>
  );
}
