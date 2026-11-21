import type { CSSProperties } from "react";

import { formatBRL } from "@/lib/format";

import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

const tiles = [
  { label: "Conversão", value: "31%" },
  { label: "Valor ganho", value: formatBRL(64200) },
  { label: "Atividades", value: "128" },
];

const funnel = [
  { stage: "Qualificação", count: 12 },
  { stage: "Proposta", count: 8 },
  { stage: "Negociação", count: 5 },
  { stage: "Ganho", count: 4 },
];

const losses = [
  { reason: "Prazo de entrega", share: 42 },
  { reason: "Preço", share: 33 },
  { reason: "Sem retorno do cliente", share: 25 },
];

export function DashboardMock() {
  const top = Math.max(...funnel.map((step) => step.count));
  return (
    <MockFrame
      title="Indicadores"
      aside="Loja Centro · mês atual"
      label="Ilustração do painel de indicadores: conversão de 31%, valor ganho e atividades do mês, funil por etapa em barras e as perdas por motivo, com prazo de entrega à frente."
    >
      <div className={styles.tiles}>
        {tiles.map((tile) => (
          <div key={tile.label} className={styles.tile}>
            <span>{tile.label}</span>
            <b>{tile.value}</b>
          </div>
        ))}
      </div>
      <div className={styles.split}>
        <div className={styles.panel}>
          <span className={styles.panelTitle}>Funil por etapa</span>
          {funnel.map((step) => (
            <div key={step.stage} className={styles.barRow}>
              <span>{step.stage}</span>
              <span className={styles.barTrack}>
                <i style={{ "--w": `${(step.count / top) * 100}%` } as CSSProperties} />
              </span>
              <b>{step.count}</b>
            </div>
          ))}
        </div>
        <div className={styles.panel}>
          <span className={styles.panelTitle}>Perdas por motivo</span>
          {losses.map((loss) => (
            <div key={loss.reason} className={styles.lossRow}>
              <span>{loss.reason}</span>
              <b>{loss.share}%</b>
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}
