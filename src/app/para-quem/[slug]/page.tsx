import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CtaBand } from "@/components/cta-band/CtaBand";
import { FaqList } from "@/components/faq/FaqList";
import { InfoCards, type InfoCardItem } from "@/components/info-cards/InfoCards";
import { ActivitiesMock } from "@/components/mockups/ActivitiesMock";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import { StoresMock } from "@/components/mockups/StoresMock";
import { PageHero } from "@/components/page-hero/PageHero";
import { DirectorScene, ManagerScene, SellerScene } from "@/components/scene-3d/AudienceScenes";
import { FeatureSplit } from "@/components/section/FeatureSplit";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { SplitGrid } from "@/components/section/SplitGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { audiences, getAudience, type Audience } from "@/content/audiences";
import { featurePath, getFeature } from "@/content/features";
import { pageMetadata } from "@/lib/seo";

import styles from "./page.module.css";

interface AudiencePageProps {
  params: Promise<{ slug: string }>;
}

// Só os três papéis existem; qualquer outro /para-quem/<algo> dá 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((audience) => ({ slug: audience.slug }));
}

export async function generateMetadata({ params }: AudiencePageProps): Promise<Metadata> {
  const audience = getAudience((await params).slug);
  if (!audience) return {};
  return pageMetadata({ ...audience.page.seo, path: audience.href });
}

const scenes: Record<Audience["id"], ReactNode> = {
  vendedores: <SellerScene />,
  gestores: <ManagerScene />,
  diretores: <DirectorScene />,
};

const mocks: Record<Audience["id"], ReactNode> = {
  vendedores: <ActivitiesMock />,
  gestores: <DashboardMock />,
  diretores: <StoresMock />,
};

function featureCards(audience: Audience): InfoCardItem[] {
  const cards: InfoCardItem[] = audience.page.features.slugs
    .map((slug) => getFeature(slug))
    .filter((feature) => feature !== undefined)
    .map((feature) => ({
      icon: feature.icon,
      title: feature.name,
      text: feature.summary,
      link: { label: `Ver ${feature.name.toLowerCase()}`, href: featurePath(feature.slug) },
    }));
  const extra = audience.page.features.extra;
  if (extra) cards.push({ icon: extra.icon, title: extra.title, text: extra.text, link: { label: extra.linkLabel, href: extra.href } });
  return cards;
}

export default async function AudiencePage({ params }: AudiencePageProps) {
  const audience = getAudience((await params).slug);
  if (!audience) notFound();
  const { page } = audience;
  const role = audience.label.toLowerCase();

  return (
    <>
      <PageHero
        trail={[{ label: page.hero.eyebrow, href: audience.href }]}
        eyebrow={page.hero.eyebrow}
        eyebrowId={`eyebrow-${audience.slug}`}
        title={page.hero.title}
        sub={page.hero.sub}
        secondary={{ label: "Ver a rotina", href: "#rotina" }}
        scene={scenes[audience.id]}
      />

      <Section id="rotina" labelledBy="rotina-title" tone="tint" decor="reticle">
        <div className="container">
          <SectionHeader id="rotina-title" eyebrow="Rotina" title={page.day.title} lead={page.day.lead} />
          <ol className={styles.day}>
            {page.day.steps.map((step) => (
              <li key={step.when} className={styles.dayStep}>
                <span className={styles.when}>{step.when}</span>
                <p className={styles.dayText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="ve-title" decor="chart">
        <div className="container">
          <FeatureSplit
            id="ve-title"
            headingLevel={2}
            eyebrow={page.sees.eyebrow}
            title={page.sees.title}
            text={page.sees.text}
            bullets={page.sees.bullets}
            link={{ label: "Ver as permissões", href: "#permissoes" }}
            visual={mocks[audience.id]}
          />
        </div>
      </Section>

      <Section id="permissoes" labelledBy="permissoes-title" tone="navy" decorSide="left" decor="lanes">
        <SplitGrid
          aside={
            <SectionHeader
              id="permissoes-title"
              eyebrow="Permissões"
              title={page.permissions.title}
              lead={page.permissions.lead}
              onDark
            />
          }
        >
          <div className={styles.perms}>
            <div className={`${styles.panel} ${styles.can}`}>
              <h3>Pode</h3>
              <ul className={styles.list}>
                {page.permissions.can.map((item) => (
                  <li key={item}>
                    <Icon name="check" className={styles.mark} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${styles.panel} ${page.permissions.otherKind === "logged" ? styles.logged : styles.cannot}`}>
              <h3>{page.permissions.otherTitle}</h3>
              <ul className={styles.list}>
                {page.permissions.other.map((item) => (
                  <li key={item}>
                    <Icon name={page.permissions.otherKind === "logged" ? "history" : "x"} className={styles.mark} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SplitGrid>
      </Section>

      <Section labelledBy="funcionalidades-title" tone="tint" decor="network">
        <div className="container">
          <SectionHeader
            id="funcionalidades-title"
            eyebrow="Funcionalidades"
            title={`As funcionalidades que o ${role} mais usa`}
          />
          <div className={styles.after}>
            <InfoCards items={featureCards(audience)} columns={3} />
          </div>
        </div>
      </Section>

      <Section labelledBy="perguntas-title" decorSide="left" decor="route">
        <SplitGrid
          variant="wide"
          aside={
            <SectionHeader
              id="perguntas-title"
              eyebrow="Perguntas frequentes"
              title={`Perguntas sobre o LOCKONS ${page.hero.eyebrow.toLowerCase()}`}
              action={
                <ButtonLink href="/perguntas-frequentes" variant="text">
                  Ver todas as perguntas
                </ButtonLink>
              }
            />
          }
        >
          <FaqList items={page.faq} />
        </SplitGrid>
      </Section>

      <CtaBand
        title="Seu funil inteiro, sempre no foco."
        text={page.closingText}
        secondary={{ label: "Conheça o produto", href: "/produto" }}
      />
    </>
  );
}
