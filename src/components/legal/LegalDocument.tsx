import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero/PageHero";
import { Icon } from "@/components/ui/Icon";
import type { LegalPage } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

import styles from "./LegalDocument.module.css";

/** Metadados da página legal: fora do Google enquanto o texto do jurídico não chega. */
export function legalMetadata(page: LegalPage): Metadata {
  const base = pageMetadata({ ...page.seo, path: page.path });
  return page.draft ? { ...base, robots: { index: false, follow: true } } : base;
}

/** Página legal: sumário fixo à esquerda e as seções à direita, com aviso enquanto o texto é rascunho. */
export function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHero
        trail={[{ label: page.title, href: page.path }]}
        eyebrow="Documentos"
        eyebrowId={`eyebrow-${page.path.slice(1)}`}
        title={page.title}
        sub={page.sub}
        showDemoCta={false}
      />

      {/* sem o respiro de uma seção comum: o documento começa logo abaixo do título */}
      <section className={styles.body} aria-labelledby="documento-title">
        <div className={`container ${styles.layout}`}>
          <nav aria-labelledby="sumario-title" className={styles.toc}>
            <p id="sumario-title" className={styles.tocTitle}>
              Nesta página
            </p>
            <ol>
              {page.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <article className={styles.article}>
            <h2 id="documento-title" className="visually-hidden">
              {page.title}
            </h2>
            {page.draft && (
              <div className={styles.draft} role="note">
                <Icon name="history" className={styles.draftIcon} />
                <span>
                  <b>Texto em elaboração</b>
                  <span>
                    O conteúdo desta página está sendo escrito pela equipe jurídica. A estrutura abaixo mostra os
                    assuntos que ela vai cobrir.
                  </span>
                </span>
              </div>
            )}
            {page.sections.map((section, index) => (
              <section key={section.id} id={section.id} className={styles.block} aria-labelledby={`${section.id}-title`}>
                <h3 id={`${section.id}-title`}>
                  <span className={styles.number}>{index + 1}.</span> {section.title}
                </h3>
                {section.text.length > 0 ? (
                  section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                ) : (
                  <p className={styles.pending}>Em elaboração.</p>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
