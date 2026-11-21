import type { CSSProperties } from "react";

import { LockBrackets } from "@/components/cards/LockBrackets";

import { ScaleBox } from "./ScaleBox";
import styles from "./DashboardVisual.module.css";

const sellers = [
  { initials: "JL", value: 92 },
  { initials: "JS", value: 74 },
  { initials: "MT", value: 52 },
  { initials: "AR", value: 38 },
];

const funnel = [
  { stage: "Qualificação", count: 12 },
  { stage: "Proposta", count: 8 },
  { stage: "Negociação", count: 5 },
  { stage: "Ganho", count: 4 },
];

const losses = [
  { reason: "Prazo de entrega", share: 42, color: "var(--navy)" },
  { reason: "Preço", share: 33, color: "var(--royal-2)" },
  { reason: "Sem retorno", share: 25, color: "var(--sky)" },
];

/**
 * Indicadores de vendas: o painel "acorda" — a conversão conta até 31%, as barras crescem, a rosca das
 * perdas se monta e a linha de atividades se desenha. Dados fictícios.
 */
export function DashboardVisual() {
  return (
    <ScaleBox label="Ilustração do painel de indicadores: conversão do mês de 31%, valor ganho por vendedor, funil por etapa, perdas por motivo com prazo de entrega à frente e atividades por pessoa.">
      <div className={styles.scene}>
        <div className={`${styles.tile} ${styles.kpi}`}>
          <span className={styles.title}>Conversão do mês</span>
          <span className={styles.count} />
          <span>12 de 39 oportunidades fechadas</span>
          <LockBrackets />
        </div>

        <div className={`${styles.tile} ${styles.sellers}`}>
          <span className={styles.title}>Valor ganho por vendedor</span>
          <span className={styles.columns}>
            {sellers.map((seller, index) => (
              <span key={seller.initials}>
                <i style={{ "--h": `${Math.round(seller.value * 0.9)}px`, "--delay": `${0.5 + index * 0.12}s` } as CSSProperties} />
                {seller.initials}
              </span>
            ))}
          </span>
        </div>

        <div className={`${styles.tile} ${styles.funnel}`}>
          <span className={styles.title}>Funil por etapa</span>
          {funnel.map((step, index) => (
            <span key={step.stage} className={styles.row}>
              <span>{step.stage}</span>
              <i style={{ "--w": `${(step.count / 12) * 100}%`, "--delay": `${0.7 + index * 0.12}s` } as CSSProperties} />
              <b>{step.count}</b>
            </span>
          ))}
        </div>

        <div className={`${styles.tile} ${styles.losses}`}>
          <span className={styles.title}>Perdas por motivo</span>
          <span className={styles.donutRow}>
            <span
              className={styles.donut}
              style={{
                background: `conic-gradient(${losses[0].color} 0 42%, ${losses[1].color} 42% 75%, ${losses[2].color} 75% 100%)`,
              }}
            />
            <span className={styles.legend}>
              {losses.map((loss) => (
                <span key={loss.reason}>
                  <i style={{ background: loss.color }} />
                  {loss.reason}
                  <b>{loss.share}%</b>
                </span>
              ))}
            </span>
          </span>
        </div>

        <div className={`${styles.tile} ${styles.activities}`}>
          <span className={styles.title}>Atividades por pessoa</span>
          <svg viewBox="0 0 200 60" className={styles.spark} fill="none">
            <path d="M0 50 L30 42 L60 46 L90 30 L120 34 L150 18 L180 22 L200 8" pathLength={1} />
          </svg>
          <b className={styles.big}>128 no mês</b>
        </div>
      </div>
    </ScaleBox>
  );
}
