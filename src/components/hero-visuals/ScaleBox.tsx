"use client";

import { useEffect, useRef, type ReactNode } from "react";

import styles from "./ScaleBox.module.css";

/** Tamanho de desenho das ilustrações de hero; tudo dentro é posicionado nesta escala. */
export const VISUAL_WIDTH = 560;
export const VISUAL_HEIGHT = 500;

interface ScaleBoxProps {
  children: ReactNode;
  /** Descrição para leitor de tela; sem ela a ilustração é tratada como decorativa. */
  label?: string;
}

/**
 * Moldura que escala uma ilustração desenhada em 560 × 500 para a largura disponível,
 * mantendo posições e proporções exatas em qualquer tela.
 */
export function ScaleBox({ children, label }: ScaleBoxProps) {
  const fitRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = fitRef.current;
    const box = boxRef.current;
    if (!fit || !box) return;
    const rescale = () => {
      const width = fit.clientWidth;
      if (width) box.style.setProperty("--k", (width / VISUAL_WIDTH).toFixed(4));
    };
    rescale();
    const observer = new ResizeObserver(rescale);
    observer.observe(fit);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={fitRef}
      className={styles.fit}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <div ref={boxRef} className={styles.box} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
