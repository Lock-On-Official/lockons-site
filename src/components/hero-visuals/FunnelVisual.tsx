import type { CSSProperties } from "react";

import { LockBrackets } from "@/components/cards/LockBrackets";
import { formatBRL } from "@/lib/format";

import { ScaleBox } from "./ScaleBox";
import styles from "./FunnelVisual.module.css";

const stages = [
  { name: "Qualificação", count: 12 },
  { name: "Proposta", count: 8 },
  { name: "Negociação", count: 5 },
  { name: "Ganho", count: 4 },
];

const tokens = [
  { initials: "CH", delay: 0 },
  { initials: "PT", delay: 1.3 },
  { initials: "AP", delay: 2.6, lost: true },
  { initials: "EN", delay: 3.9 },
];

/**
 * Funil de vendas: as oportunidades caem pelas etapas; uma sai pela lateral na negociação, com o motivo
 * da perda, e as outras chegam ao "ganho", onde a mira trava no resultado. Dados fictícios.
 */
export function FunnelVisual() {
  return (
    <ScaleBox label="Ilustração de um funil de vendas com as etapas Qualificação, Proposta, Negociação e Ganho; oportunidades descem pelo funil e uma é perdida por prazo de entrega.">
      <div className={styles.scene}>
        <div className={styles.funnel}>
          {stages.map((stage, index) => (
            <div key={stage.name} className={`${styles.band} ${styles[`band${index}`]}`}>
              <span>{stage.name}</span>
              <b>{stage.count}</b>
            </div>
          ))}
        </div>

        {tokens.map((token) => (
          <span
            key={token.initials}
            className={token.lost ? `${styles.token} ${styles.lost}` : styles.token}
            style={{ "--delay": `${token.delay}s` } as CSSProperties}
          >
            {token.initials}
          </span>
        ))}

        <span className={styles.reason}>Perdida: prazo de entrega</span>

        <div className={styles.result}>
          <span>Ganhas no mês</span>
          <b>4 · {formatBRL(32300)}</b>
          <LockBrackets />
        </div>
      </div>
    </ScaleBox>
  );
}
