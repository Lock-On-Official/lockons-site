import styles from "./SectionDecor.module.css";

interface SectionDecorProps {
  tone: "plain" | "tint" | "navy";
  side: "left" | "right";
}

/**
 * Elementos de fundo tirados da mira do logo, para a identidade das seções.
 * Faixas (azul-claro e azul-marinho): uma mira grande, bem clara, saindo pela lateral.
 * Fundo pontilhado: marcas de alvo e cantos de enquadramento, como numa tela de mira.
 */
export function SectionDecor({ tone, side }: SectionDecorProps) {
  if (tone === "plain") {
    return (
      <div className={styles.layer} aria-hidden="true">
        <span className={`${styles.plus} ${styles.p1}`} />
        <span className={`${styles.plus} ${styles.p2}`} />
        <span className={`${styles.plus} ${styles.p3}`} />
        <span className={`${styles.plus} ${styles.p4}`} />
        <span className={`${styles.corner} ${side === "left" ? styles.cornerTopLeft : styles.cornerTopRight}`} />
        <span className={`${styles.corner} ${side === "left" ? styles.cornerBottomRight : styles.cornerBottomLeft}`} />
      </div>
    );
  }

  return (
    <div className={styles.layer} aria-hidden="true">
      <svg
        className={[styles.reticle, styles[side], tone === "navy" && styles.onNavy].filter(Boolean).join(" ")}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        focusable="false"
      >
        <g className={styles.spin}>
          <circle cx="100" cy="100" r="97" strokeWidth="0.8" />
          {/* graduação: 60 marcas finas, como numa luneta */}
          <circle cx="100" cy="100" r="89" strokeWidth="4" strokeDasharray="1.2 8.12" />
          {/* o anel do logo: quatro arcos com aberturas nos eixos */}
          <circle cx="100" cy="100" r="76" strokeWidth="12" strokeDasharray="107.4 12" strokeDashoffset="113.4" />
          <g strokeWidth="6" strokeLinecap="round">
            <line x1="100" y1="6" x2="100" y2="34" />
            <line x1="166" y1="100" x2="194" y2="100" />
            <line x1="100" y1="166" x2="100" y2="194" />
            <line x1="6" y1="100" x2="34" y2="100" />
          </g>
        </g>
        <circle cx="100" cy="100" r="46" strokeWidth="0.8" strokeDasharray="3 5" />
        <path d="M91 100h18M100 91v18" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
