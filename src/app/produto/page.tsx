import { CtaBand } from "@/components/cta-band/CtaBand";
import { InfoCards } from "@/components/info-cards/InfoCards";
import { PageHero } from "@/components/page-hero/PageHero";
import { ProductScene } from "@/components/scene-3d/FeatureScenes";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { audiences } from "@/content/audiences";
import { featurePath, features, productPage } from "@/content/features";
import { pageMetadata } from "@/lib/seo";
import { softwareApplication } from "@/lib/structured-data";

import styles from "./page.module.css";

export const metadata = pageMetadata({ ...productPage.seo, path: "/produto" });

const featureCards = [
  ...features.map((feature) => ({
    icon: feature.icon,
    title: feature.name,
    text: feature.summary,
    link: { label: `Ver ${feature.name.toLowerCase()}`, href: featurePath(feature.slug) },
  })),
  {
    icon: productPage.features.security.icon,
    title: productPage.features.security.name,
    text: productPage.features.security.summary,
    link: { label: "Ver segurança e permissões", href: productPage.features.security.href },
  },
];

export default function ProductPage() {
  const { hero, flow } = productPage;

  return (
    <>
      <JsonLd data={softwareApplication(productPage.seo.description)} />

      <PageHero
        trail={[{ label: "Produto", href: "/produto" }]}
        eyebrow={hero.eyebrow}
        eyebrowId="eyebrow-produto"
        title={hero.title}
        sub={hero.sub}
        secondary={hero.secondary}
        scene={<ProductScene />}
      />

      <Section id={productPage.features.id} labelledBy="funcionalidades-title" tone="tint" decor="reticle">
        <div className="container">
          <SectionHeader
            id="funcionalidades-title"
            eyebrow={productPage.features.eyebrow}
            title={productPage.features.title}
            lead={productPage.features.lead}
          />
          <div className={styles.after}>
            <InfoCards items={featureCards} columns={3} />
          </div>
        </div>
      </Section>

      {/* azul-marinho entre duas seções claras: não encosta na faixa de fechamento, também azul-marinho */}
      <Section labelledBy="papeis-title" tone="navy" decorSide="left" decor="network">
        <div className="container">
          <SectionHeader
            id="papeis-title"
            eyebrow={productPage.audiences.eyebrow}
            title={productPage.audiences.title}
            lead={productPage.audiences.lead}
            onDark
          />
          <ul className={styles.roles}>
            {audiences.map((audience) => (
              <li key={audience.id} className={styles.role}>
                <Chip>{audience.label}</Chip>
                <h3>{audience.title}</h3>
                <p>{audience.text}</p>
                <ButtonLink href={audience.href} variant="text" className={styles.roleLink}>
                  {audience.linkLabel}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="fluxo-title" decor="route">
        <div className="container">
          <SectionHeader id="fluxo-title" eyebrow={flow.eyebrow} title={flow.title} lead={flow.lead} align="center" />
          <ol className={styles.flow}>
            {flow.steps.map((step) => (
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

      <CtaBand
        title={productPage.closing.title}
        text={productPage.closing.text}
        secondary={{ label: "Ver perguntas frequentes", href: "/perguntas-frequentes" }}
      />
    </>
  );
}
