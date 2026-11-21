import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { KpiCard } from "@/components/cards/KpiCard";
import { LockBrackets } from "@/components/cards/LockBrackets";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { StoreCard } from "@/components/cards/StoreCard";
import { TaskCard } from "@/components/cards/TaskCard";
import { photos } from "@/content/photos";
import { formatBRL } from "@/lib/format";

import { ScaleBox } from "./ScaleBox";
import { Toast } from "./Toast";
import styles from "./RolePhotoVisual.module.css";

type Role = "seller" | "manager" | "director";

/** Cartão posicionado na caixa de 560 × 500, que entra depois da foto. */
function Float({ left, top, width, delay, children }: { left: number; top: number; width: number; delay: number; children: ReactNode }) {
  return (
    <div className={styles.float} style={{ left, top, width, "--delay": `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

const ranking = [
  { name: "Josué Lima", value: 22700 },
  { name: "Josefa Santos", value: 18100 },
  { name: "Márcio Teixeira", value: 12900 },
];

function Ranking() {
  const top = ranking[0].value;
  return (
    <div className={styles.ranking}>
      <span className={styles.rankingTitle}>Valor ganho por vendedor</span>
      {ranking.map((seller, index) => (
        <span key={seller.name} className={styles.rankRow}>
          <span>{seller.name}</span>
          <i style={{ "--w": `${(seller.value / top) * 100}%`, "--delay": `${1.4 + index * 0.15}s` } as CSSProperties} />
          <b>{formatBRL(seller.value)}</b>
        </span>
      ))}
    </div>
  );
}

const overlays: Record<Role, ReactNode> = {
  seller: (
    <>
      <Float left={0} top={312} width={232} delay={0.9}>
        <TaskCard title="Ligar para retorno" related="Construtora Horizonte" when="Hoje, 15h" />
      </Float>
      <Float left={326} top={338} width={226} delay={1.1}>
        <OpportunityCard stage="Alta prioridade" name="Construtora Horizonte" value={18400} due="Proposta enviada ontem" hot />
      </Float>
      <Toast icon="bell" tone="alert" title="Atividade vencida" text="Visita técnica · Clínica Bem Viver" left={298} top={6} width={252} />
    </>
  ),
  manager: (
    <>
      <Float left={0} top={60} width={176} delay={0.9}>
        <KpiCard label="Conversão das suas lojas" value="31%" bars={[38, 52, 44, 66, 84]} />
      </Float>
      <Float left={300} top={306} width={252} delay={1.1}>
        <Ranking />
      </Float>
      <Toast icon="trendDown" title="Perdas no mês" text="Principal motivo: prazo de entrega" left={300} top={8} width={250} />
    </>
  ),
  director: (
    <>
      <Float left={352} top={40} width={200} delay={0.9}>
        <div className={styles.stack}>
          <StoreCard name="Loja Centro" detail="8 pessoas" value={64200} />
          <StoreCard name="Loja Norte" detail="6 pessoas" value={38900} />
          <StoreCard name="Loja Sul" detail="4 pessoas" value={24300} />
        </div>
      </Float>
      <Float left={0} top={300} width={196} delay={1.1}>
        <KpiCard label="Todas as lojas no mês" value={formatBRL(127400)} bars={[44, 56, 50, 68, 86]} />
      </Float>
      <Toast icon="history" title="Histórico" text="Josué Lima alterou o valor · 9h12" left={210} top={440} width={260} />
    </>
  ),
};

const labels: Record<Role, string> = {
  seller: "Foto de um vendedor atendendo no balcão, com a atividade de retorno do dia, uma oportunidade de alta prioridade e o aviso de uma visita vencida.",
  manager: "Foto de uma reunião de vendas, com a conversão das lojas do gestor, o valor ganho por vendedor e o principal motivo de perda do mês.",
  director: "Foto de uma diretora comercial, com o valor ganho de cada loja, o total de todas as lojas e uma alteração registrada no histórico.",
};

const photoByRole = { seller: photos.seller, manager: photos.manager, director: photos.director } as const;

/**
 * Hero das páginas de papel: a foto entra revelada da esquerda para a direita, com os cantos da mira,
 * e os cartões do dia a dia daquele papel chegam por cima. Dados dos cartões fictícios.
 */
export function RolePhotoVisual({ role }: { role: Role }) {
  const photo = photoByRole[role];
  return (
    <ScaleBox label={labels[role]}>
      <div className={styles.scene}>
        <div className={styles.frame}>
          <div className={styles.photo}>
            <Image src={photo.src} alt="" fill sizes="(max-width: 900px) 80vw, 480px" placeholder="blur" preload className={styles.img} style={{ objectPosition: photo.position }} />
          </div>
          <span className={styles.corners}>
            <LockBrackets />
          </span>
        </div>
        {overlays[role]}
      </div>
    </ScaleBox>
  );
}
