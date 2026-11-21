import type { CSSProperties, ReactNode } from "react";

import styles from "./Scene3D.module.css";

interface SceneItemProps {
  /** Posição no palco de 440 × 440 px. */
  x: number;
  y: number;
  /** Profundidade: positivo vem para a frente da mira, negativo vai para trás. */
  z: number;
  width?: number;
  /** Atraso da flutuação em segundos; negativo desencontra os cartões desde o início. */
  floatDelay?: number;
  float?: boolean;
  children: ReactNode;
}

export function SceneItem({ x, y, z, width, floatDelay = 0, float = true, children }: SceneItemProps) {
  const style = {
    "--x": `${x}px`,
    "--y": `${y}px`,
    "--z": `${z}px`,
    "--w": width ? `${width}px` : "auto",
    "--float-delay": `${floatDelay}s`,
  } as CSSProperties;

  return (
    <div className={styles.item} style={style}>
      <div className={float ? styles.float : undefined}>{children}</div>
    </div>
  );
}
