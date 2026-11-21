import { CtaBand } from "@/components/cta-band/CtaBand";
import { DemoForm } from "@/components/demo-form/DemoForm";
import { InfoCards } from "@/components/info-cards/InfoCards";
import { PageHero } from "@/components/page-hero/PageHero";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { demoPage } from "@/content/demo";
import { featurePath, features } from "@/content/features";
import { pageMetadata } from "@/lib/seo";

import styles from "./page.module.css";

export const metadata = pageMetadata({ ...demoPage.seo, path: "/agendar-demonstracao" });

// As quatro partes que aparecem na demonstração, com link para a página de cada uma.
const topics = features
  .filter((feature) => feature.slug !== "multiplas-lojas")
  .map((feature) => ({
    icon: feature.icon,
    title: feature.name,
    text: feature.summary,
    link: { label: `Ver ${feature.name.toLowerCase()}`, href: featurePath(feature.slug) },
  }));

export default function DemoPage() {
  const { hero, steps, topics: topicsSection, closing } = demoPage;

  return (
    <>
      <PageHero
        trail={[{ label: "Agendar demonstração", href: "/agendar-demonstracao" }]}
        eyebrow={hero.eyebrow}
        eyebrowId="eyebrow-demonstracao"
        title={hero.title}
        sub={hero.sub}
        showDemoCta={false}
        secondary={{ label: "Como é a demonstração", href: "#como-funciona" }}
        visual={<DemoForm />}
      />

      <Section id="como-funciona" labelledBy="como-funciona-title" tone="tint" decor="reticle">
        <div className="container">
          <SectionHeader id="como-funciona-title" eyebrow={steps.eyebrow} title={steps.title} lead={steps.lead} />
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

      <Section labelledBy="topicos-title" decor="network" decorSide="left">
        <div className="container">
          <SectionHeader id="topicos-title" eyebrow={topicsSection.eyebrow} title={topicsSection.title} />
          <div className={styles.after}>
            <InfoCards items={topics} columns={4} />
          </div>
        </div>
      </Section>

      <CtaBand
        title={closing.title}
        text={closing.text}
        ctaLabel="Ver perguntas frequentes"
        ctaHref="/perguntas-frequentes"
        secondary={{ label: "Conheça o produto", href: "/produto" }}
      />
    </>
  );
}
