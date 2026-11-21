/**
 * Variações da cena do hero para a página Produto e para cada funcionalidade:
 * a mesma mira, com os cartões do assunto da página em volta. Dados fictícios.
 */
import { KpiCard } from "@/components/cards/KpiCard";
import { ModuleCard } from "@/components/cards/ModuleCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { PersonCard } from "@/components/cards/PersonCard";
import { StoreCard } from "@/components/cards/StoreCard";
import { TaskCard } from "@/components/cards/TaskCard";

import { Reticle3D } from "./Reticle3D";
import { Scene3D } from "./Scene3D";
import { SceneItem } from "./SceneItem";

export function ProductScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={150} y={4} z={-50} width={140} floatDelay={-3}>
        <ModuleCard icon="store" label="Lojas" />
      </SceneItem>
      <SceneItem x={0} y={92} z={60} width={140} floatDelay={-1.5}>
        <ModuleCard icon="building" label="Contatos" />
      </SceneItem>
      <SceneItem x={300} y={78} z={90} width={140} floatDelay={-5}>
        <ModuleCard icon="funnel" label="Funil" />
      </SceneItem>
      <SceneItem x={8} y={322} z={40} width={140} floatDelay={-2.5}>
        <ModuleCard icon="calendar" label="Atividades" />
      </SceneItem>
      <SceneItem x={290} y={312} z={120} width={148}>
        <ModuleCard icon="percent" label="Indicadores" />
      </SceneItem>
    </Scene3D>
  );
}

export function ContactsScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={0} y={36} z={-60} width={200} floatDelay={-2}>
        <PersonCard initials="JS" name="Josefa Santos" detail="Clínica Bem Viver" tag="Indicação" />
      </SceneItem>
      <SceneItem x={250} y={22} z={70} width={190} floatDelay={-1}>
        <PersonCard initials="JL" name="Josué Lima" detail="Mercado São Jorge" tag="Lead" />
      </SceneItem>
      <SceneItem x={6} y={306} z={46} width={196} floatDelay={-4.5}>
        <PersonCard initials="CH" name="Construtora Horizonte" detail="Empresa · 3 contatos" />
      </SceneItem>
      <SceneItem x={226} y={262} z={120} width={206}>
        <PersonCard initials="JA" name="José Antônio Prado" detail="Construtora Horizonte" tag="Cliente" locked />
      </SceneItem>
    </Scene3D>
  );
}

export function PipelineScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={4} y={40} z={-70} width={196} floatDelay={-2}>
        <OpportunityCard stage="Qualificação" name="Padaria Trigo Bom" value={2300} />
      </SceneItem>
      <SceneItem x={286} y={20} z={72} width={148} floatDelay={-1}>
        <KpiCard label="Valor no funil" value="R$ 47.750" bars={[30, 46, 58, 72, 88]} />
      </SceneItem>
      <SceneItem x={8} y={302} z={46} width={196} floatDelay={-4.5}>
        <OpportunityCard stage="Proposta" name="Escola Nova Era" value={9800} />
      </SceneItem>
      <SceneItem x={234} y={258} z={120} width={196}>
        <OpportunityCard stage="Negociação" name="Construtora Horizonte" value={18400} due="Retornar hoje, 15h" locked />
      </SceneItem>
    </Scene3D>
  );
}

export function ActivitiesScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={0} y={36} z={-60} width={210} floatDelay={-2}>
        <TaskCard title="Enviar proposta revisada" related="Mercado São Jorge" when="Hoje, 17h" />
      </SceneItem>
      <SceneItem x={286} y={20} z={72} width={148} floatDelay={-1}>
        <KpiCard label="Atividades da semana" value="24" bars={[40, 62, 54, 70, 78]} />
      </SceneItem>
      <SceneItem x={6} y={306} z={46} width={206} floatDelay={-4.5}>
        <TaskCard title="Reunião de fechamento" related="Escola Nova Era" when="Amanhã, 10h" done />
      </SceneItem>
      <SceneItem x={226} y={258} z={120} width={206}>
        <TaskCard title="Visita técnica" related="Clínica Bem Viver" when="Venceu ontem" overdue locked />
      </SceneItem>
    </Scene3D>
  );
}

export function IndicatorsScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={0} y={36} z={-60} width={160} floatDelay={-2}>
        <KpiCard label="Oportunidades abertas" value="45" bars={[70, 58, 64, 52, 60]} />
      </SceneItem>
      <SceneItem x={286} y={20} z={72} width={148} floatDelay={-1}>
        <KpiCard label="Conversão do mês" value="31%" bars={[38, 52, 44, 66, 84]} />
      </SceneItem>
      <SceneItem x={6} y={300} z={46} width={170} floatDelay={-4.5}>
        <KpiCard label="Perdas: prazo de entrega" value="42%" bars={[60, 48, 52, 40, 42]} />
      </SceneItem>
      <SceneItem x={240} y={262} z={120} width={180}>
        <KpiCard label="Valor ganho no mês" value="R$ 182.400" bars={[46, 58, 50, 72, 90]} locked />
      </SceneItem>
    </Scene3D>
  );
}

export function StoresScene() {
  return (
    <Scene3D>
      <Reticle3D />
      <SceneItem x={0} y={36} z={-60} width={200} floatDelay={-2}>
        <StoreCard name="Loja Norte" detail="6 pessoas" value={38900} />
      </SceneItem>
      <SceneItem x={250} y={22} z={72} width={190} floatDelay={-1}>
        <StoreCard name="Loja Sul" detail="4 pessoas" value={24300} />
      </SceneItem>
      <SceneItem x={6} y={302} z={46} width={200} floatDelay={-4.5}>
        <StoreCard name="Loja Centro" detail="8 pessoas" value={64200} />
      </SceneItem>
      <SceneItem x={240} y={262} z={120} width={180}>
        <KpiCard label="Todas as lojas no mês" value="R$ 127.400" bars={[44, 56, 50, 68, 86]} locked />
      </SceneItem>
    </Scene3D>
  );
}
