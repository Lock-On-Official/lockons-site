import type { ReactNode } from "react";

import styles from "./mockups.module.css";

interface MockFrameProps {
  title: string;
  /** Descrição para leitor de tela: a ilustração inteira vale como uma imagem. */
  label: string;
  aside?: ReactNode;
  children: ReactNode;
}

/** Moldura de "tela do sistema" para as ilustrações. Os dados mostrados são fictícios. */
export function MockFrame({ title, label, aside, children }: MockFrameProps) {
  return (
    <div className={styles.frame} role="img" aria-label={label}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.barTitle}>{title}</span>
        {aside && <span className={styles.barAside}>{aside}</span>}
      </div>
      <div className={styles.body} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
