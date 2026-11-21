import { KpiCard } from "@/components/cards/KpiCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";

import { Reticle3D } from "./Reticle3D";
import { Scene3D } from "./Scene3D";
import { SceneItem } from "./SceneItem";

/**
 * Cena do hero aprovada no protótipo: a mira trava na oportunidade de alta prioridade.
 * Empresas e valores são fictícios, só para ilustrar.
 */
export function HeroScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={4} y={40} z={-70} width={196} floatDelay={-2}>
        <OpportunityCard stage="Negociação" name="Clínica Bem Viver" value={7200} />
      </SceneItem>
      <SceneItem x={286} y={20} z={72} width={148} floatDelay={-1}>
        <KpiCard label="Conversão do mês" value="31%" bars={[38, 52, 44, 66, 84]} />
      </SceneItem>
      <SceneItem x={8} y={302} z={46} width={196} floatDelay={-4.5}>
        <OpportunityCard stage="Proposta enviada" name="Mercado São Jorge" value={4950} />
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
