import styles from "./SectionDecor.module.css";

/**
 * Elementos de fundo das seções, cada um ligado a uma ideia do CRM:
 * - reticle: a mira do logo (só na primeira seção depois do hero; a faixa final tem a sua);
 * - network: rede de contatos;
 * - lanes: raias do funil convergindo, com fluxo;
 * - chart: gráfico de conversão subindo;
 * - route: trilha de follow-up com pontos de checagem.
 */
export type DecorKind = "reticle" | "network" | "lanes" | "chart" | "route" | "none";

interface SectionDecorProps {
  kind: Exclude<DecorKind, "none">;
  side: "left" | "right";
  onNavy: boolean;
}

const nodes: [number, number, boolean?][] = [
  [80, 110, true],
  [250, 60],
  [400, 175],
  [160, 320],
  [320, 455, true],
  [520, 390],
  [700, 95],
  [860, 235, true],
  [1030, 120],
  [1120, 330],
  [940, 470],
  [710, 525],
];
const edges: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [2, 3], [3, 4], [4, 5], [2, 5], [2, 6], [6, 7], [7, 8],
  [8, 9], [7, 9], [9, 10], [10, 11], [5, 11], [7, 10],
];

const lanes = [40, 170, 300, 430, 560].map(
  (y) => `M-20 ${y} C 380 ${y}, 760 ${300 + (y - 300) * 0.25}, 1220 ${300 + (y - 300) * 0.12}`,
);

const ROUTE = "M-20 470 C 160 470, 220 300, 400 320 S 620 520, 800 420 S 1000 140, 1220 160";
const checkpoints: [number, number][] = [
  [400, 320],
  [800, 420],
  [1046, 212],
];

const CHART = "M0 520 C 140 500, 220 470, 330 430 S 520 390, 620 330 S 820 300, 930 220 S 1100 150, 1200 110";
const chartPoints: [number, number][] = [
  [330, 430],
  [620, 330],
  [930, 220],
];

export function SectionDecor({ kind, side, onNavy }: SectionDecorProps) {
  const tone = onNavy ? styles.onNavy : "";

  if (kind === "reticle") {
    return (
      <div className={styles.layer} aria-hidden="true">
        <svg
          className={[styles.reticle, styles[side], tone].filter(Boolean).join(" ")}
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

  // As demais cobrem a seção inteira; o lado espelha o desenho. O gráfico nunca: espelhado, ele "cairia".
  const art = [styles.art, side === "left" && kind !== "chart" && styles.mirror, tone].filter(Boolean).join(" ");

  return (
    <div className={styles.layer} aria-hidden="true">
      <svg className={art} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
        {kind === "network" && (
          <g stroke="currentColor">
            {edges.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                className={styles.edge}
                x1={nodes[a][0]}
                y1={nodes[a][1]}
                x2={nodes[b][0]}
                y2={nodes[b][1]}
              />
            ))}
            {nodes.map(([x, y, ring], index) =>
              ring ? (
                <g key={index}>
                  <circle className={styles.pulse} cx={x} cy={y} r="16" strokeWidth="1.5" />
                  <circle className={styles.node} cx={x} cy={y} r="7" fill="currentColor" stroke="none" />
                </g>
              ) : (
                <circle key={index} className={styles.node} cx={x} cy={y} r="4.5" fill="currentColor" stroke="none" />
              ),
            )}
          </g>
        )}

        {kind === "lanes" && (
          <g stroke="currentColor" strokeLinecap="round">
            {lanes.map((d) => (
              <path key={d} className={styles.lane} d={d} strokeWidth="1.2" />
            ))}
            {lanes.map((d) => (
              <path key={`flow-${d}`} className={styles.flow} d={d} strokeWidth="2.4" pathLength={1000} />
            ))}
          </g>
        )}

        {kind === "chart" && (
          <g stroke="currentColor">
            {[120, 220, 320, 420, 520].map((y) => (
              <line key={y} className={styles.grid} x1="0" y1={y} x2="1200" y2={y} strokeDasharray="4 10" />
            ))}
            <path className={styles.area} d={`${CHART} L1200 600 L0 600 Z`} fill="currentColor" stroke="none" />
            <path className={styles.line} d={CHART} strokeWidth="2.2" />
            {chartPoints.map(([x, y]) => (
              <circle key={x} className={styles.node} cx={x} cy={y} r="5" fill="currentColor" stroke="none" />
            ))}
            <circle className={styles.pulse} cx="1200" cy="110" r="16" strokeWidth="1.5" />
          </g>
        )}

        {kind === "route" && (
          <g stroke="currentColor" strokeLinecap="round">
            <path className={styles.lane} d={ROUTE} strokeWidth="1.6" strokeDasharray="2 12" />
            <path className={styles.comet} d={ROUTE} strokeWidth="3.5" pathLength={1000} />
            {checkpoints.map(([x, y]) => (
              <g key={x} className={styles.checkpoint}>
                <circle cx={x} cy={y} r="14" strokeWidth="1.5" />
                <path d={`M${x - 5} ${y} l3.5 3.5 l6.5 -7`} strokeWidth="2" />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
