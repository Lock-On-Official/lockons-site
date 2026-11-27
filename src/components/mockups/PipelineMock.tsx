import { formatBRL } from "@/lib/format";

import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

/** Ponto colorido da etapa: neutro, âmbar (negociação) ou verde (ganho). */
const dotClass = { neutral: undefined, warning: styles.dotWarning, success: styles.dotSuccess } as const;

const columns = [
  {
    stage: "Proposta",
    tone: "neutral",
    cards: [
      { name: "Mercado São Jorge", value: 4950 },
      { name: "Escola Nova Era", value: 9800 },
    ],
  },
  { stage: "Negociação", tone: "warning", cards: [{ name: "Construtora Horizonte", value: 18400, focus: true }] },
  { stage: "Ganho", tone: "success", cards: [{ name: "Padaria Trigo Bom", value: 2300, won: true }] },
] as const;

export function PipelineMock() {
  return (
    <MockFrame
      title="Funil de vendas"
      aside="Loja Centro"
      label="Ilustração do funil de vendas com as etapas Proposta, Negociação e Ganho, o valor somado em cada etapa e uma venda perdida com o motivo registrado."
    >
      <div className={styles.board}>
        {columns.map((column) => {
          const total = column.cards.reduce((sum, card) => sum + card.value, 0);
          return (
            <div key={column.stage} className={styles.column}>
              <div className={styles.columnHead}>
                <span className={styles.stageName}>
                  <span className={[styles.stageDot, dotClass[column.tone]].filter(Boolean).join(" ")} />
                  {column.stage}
                </span>
                <span className={styles.columnTotal}>{formatBRL(total)}</span>
              </div>
              {column.cards.map((card) => (
                <div
                  key={card.name}
                  className={[styles.miniCard, "focus" in card && styles.miniFocus, "won" in card && styles.miniWon]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <b>{card.name}</b>
                  <span>{formatBRL(card.value)}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className={styles.lost}>
        <span className={styles.lostTag}>Perdida</span>
        <span>
          Auto Peças Rota · <b>Motivo: prazo de entrega</b>
        </span>
      </div>
    </MockFrame>
  );
}
