import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CtaBand } from "@/components/cta-band/CtaBand";
import { FaqList } from "@/components/faq/FaqList";
import { InfoCards } from "@/components/info-cards/InfoCards";
import { ActivitiesMock } from "@/components/mockups/ActivitiesMock";
import { ContactsMock } from "@/components/mockups/ContactsMock";
import { DashboardMock } from "@/components/mockups/DashboardMock";
import { PipelineMock } from "@/components/mockups/PipelineMock";
import { StoresMock } from "@/components/mockups/StoresMock";
import { PageHero } from "@/components/page-hero/PageHero";
import {
  ActivitiesScene,
  ContactsScene,
  IndicatorsScene,
  PipelineScene,
  StoresScene,
} from "@/components/scene-3d/FeatureScenes";
import { FeatureSplit } from "@/components/section/FeatureSplit";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { SplitGrid } from "@/components/section/SplitGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { featurePath, features, getFeature, type Feature, type FeatureSlug } from "@/content/features";
import { pageMetadata } from "@/lib/seo";

import styles from "./page.module.css";

interface FeaturePageProps {
  params: Promise<{ slug: string }>;
}

// Só as funcionalidades da lista existem; qualquer outro /produto/<algo> dá 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return features.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const feature = getFeature((await params).slug);
  if (!feature) return {};
  return pageMetadata({ ...feature.seo, path: featurePath(feature.slug) });
}

const scenes: Record<FeatureSlug, ReactNode> = {
  "gestao-de-contatos": <ContactsScene />,
  "funil-de-vendas": <PipelineScene />,
  "atividades-e-follow-up": <ActivitiesScene />,
  "indicadores-de-vendas": <IndicatorsScene />,
  "multiplas-lojas": <StoresScene />,
};

const mocks: Record<FeatureSlug, ReactNode> = {
  "gestao-de-contatos": <ContactsMock />,
  "funil-de-vendas": <PipelineMock />,
  "atividades-e-follow-up": <ActivitiesMock />,
  "indicadores-de-vendas": <DashboardMock />,
  "multiplas-lojas": <StoresMock />,
};

export default async function FeaturePage({ params }: FeaturePageProps) {
  const feature = getFeature((await params).slug);
  if (!feature) notFound();

  const related = feature.related
    .map((slug) => getFeature(slug))
    .filter((item): item is Feature => Boolean(item));
  const nameLower = feature.name.toLowerCase();

  return (
    <>
      <PageHero
        trail={[
          { label: "Produto", href: "/produto" },
          { label: feature.name, href: featurePath(feature.slug) },
        ]}
        eyebrow={feature.name}
        eyebrowId={`eyebrow-${feature.slug}`}
        title={feature.hero.title}
        sub={feature.hero.sub}
        secondary={{ label: "Ver como funciona", href: "#como-funciona" }}
        scene={scenes[feature.slug]}
      />

      <Section id="como-funciona" labelledBy="como-funciona-title" tone="tint">
        <div className="container">
          <FeatureSplit
            id="como-funciona-title"
            headingLevel={2}
            eyebrow={feature.how.eyebrow}
            title={feature.how.title}
            text={feature.how.text}
            bullets={feature.how.bullets}
            link={{ label: `Perguntas sobre ${nameLower}`, href: "#perguntas" }}
            visual={mocks[feature.slug]}
          />
        </div>
      </Section>

      <Section labelledBy="beneficios-title">
        <SplitGrid
          aside={
            <SectionHeader
              id="beneficios-title"
              eyebrow={feature.name}
              title={feature.benefits.title}
              lead={feature.benefits.lead}
            />
          }
        >
          <InfoCards items={feature.benefits.items} columns={2} />
        </SplitGrid>
      </Section>

      <Section id="perguntas" labelledBy="perguntas-title" tone="tint">
        <SplitGrid
          variant="wide"
          aside={
            <SectionHeader
              id="perguntas-title"
              eyebrow="Perguntas frequentes"
              title={`Perguntas sobre ${nameLower}`}
              action={
                <ButtonLink href="/perguntas-frequentes" variant="text">
                  Ver todas as perguntas
                </ButtonLink>
              }
            />
          }
        >
          <FaqList items={feature.faq} />
        </SplitGrid>
      </Section>

      <Section labelledBy="relacionadas-title">
        <div className="container">
          <SectionHeader
            id="relacionadas-title"
            eyebrow="Produto"
            title="Conheça também"
            action={
              <ButtonLink href="/produto" variant="text">
                Ver o produto completo
              </ButtonLink>
            }
          />
          <div className={styles.after}>
            <InfoCards
              columns={3}
              items={related.map((item) => ({
                icon: item.icon,
                title: item.name,
                text: item.summary,
                link: { label: `Ver ${item.name.toLowerCase()}`, href: featurePath(item.slug) },
              }))}
            />
          </div>
        </div>
      </Section>

      <CtaBand
        title="Seu funil inteiro, sempre no foco."
        text={feature.closingText}
        secondary={{ label: "Conheça o produto", href: "/produto" }}
      />
    </>
  );
}
