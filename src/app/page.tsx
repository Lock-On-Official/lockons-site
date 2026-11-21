import type { ReactNode } from "react";

import { AudiencePanel } from "@/components/audience-tabs/AudiencePanel";
import { AudienceTabs } from "@/components/audience-tabs/AudienceTabs";
import { KpiCard } from "@/components/cards/KpiCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { ChaosBoard } from "@/components/chaos-board/ChaosBoard";
import { CtaBand } from "@/components/cta-band/CtaBand";
import { FaqList } from "@/components/faq/FaqList";
import { ActivitiesMock } from "@/components/mockups/ActivitiesMock";
import { ContactsMock } from "@/components/mockups/ContactsMock";
import { PipelineMock } from "@/components/mockups/PipelineMock";
import { HeroScene } from "@/components/scene-3d/HeroScene";
import { FeatureSplit } from "@/components/section/FeatureSplit";
import { SectionHeader } from "@/components/section/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { audiences, audiencesSection, type Audience } from "@/content/audiences";
import { featuredFaq } from "@/content/faq";
import {
  chaosToFocus,
  closing,
  faqSection,
  hero,
  homeSeo,
  indicators,
  pillars,
  trust,
  type Pillar,
} from "@/content/home";
import { demoPath } from "@/content/routes";
import { pageMetadata } from "@/lib/seo";
import { softwareApplication } from "@/lib/structured-data";

import styles from "./page.module.css";

export const metadata = pageMetadata({ description: homeSeo.description, path: "/" });

const pillarMocks: Record<Pillar["mock"], ReactNode> = {
  contacts: <ContactsMock />,
  pipeline: <PipelineMock />,
  activities: <ActivitiesMock />,
};

// Ilustração de cada papel, com dados fictícios.
const audienceVisuals: Record<Audience["id"], ReactNode> = {
  vendedores: (
    <OpportunityCard
      stage="Alta prioridade"
      name="Construtora Horizonte"
      value={18400}
      due="Retornar hoje, 15h"
      hot
    />
  ),
  gestores: <KpiCard label="Conversão das suas lojas" value="31%" bars={[38, 52, 44, 66, 84]} />,
  diretores: <KpiCard label="Valor ganho · todas as lojas" value="R$ 182.400" bars={[46, 58, 50, 72, 90]} />,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplication(homeSeo.description)} />

      {/* Hero: promessa, ação e a mira travando na oportunidade */}
      <section className={styles.hero} data-scene-tilt aria-labelledby="hero-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <Eyebrow idPrefix="hero-eyebrow">{hero.eyebrow}</Eyebrow>
            <h1 id="hero-title" className={styles.heroTitle}>
              {hero.titleStart} <em className="text-gradient">{hero.titleHighlight}</em>
            </h1>
            <p className={styles.heroSub}>{hero.sub}</p>
            <div className={styles.heroCtas}>
              <ButtonLink href={demoPath}>Agendar demonstração</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="text">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <ul className={styles.proof}>
              {hero.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <HeroScene />
        </div>
      </section>

      {/* Prova: o que o painel mede hoje (sem número inventado) */}
      <section className={`${styles.section} ${styles.band}`} aria-labelledby="indicadores-title">
        <div className={`container ${styles.indicatorsGrid}`}>
          <SectionHeader
            id="indicadores-title"
            eyebrow={indicators.eyebrow}
            title={indicators.title}
            lead={indicators.lead}
            action={
              <ButtonLink href={indicators.link.href} variant="text">
                {indicators.link.label}
              </ButtonLink>
            }
          />
          <ul className={styles.cardGrid}>
            {indicators.items.map((item) => (
              <li key={item.title} className={styles.infoCard}>
                <span className={styles.iconWrap}>
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Momento-assinatura: o quadro se organiza com a rolagem */}
      <section id={chaosToFocus.id} className={styles.section} aria-labelledby="caos-title">
        <div className={`container ${styles.chaosGrid}`}>
          <div className={styles.chaosCopy}>
            <SectionHeader
              id="caos-title"
              eyebrow={chaosToFocus.eyebrow}
              title={chaosToFocus.title}
              lead={chaosToFocus.lead}
            />
            <ol className={styles.steps}>
              {chaosToFocus.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <ChaosBoard columns={chaosToFocus.columns} />
        </div>
      </section>

      {/* Três pilares, um por bloco, alternando o lado da tela */}
      <section className={`${styles.section} ${styles.band}`} aria-labelledby="produto-title">
        <div className="container">
          <SectionHeader
            id="produto-title"
            eyebrow={pillars.eyebrow}
            title={pillars.title}
            lead={pillars.lead}
            align="center"
          />
          <div className={styles.pillars}>
            {pillars.items.map((pillar, index) => (
              <FeatureSplit
                key={pillar.mock}
                id={`pilar-${pillar.mock}`}
                eyebrow={pillar.eyebrow}
                title={pillar.title}
                text={pillar.text}
                bullets={pillar.bullets}
                link={pillar.link}
                visual={pillarMocks[pillar.mock]}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Para quem: alvo do link "Para quem" do header */}
      <section id={audiencesSection.id} className={styles.section} aria-labelledby="para-quem-title">
        <div className="container">
          <SectionHeader
            id="para-quem-title"
            eyebrow={audiencesSection.eyebrow}
            title={audiencesSection.title}
            lead={audiencesSection.lead}
          />
          <div className={styles.tabsWrap}>
            <AudienceTabs
              label="Escolha o papel"
              tabs={audiences.map((audience) => ({
                id: audience.id,
                label: audience.label,
                panel: <AudiencePanel audience={audience} visual={audienceVisuals[audience.id]} />,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Confiança e implantação: responde "e se der errado?" perto da decisão */}
      <section className={`${styles.section} ${styles.band}`} aria-labelledby="confianca-title">
        <div className="container">
          <SectionHeader id="confianca-title" eyebrow={trust.eyebrow} title={trust.title} lead={trust.lead} />
          <ul className={styles.trustGrid}>
            {trust.items.map((item) => (
              <li key={item.title} className={styles.infoCard}>
                <span className={styles.iconWrap}>
                  <Icon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ButtonLink href={item.link.href} variant="text" className={styles.cardLink}>
                  {item.link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Perguntas: as principais aqui, todas na página própria */}
      <section className={styles.section} aria-labelledby="faq-title">
        <div className={`container ${styles.faqGrid}`}>
          <SectionHeader
            id="faq-title"
            eyebrow={faqSection.eyebrow}
            title={faqSection.title}
            action={
              <ButtonLink href={faqSection.link.href} variant="text">
                {faqSection.link.label}
              </ButtonLink>
            }
          />
          <FaqList items={featuredFaq} />
        </div>
      </section>

      <CtaBand title={closing.title} text={closing.text} secondary={closing.secondary} />
    </>
  );
}
