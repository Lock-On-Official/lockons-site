import type { ReactNode } from "react";

import { LogoMark } from "@/components/brand/LogoMark";

import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  children: ReactNode;
  /** Prefixo dos ids do SVG da mira: único por uso na página. */
  idPrefix: string;
}

/** Selo acima do título do hero, com a mira à esquerda. */
export function Eyebrow({ children, idPrefix }: EyebrowProps) {
  return (
    <p className={styles.eyebrow}>
      <LogoMark idPrefix={idPrefix} className={styles.mark} />
      {children}
    </p>
  );
}
