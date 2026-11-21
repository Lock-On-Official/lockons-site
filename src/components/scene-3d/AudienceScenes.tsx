/**
 * Variações da cena do hero para as páginas de cada papel: a mira travando no que importa
 * para quem vende, quem acompanha e quem decide. Dados fictícios.
 */
import { KpiCard } from "@/components/cards/KpiCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { PersonCard } from "@/components/cards/PersonCard";
import { StoreCard } from "@/components/cards/StoreCard";
import { TaskCard } from "@/components/cards/TaskCard";

import { Reticle3D } from "./Reticle3D";
import { Scene3D } from "./Scene3D";
import { SceneItem } from "./SceneItem";

export function SellerScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={0} y={36} z={-60} width={200} floatDelay={-2}>
        <PersonCard initials="JS" name="Josefa Santos" detail="Clínica Bem Viver" tag="Indicação" />
      </SceneItem>
      <SceneItem x={286} y={20} z={72} width={148} floatDelay={-1}>
        <KpiCard label="Seu valor ganho" value="R$ 22.700" bars={[34, 48, 40, 62, 80]} />
      </SceneItem>
      <SceneItem x={4} y={304} z={46} width={210} floatDelay={-4.5}>
        <TaskCard title="Enviar proposta revisada" related="Mercado São Jorge" when="Hoje, 17h" />
      </SceneItem>
      <SceneItem x={234} y={258} z={120} width={196}>
        <OpportunityCard
          stage="Alta prioridade"
          name="Construtora Horizonte"
          value={18400}
          due="Retornar hoje, 15h"
          hot
          locked
        />
      </SceneItem>
    </Scene3D>
  );
}

export function ManagerScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={0} y={36} z={-60} width={160} floatDelay={-2}>
        <KpiCard label="Atividades da equipe" value="128" bars={[52, 60, 48, 70, 76]} />
      </SceneItem>
      <SceneItem x={276} y={20} z={72} width={158} floatDelay={-1}>
        <KpiCard label="Conversão das suas lojas" value="31%" bars={[38, 52, 44, 66, 84]} />
      </SceneItem>
      <SceneItem x={4} y={304} z={46} width={200} floatDelay={-4.5}>
        <StoreCard name="Loja Centro" detail="8 pessoas" value={64200} />
      </SceneItem>
      <SceneItem x={240} y={262} z={120} width={180}>
        <KpiCard label="Perdas: prazo de entrega" value="42%" bars={[60, 48, 52, 40, 42]} locked />
      </SceneItem>
    </Scene3D>
  );
}

export function DirectorScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={0} y={36} z={-60} width={200} floatDelay={-2}>
        <StoreCard name="Loja Norte" detail="6 pessoas" value={38900} />
      </SceneItem>
      <SceneItem x={286} y={20} z={72} width={148} floatDelay={-1}>
        <KpiCard label="Conversão da rede" value="29%" bars={[36, 44, 40, 58, 72]} />
      </SceneItem>
      <SceneItem x={4} y={302} z={46} width={214} floatDelay={-4.5}>
        <PersonCard initials="JL" name="Josué Lima alterou o valor" detail="Mercado São Jorge · hoje, 9h12" tag="Histórico" />
      </SceneItem>
      <SceneItem x={240} y={262} z={120} width={180}>
        <KpiCard label="Valor ganho · todas as lojas" value="R$ 182.400" bars={[46, 58, 50, 72, 90]} locked />
      </SceneItem>
    </Scene3D>
  );
}
