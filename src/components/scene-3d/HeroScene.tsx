import { KpiCard } from "@/components/cards/KpiCard";

import { HeroDashboard } from "./HeroDashboard";
import { Reticle3D } from "./Reticle3D";
import { Scene3D } from "./Scene3D";
import { SceneItem } from "./SceneItem";

/**
 * Cena do hero: a janela do funil ao fundo (parada) e, na frente, a mira do logo em 3D e o indicador do mês,
 * flutuando. Meio-termo decidido pelo time: o fundo e a janela do redesign, com o logo no lugar do cartão
 * travado, para fixar a identidade. Empresas e valores são fictícios.
 */
export function HeroScene() {
  return (
    <Scene3D>
      <SceneItem x={0} y={18} z={-90} width={440} float={false}>
        <HeroDashboard />
      </SceneItem>
      <Reticle3D cx={300} cy={292} scale={0.62} z={60} />
      <SceneItem x={0} y={278} z={110} width={156} floatDelay={-2}>
        <KpiCard label="Conversão do mês" value="31%" bars={[38, 52, 44, 66, 84]} />
      </SceneItem>
    </Scene3D>
  );
}
