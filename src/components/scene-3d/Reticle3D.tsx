import type { CSSProperties } from "react";

import styles from "./Reticle3D.module.css";

/** O mesmo STAGE_SIZE do Scene3D, repetido: o Scene3D é módulo de cliente e este, de servidor. */
const STAGE_SIZE = 440;

interface Reticle3DProps {
  /** Centro da mira no palco de 440 px. Padrão: o centro do palco. */
  cx?: number;
  cy?: number;
  /** 1 = anel de 300 px. */
  scale?: number;
  /** Profundidade do conjunto. */
  z?: number;
}

/**
 * A mira do logo em 3D: brilho, sombra no chão, anel em três camadas (dá espessura quando a cena inclina),
 * marcas nos eixos e o núcleo com as pessoas. Vai direto dentro de <Scene3D>.
 * Ao carregar, o anel gira e "trava" alinhando as aberturas às marcas.
 */
export function Reticle3D({ cx = STAGE_SIZE / 2, cy = STAGE_SIZE / 2, scale = 1, z = 0 }: Reticle3DProps) {
  const style = {
    "--dx": `${cx - STAGE_SIZE / 2}px`,
    "--dy": `${cy - STAGE_SIZE / 2}px`,
    "--z": `${z}px`,
    "--s": scale,
  } as CSSProperties;

  return (
    <div className={styles.group} style={style}>
      <div className={styles.glow} />
      <div className={styles.floor} />
      <div className={`${styles.ring} ${styles.back}`} />
      <div className={`${styles.ring} ${styles.middle}`} />
      <div className={`${styles.ring} ${styles.front}`} />
      <i className={`${styles.tick} ${styles.top}`} />
      <i className={`${styles.tick} ${styles.right}`} />
      <i className={`${styles.tick} ${styles.bottom}`} />
      <i className={`${styles.tick} ${styles.left}`} />
      <div className={styles.coreBack} />
      <div className={styles.core}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          <circle cx="50" cy="38" r="11" />
          <path d="M30 75c0-12 9-20 20-20s20 8 20 20z" />
          <circle cx="27" cy="45" r="8" />
          <path d="M13 73c0-9 6-15 14-15" />
          <circle cx="73" cy="45" r="8" />
          <path d="M87 73c0-9-6-15-14-15" />
        </svg>
      </div>
    </div>
  );
}
