import { CtaBand } from "@/components/cta-band/CtaBand";
import { FaqList } from "@/components/faq/FaqList";
import { QAChatVisual } from "@/components/hero-visuals/QAChatVisual";
import { PageHero } from "@/components/page-hero/PageHero";
import { Section } from "@/components/section/Section";
import type { DecorKind } from "@/components/section/SectionDecor";
import { SectionHeader } from "@/components/section/SectionHeader";
import { SplitGrid } from "@/components/section/SplitGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { faqCategories, faqPage } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

import styles from "./page.module.css";

export const metadata = pageMetadata({ ...faqPage.seo, path: "/perguntas-frequentes" });

// Mira só na primeira categoria; nas outras, os demais desenhos em rodízio.
const decorByIndex: DecorKind[] = ["reticle", "network", "chart", "route", "lanes", "network", "chart", "route"];

export default function FaqPage() {
  // Única página com FAQPage: as perguntas das outras páginas também estão aqui.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <PageHero
        trail={[{ label: "Perguntas frequentes", href: "/perguntas-frequentes" }]}
        eyebrow={faqPage.hero.eyebrow}
        eyebrowId="eyebrow-perguntas"
        title={faqPage.hero.title}
        sub={faqPage.hero.sub}
        secondary={{ label: "Ver as categorias", href: "#categorias" }}
        visual={<QAChatVisual />}
      />

      <nav id="categorias" aria-label="Categorias de perguntas" className={styles.categories}>
        <ul className="container">
          {faqCategories.map((category) => (
            <li key={category.id}>
              <a href={`#${category.id}`}>
                {category.title}
                <span>{category.items.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {faqCategories.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          labelledBy={`${category.id}-title`}
          tone={index % 2 === 0 ? "tint" : "plain"}
          decor={decorByIndex[index % decorByIndex.length]}
          decorSide={index % 2 === 0 ? "right" : "left"}
        >
          <SplitGrid
            variant="wide"
            aside={
              <SectionHeader
                id={`${category.id}-title`}
                eyebrow="Perguntas frequentes"
                title={category.title}
                lead={category.lead}
                action={
                  category.link && (
                    <ButtonLink href={category.link.href} variant="text">
                      {category.link.label}
                    </ButtonLink>
                  )
                }
              />
            }
          >
            <FaqList items={category.items} />
          </SplitGrid>
        </Section>
      ))}

      <CtaBand
        title="Seu funil inteiro, sempre no foco."
        text={faqPage.closingText}
        secondary={{ label: "Conheça o produto", href: "/produto" }}
      />
    </>
  );
}
