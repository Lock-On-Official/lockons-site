import type { CSSProperties } from "react";

import { LockBrackets } from "./LockBrackets";
import styles from "./cards.module.css";

interface KpiCardProps {
  label: string;
  value: string;
  /** Alturas das barras em % (0 a 100); a última, a do período atual, sai em azul-royal. */
  bars: readonly number[];
  locked?: boolean;
}

/** Cartão de indicador, como o "Conversão do mês" do hero. */
export function KpiCard({ label, value, bars, locked = false }: KpiCardProps) {
  return (
    <div className={locked ? `${styles.card} ${styles.locked}` : styles.card}>
      <span>{label}</span>
      <span className={styles.kpiValue}>{value}</span>
      <span className={styles.bars} aria-hidden="true">
        {bars.map((height, index) => (
          <i key={index} style={{ "--h": `${Math.max(0, Math.min(100, height))}%` } as CSSProperties} />
        ))}
      </span>
      {locked && <LockBrackets />}
    </div>
  );
}
