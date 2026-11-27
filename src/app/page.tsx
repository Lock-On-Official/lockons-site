import type { ReactNode } from "react";

import { AudiencePanel } from "@/components/audience-tabs/AudiencePanel";
import { AudienceTabs } from "@/components/audience-tabs/AudienceTabs";
import { KpiCard } from "@/components/cards/KpiCard";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { ChaosBoard } from "@/components/chaos-board/ChaosBoard";
import { DemoTerms } from "@/components/demo-form/DemoTerms";
import { CtaBand } from "@/components/cta-band/CtaBand";
import { FaqList } from "@/components/faq/FaqList";
import { InfoCards } from "@/components/info-cards/InfoCards";
import { ActivitiesMock } from "@/components/mockups/ActivitiesMock";
import { ContactsMock } from "@/components/mockups/ContactsMock";
import { PipelineMock } from "@/components/mockups/PipelineMock";
import { PhotoCard } from "@/components/photo-card/PhotoCard";
import { HeroScene } from "@/components/scene-3d/HeroScene";
import { SegmentCarousel } from "@/components/segments/SegmentCarousel";
import { FeatureSplit } from "@/components/section/FeatureSplit";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { SplitGrid } from "@/components/section/SplitGrid";
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
import { photos } from "@/content/photos";
import { demoPath } from "@/content/routes";
import { segments, segmentsSection } from "@/content/segments";
import { pageMetadata } from "@/lib/seo";
import { softwareApplication } from "@/lib/structured-data";

import styles from "./page.module.css";

export const metadata = pageMetadata({ description: homeSeo.description, path: "/" });

const pillarMocks: Record<Pillar["mock"], ReactNode> = {
  contacts: <ContactsMock />,
  pipeline: <PipelineMock />,
  activities: <ActivitiesMock />,
};

// Foto de cada papel com um cartão do sistema por cima (dados fictícios).
const audienceVisuals: Record<Audience["id"], ReactNode> = {
  vendedores: (
    <PhotoCard
      photo={photos.seller}
      card={
        <OpportunityCard stage="Alta prioridade" name="Construtora Horizonte" value={18400} due="Retornar hoje, 15h" hot />
      }
    />
  ),
  gestores: (
    <PhotoCard
      photo={photos.manager}
      card={<KpiCard label="Conversão das suas lojas" value="31%" bars={[38, 52, 44, 66, 84]} />}
    />
  ),
  diretores: (
    <PhotoCard
      photo={photos.director}
      card={<KpiCard label="Todas as lojas no mês" value="R$ 127.400" bars={[44, 56, 50, 68, 86]} />}
    />
  ),
};

/* Ritmo das seções: pontilhado → azul-claro → azul-marinho (destaque) → pontilhado → azul-claro... */
export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplication(homeSeo.description)} />

      {/* Hero: promessa, ação e a mira travando na oportunidade */}
      <section className={styles.hero} data-scene-tilt aria-labelledby="hero-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <Eyebrow idPrefix="hero-eyebrow" onDark>
              {hero.eyebrow}
            </Eyebrow>
            <h1 id="hero-title" className={styles.heroTitle}>
              {hero.titleStart} <em className="text-gradient">{hero.titleHighlight}</em>
            </h1>
            <p className={styles.heroSub}>{hero.sub}</p>
            <div className={styles.heroCtas} data-hero-cta>
              <ButtonLink href={demoPath} onDark>
                Agendar demonstração
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary" onDark>
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <DemoTerms onDark />
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
      <Section labelledBy="indicadores-title" tone="tint" decor="reticle">
        <SplitGrid
          aside={
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
          }
        >
          <InfoCards items={indicators.items} columns={2} />
        </SplitGrid>
      </Section>

      {/* Momento-assinatura: o quadro se organiza com a rolagem e aceita arrastar os cartões */}
      <Section id={chaosToFocus.id} labelledBy="caos-title" tone="navy" decorSide="left" decor="lanes">
        <div className={`container ${styles.chaosGrid}`}>
          <div className={styles.chaosCopy}>
            <SectionHeader
              id="caos-title"
              eyebrow={chaosToFocus.eyebrow}
              title={chaosToFocus.title}
              lead={chaosToFocus.lead}
              onDark
            />
            <ol className={styles.steps}>
              {chaosToFocus.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className={styles.hint}>
              <Icon name="move" className={styles.hintIcon} />
              <span className={styles.hintText}>
                {chaosToFocus.hint}
                {/* o quadro aceita as setas (ChaosBoard.onKeyDown): o atalho aparece como tecla */}
                <span className={styles.keys}>
                  No teclado: <kbd>Tab</kbd> até o cartão e{" "}
                  <kbd>
                    <span aria-hidden="true">←</span>
                    <span className="visually-hidden">seta para a esquerda</span>
                  </kbd>{" "}
                  <kbd>
                    <span aria-hidden="true">→</span>
                    <span className="visually-hidden">seta para a direita</span>
                  </kbd>{" "}
                  para mudar de etapa.
                </span>
              </span>
            </div>
          </div>
          <ChaosBoard columns={chaosToFocus.columns} tone="dark" />
        </div>
      </Section>

      {/* Três pilares, um por bloco, alternando o lado da tela */}
      <Section labelledBy="produto-title">
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
      </Section>

      {/* Para quem: alvo do link "Para quem" do header */}
      <Section id={audiencesSection.id} labelledBy="para-quem-title" tone="tint" decorSide="left" decor="route">
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
      </Section>

      {/* Segmentos: onde o LOCKONS entra, numa faixa de fotos em movimento contínuo */}
      <Section id={segmentsSection.id} labelledBy="segmentos-title">
        <div className="container">
          <SectionHeader
            id="segmentos-title"
            eyebrow={segmentsSection.eyebrow}
            title={segmentsSection.title}
            lead={segmentsSection.lead}
            align="center"
            action={<ButtonLink href={demoPath}>Agendar demonstração</ButtonLink>}
          />
        </div>
        {/* a faixa ocupa a largura da tela, com as bordas se apagando */}
        <div className={styles.segments}>
          <SegmentCarousel
            label="Segmentos"
            slides={segments.map((segment) => ({ id: segment.id, name: segment.name, photo: photos[segment.photo] }))}
          />
        </div>
      </Section>

      {/* Confiança e implantação: responde "e se der errado?" perto da decisão */}
      <Section labelledBy="confianca-title" tone="tint">
        <div className="container">
          <SectionHeader id="confianca-title" eyebrow={trust.eyebrow} title={trust.title} lead={trust.lead} />
          <div className={styles.after}>
            <InfoCards items={trust.items} columns={4} />
          </div>
        </div>
      </Section>

      {/* Perguntas: as principais aqui, todas na página própria */}
      <Section labelledBy="faq-title">
        <SplitGrid
          variant="wide"
          aside={
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
          }
        >
          <FaqList items={featuredFaq} />
        </SplitGrid>
      </Section>

      <CtaBand title={closing.title} text={closing.text} secondary={closing.secondary} />
    </>
  );
}
