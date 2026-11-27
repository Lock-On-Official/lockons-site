import { formatBRL } from "@/lib/format";

import styles from "./HeroDashboard.module.css";

type StageTone = "neutral" | "warning" | "success";

interface MiniCard {
  name: string;
  value: number;
  /** Cartão que a mira "levantou" do quadro: fica só o lugar tracejado. */
  lifted?: boolean;
  won?: boolean;
}

/** Dados fictícios, os mesmos nomes e valores do quadro "Do caos ao foco". */
const tiles = [
  { label: "Em aberto", value: formatBRL(47750) },
  { label: "Oportunidades", value: "6" },
  { label: "Vencidas", value: "1", danger: true },
];

const columns: { stage: string; tone: StageTone; cards: MiniCard[] }[] = [
  {
    stage: "Proposta",
    tone: "neutral",
    cards: [
      { name: "Mercado São Jorge", value: 4950 },
      { name: "Escola Nova Era", value: 9800 },
    ],
  },
  {
    stage: "Negociação",
    tone: "warning",
    cards: [
      { name: "Construtora Horizonte", value: 18400 },
      { name: "Clínica Bem Viver", value: 7200 },
    ],
  },
  { stage: "Ganho", tone: "success", cards: [{ name: "Padaria Trigo Bom", value: 2300, won: true }] },
];

/**
 * Janela do sistema ao fundo da cena do hero: indicadores do dia e o funil da loja.
 * Decorativa (a cena inteira é aria-hidden); desenhada em px no palco de 440 px.
 */
export function HeroDashboard() {
  return (
    <div className={styles.window}>
      <div className={styles.bar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.title}>Funil de vendas</span>
        <span className={styles.scope}>Loja Centro</span>
      </div>
      <div className={styles.body}>
        <div className={styles.tiles}>
          {tiles.map((tile) => (
            <div key={tile.label} className={tile.danger ? `${styles.tile} ${styles.tileDanger}` : styles.tile}>
              <span>{tile.label}</span>
              <b>{tile.value}</b>
            </div>
          ))}
        </div>
        <div className={styles.board}>
          {columns.map((column) => (
            <div key={column.stage} className={styles.column}>
              <div className={styles.columnHead}>
                <span className={`${styles.stageDot} ${styles[column.tone]}`} />
                {column.stage}
                <span className={styles.count}>{column.cards.length}</span>
              </div>
              {column.cards.map((card) =>
                card.lifted ? (
                  <div key={card.name} className={styles.slot} />
                ) : (
                  <div key={card.name} className={card.won ? `${styles.mini} ${styles.miniWon}` : styles.mini}>
                    <b>{card.name}</b>
                    <span>{formatBRL(card.value)}</span>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
