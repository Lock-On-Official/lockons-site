import type { ReactNode } from "react";

import { LogoMark } from "@/components/brand/LogoMark";

import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  /** Prefixo dos ids do SVG da mira: único por uso na página. */
  idPrefix: string;
  /** Sobre o fundo escuro: selo translúcido, texto azul-claro. */
  onDark?: boolean;
}

/** Selo acima do título do hero, com a mira à esquerda. */
export function Eyebrow({ children, idPrefix, onDark = false }: EyebrowProps) {
  return (
    <p className={onDark ? `${styles.eyebrow} ${styles.onDark}` : styles.eyebrow}>
      <LogoMark idPrefix={idPrefix} className={styles.mark} />
      {children}
    </p>
  );
}
