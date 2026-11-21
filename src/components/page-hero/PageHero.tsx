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
  /** Cena 3D da página (variação da mira). */
  scene: ReactNode;
}

/** Hero das páginas internas: o mesmo desenho do hero da home, um pouco menor, com a trilha de navegação. */
export function PageHero({ trail, eyebrow, eyebrowId, title, sub, secondary, scene }: PageHeroProps) {
  return (
    <section className={styles.hero} data-scene-tilt aria-labelledby="page-title">
      <div className="container">
        <Breadcrumbs trail={trail} />
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Eyebrow idPrefix={eyebrowId}>{eyebrow}</Eyebrow>
            <h1 id="page-title" className={styles.title}>
              {title}
            </h1>
            <p className={styles.sub}>{sub}</p>
            <div className={styles.ctas}>
              <ButtonLink href={demoPath}>Agendar demonstração</ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="text">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
          {scene}
        </div>
      </div>
    </section>
  );
}
