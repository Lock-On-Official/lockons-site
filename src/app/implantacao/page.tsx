import { KpiCard } from "@/components/cards/KpiCard";
import { CtaBand } from "@/components/cta-band/CtaBand";
import { FaqList } from "@/components/faq/FaqList";
import { ImportVisual } from "@/components/hero-visuals/ImportVisual";
import { ImportReportMock } from "@/components/mockups/ImportReportMock";
import { PageHero } from "@/components/page-hero/PageHero";
import { PhotoCard } from "@/components/photo-card/PhotoCard";
import { FeatureSplit } from "@/components/section/FeatureSplit";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { SplitGrid } from "@/components/section/SplitGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { photos } from "@/content/photos";
import { onboardingPage } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

import styles from "./page.module.css";

export const metadata = pageMetadata({ ...onboardingPage.seo, path: "/implantacao" });

export default function OnboardingPage() {
  const { hero, steps, ready } = onboardingPage;

  return (
    <>
      <PageHero
        trail={[{ label: "Implantação", href: "/implantacao" }]}
        eyebrow={hero.eyebrow}
        eyebrowId="eyebrow-implantacao"
        title={hero.title}
        sub={hero.sub}
        secondary={{ label: "Ver o passo a passo", href: "#passo-a-passo" }}
        visual={<ImportVisual />}
      />

      <Section id="passo-a-passo" labelledBy="passos-title" tone="tint" decor="reticle">
        <div className="container">
          <SectionHeader id="passos-title" eyebrow={steps.eyebrow} title={steps.title} lead={steps.lead} />
          <ol className={styles.steps}>
            {steps.items.map((step) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepIcon}>
                  <Icon name={step.icon} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="importacao-title">
        <div className="container">
          <FeatureSplit
            id="importacao-title"
            headingLevel={2}
            eyebrow={onboardingPage.import.eyebrow}
            title={onboardingPage.import.title}
            text={onboardingPage.import.text}
            bullets={onboardingPage.import.bullets}
            link={{ label: "Perguntas sobre a importação", href: "#perguntas" }}
            visual={<ImportReportMock />}
          />
        </div>
      </Section>

      <Section labelledBy="pronto-title" tone="navy" decor="lanes" decorSide="left">
        <SplitGrid
          aside={
            <div className={styles.readyCopy}>
              <SectionHeader id="pronto-title" eyebrow={ready.eyebrow} title={ready.title} lead={ready.text} onDark />
              <CheckList items={ready.bullets} onDark />
            </div>
          }
        >
          <PhotoCard
            photo={photos.onboarding}
            card={<KpiCard label="Contatos importados hoje" value="112" bars={[20, 35, 55, 78, 96]} />}
          />
        </SplitGrid>
      </Section>

      <Section id="perguntas" labelledBy="perguntas-title" tone="tint">
        <SplitGrid
          variant="wide"
          aside={
            <SectionHeader
              id="perguntas-title"
              eyebrow="Perguntas frequentes"
              title="Perguntas sobre implantação"
              action={
                <ButtonLink href="/perguntas-frequentes" variant="text">
                  Ver todas as perguntas
                </ButtonLink>
              }
            />
          }
        >
          <FaqList items={onboardingPage.faq} />
        </SplitGrid>
      </Section>

      <CtaBand
        title="Seu funil inteiro, sempre no foco."
        text={onboardingPage.closingText}
        secondary={{ label: "Conheça o produto", href: "/produto" }}
      />
    </>
  );
}
