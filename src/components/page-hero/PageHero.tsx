import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { demoPath } from "@/content/routes";

import styles from "./PageHero.module.css";

interface PageHeroProps {
  trail: readonly Crumb[];
  eyebrow: string;
  /** Prefixo dos ids do SVG do selo. */
  eyebrowId: string;
  title: ReactNode;
  sub: string;
  secondary?: { label: string; href: string };
  /**
   * Ilustração própria da página (componentes de hero-visuals). A mira 3D é exclusiva da home:
   * cada página interna tem uma ilustração e uma animação ligadas ao assunto dela.
   */
  visual?: ReactNode;
  /** Botão "Agendar demonstração". Desligue na própria página de demonstração e nas páginas legais. */
  showDemoCta?: boolean;
}

/** Hero das páginas internas: título e ações à esquerda, a ilustração da página à direita, com a trilha. */
export function PageHero({
  trail,
  eyebrow,
  eyebrowId,
  title,
  sub,
  secondary,
  visual,
  showDemoCta = true,
}: PageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className="container">
        <Breadcrumbs trail={trail} />
        <div className={visual ? styles.grid : `${styles.grid} ${styles.single}`}>
          <div className={styles.copy}>
            <Eyebrow idPrefix={eyebrowId}>{eyebrow}</Eyebrow>
            <h1 id="page-title" className={styles.title}>
              {title}
            </h1>
            <p className={styles.sub}>{sub}</p>
            {(showDemoCta || secondary) && (
              <div className={styles.ctas}>
                {showDemoCta && <ButtonLink href={demoPath}>Agendar demonstração</ButtonLink>}
                {secondary && (
                  <ButtonLink href={secondary.href} variant="text">
                    {secondary.label}
                  </ButtonLink>
                )}
              </div>
            )}
          </div>
          {visual}
        </div>
      </div>
    </section>
  );
}
