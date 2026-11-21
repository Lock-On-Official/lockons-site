import type { CSSProperties } from "react";

import { LogoMark } from "@/components/brand/LogoMark";
import { LockBrackets } from "@/components/cards/LockBrackets";
import { Icon } from "@/components/ui/Icon";
import { formatBRL } from "@/lib/format";

import { ScaleBox } from "./ScaleBox";
import styles from "./StoresMapVisual.module.css";

const HUB = { x: 280, y: 262 };

const stores = [
  { name: "Loja Centro", team: "8 pessoas", value: 64200, x: 118, y: 104, route: "M118 104 C 150 200, 210 230, 280 262" },
  { name: "Loja Norte", team: "6 pessoas", value: 38900, x: 446, y: 96, route: "M446 96 C 430 180, 360 220, 280 262" },
  { name: "Loja Sul", team: "4 pessoas", value: 24300, x: 452, y: 410, route: "M452 410 C 420 330, 350 300, 280 262" },
];

/**
 * Múltiplas lojas: cada loja num ponto do mapa, ligada ao centro; os dados de cada uma viajam pelas
 * rotas até a visão consolidada, onde a mira trava. Uma vaga tracejada sugere a próxima loja. Dados fictícios.
 */
export function StoresMapVisual() {
  return (
    <ScaleBox label="Ilustração de um mapa com as lojas Centro, Norte e Sul ligadas a uma visão central de todas as lojas, com o valor ganho de cada uma e o total da rede.">
      <div className={styles.scene}>
        <div className={styles.map} />

        <svg className={styles.routes} viewBox="0 0 560 500" fill="none">
          {stores.map((store, index) => (
            <g key={store.name}>
              <path className={styles.road} d={store.route} />
              <path
                className={styles.data}
                d={store.route}
                pathLength={1000}
                style={{ "--delay": `${index * 0.9}s` } as CSSProperties}
              />
            </g>
          ))}
          <path className={styles.road} d="M110 400 C 160 360, 220 300, 280 262" strokeDasharray="4 8" />
        </svg>

        {stores.map((store, index) => (
          <div
            key={store.name}
            className={styles.store}
            style={{ left: store.x, top: store.y, "--delay": `${0.2 + index * 0.15}s` } as CSSProperties}
          >
            <span className={styles.pin}>
              <Icon name="store" />
            </span>
            <span className={styles.storeText}>
              <b>{store.name}</b>
              <span>{store.team}</span>
              <em>{formatBRL(store.value)}</em>
            </span>
          </div>
        ))}

        <div className={styles.next} style={{ left: 110, top: 400 }}>
          <span>+</span>
          Nova loja
        </div>

        <div className={styles.hub} style={{ left: HUB.x, top: HUB.y }}>
          <span className={styles.hubMark}>
            <LogoMark idPrefix="stores-hub" />
          </span>
          <span className={styles.hubText}>
            <span>Todas as lojas</span>
            <b>{formatBRL(127400)}</b>
          </span>
          <LockBrackets />
        </div>
      </div>
    </ScaleBox>
  );
}
