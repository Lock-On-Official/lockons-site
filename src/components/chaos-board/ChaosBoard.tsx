import type { CSSProperties } from "react";

import { OpportunityCard } from "@/components/cards/OpportunityCard";
import type { BoardColumn } from "@/content/home";
import { formatBRL } from "@/lib/format";

import styles from "./ChaosBoard.module.css";

interface ChaosBoardProps {
  columns: readonly BoardColumn[];
}

/**
 * Quadro do funil que se organiza com a rolagem: os cartões começam espalhados e assentam nas colunas.
 * Só CSS (scroll-driven animations). Navegador sem suporte, ou com "reduzir movimento", mostra o quadro já organizado.
 */
export function ChaosBoard({ columns }: ChaosBoardProps) {
  const label = columns
    .map((column) => `${column.stage}: ${column.cards.map((card) => card.name).join(", ")}`)
    .join(". ");

  return (
    <div className={styles.board} role="img" aria-label={`Ilustração de um funil de vendas organizado. ${label}.`}>
      {columns.map((column) => {
        const total = column.cards.reduce((sum, card) => sum + card.value, 0);
        return (
          <div key={column.stage} className={styles.column} aria-hidden="true">
            <div className={styles.columnHead}>
              <span className={styles.stage}>{column.stage}</span>
              <span className={styles.count}>{column.cards.length}</span>
              <span className={styles.total}>{formatBRL(total)}</span>
            </div>
            <div className={styles.cards}>
              {column.cards.map((card) => (
                <div
                  key={card.name}
                  className={styles.slot}
                  style={{ "--chaos": card.chaos, "--chaos-m": card.chaosMobile } as CSSProperties}
                >
                  <OpportunityCard
                    stage={card.hot ? "Alta prioridade" : column.stage}
                    name={card.name}
                    value={card.value}
                    due={card.due}
                    hot={card.hot}
                    locked={card.locked}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
