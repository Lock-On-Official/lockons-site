import type { CSSProperties, ReactNode } from "react";

import { LockBrackets } from "@/components/cards/LockBrackets";
import { Icon, type IconName } from "@/components/ui/Icon";
import { formatBRL } from "@/lib/format";

import { ScaleBox } from "./ScaleBox";
import styles from "./ModulesVisual.module.css";

function Tile({
  icon,
  title,
  className,
  from,
  delay,
  children,
}: {
  icon: IconName;
  title: string;
  className: string;
  /** De onde o módulo chega antes de se encaixar. */
  from: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.tile} ${className}`} style={{ "--from": from, "--delay": `${delay}s` } as CSSProperties}>
      <span className={styles.head}>
        <span className={styles.chip}>
          <Icon name={icon} />
        </span>
        {title}
      </span>
      {children}
    </div>
  );
}

const funnel = [
  { stage: "Qualificação", count: 12 },
  { stage: "Proposta", count: 8 },
  { stage: "Negociação", count: 5 },
  { stage: "Ganho", count: 4 },
];

/** Página Produto: os cinco módulos chegam de lados diferentes e se encaixam num painel só. Dados fictícios. */
export function ModulesVisual() {
  return (
    <ScaleBox label="Ilustração: os módulos Contatos, Funil, Atividades, Indicadores e Lojas se encaixando num painel só.">
      <div className={styles.scene}>
        <Tile icon="building" title="Contatos" className={styles.a} from="-60px -40px" delay={0.1}>
          <span className={styles.avatars}>
            {["JA", "JS", "JL", "MA"].map((initials) => (
              <i key={initials}>{initials}</i>
            ))}
          </span>
          <span className={styles.search}>
            <Icon name="search" />
            jose
          </span>
        </Tile>

        <Tile icon="funnel" title="Funil" className={styles.b} from="70px -50px" delay={0.25}>
          {funnel.map((step) => (
            <span key={step.stage} className={styles.bar}>
              <span>{step.stage}</span>
              <i style={{ "--w": `${(step.count / 12) * 100}%` } as CSSProperties} />
              <b>{step.count}</b>
            </span>
          ))}
        </Tile>

        <Tile icon="calendar" title="Atividades" className={styles.c} from="-80px 30px" delay={0.4}>
          <span className={`${styles.task} ${styles.done}`}>Ligar para retorno</span>
          <span className={`${styles.task} ${styles.done}`}>Enviar proposta</span>
          <span className={`${styles.task} ${styles.late}`}>
            Visita técnica <em>venceu</em>
          </span>
        </Tile>

        <Tile icon="percent" title="Indicadores" className={styles.d} from="80px 40px" delay={0.55}>
          <span className={styles.kpi}>31%</span>
          <span className={styles.kpiLabel}>conversão do mês</span>
          <LockBrackets />
        </Tile>

        <Tile icon="store" title="Lojas" className={styles.e} from="0 70px" delay={0.7}>
          <span className={styles.stores}>
            {[
              ["Centro", 64200],
              ["Norte", 38900],
              ["Sul", 24300],
            ].map(([name, value]) => (
              <span key={name}>
                {name}
                <b>{formatBRL(value as number)}</b>
              </span>
            ))}
            <span className={styles.total}>
              Todas
              <b>{formatBRL(127400)}</b>
            </span>
          </span>
        </Tile>

        <span className={styles.scan} />
      </div>
    </ScaleBox>
  );
}
