import type { ReactNode } from "react";

import { SectionDecor, type DecorKind } from "./SectionDecor";
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
  /**
   * Desenho de fundo (ver SectionDecor). Regra do site: "reticle" só na primeira seção depois do hero;
   * nas outras, varie entre network, lanes, chart e route.
   */
  decor?: DecorKind;
  decorSide?: "left" | "right";
  className?: string;
  children: ReactNode;
}

export function Section({
  labelledBy,
  id,
  tone = "plain",
  decor = "none",
  decorSide = "right",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={[styles.section, styles[tone], className].filter(Boolean).join(" ")}
    >
      {decor !== "none" && <SectionDecor kind={decor} side={decorSide} onNavy={tone === "navy"} />}
      {children}
    </section>
  );
}
