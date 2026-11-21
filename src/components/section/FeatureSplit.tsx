import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckList } from "@/components/ui/CheckList";

import styles from "./FeatureSplit.module.css";

interface FeatureSplitProps {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  bullets: readonly string[];
  link?: { label: string; href: string };
  visual: ReactNode;
  /** Ilustração à esquerda: alterna o lado entre blocos seguidos. */
  reverse?: boolean;
  /** 2 quando o bloco é a seção inteira (o título é o da seção); 3 quando é um bloco dentro dela. */
  headingLevel?: 2 | 3;
}

/** Bloco de uma ideia: texto e 3 pontos de um lado, ilustração da tela do outro. */
export function FeatureSplit({
  id,
  eyebrow,
  title,
  text,
  bullets,
  link,
  visual,
  reverse = false,
  headingLevel = 3,
}: FeatureSplitProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  // Como seção inteira, a <section> em volta já dá o rótulo; um <article> repetiria o mesmo título.
  const Wrapper = headingLevel === 2 ? "div" : "article";

  return (
    <Wrapper
      className={reverse ? `${styles.split} ${styles.reverse}` : styles.split}
      aria-labelledby={headingLevel === 3 ? id : undefined}
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Heading id={id} className={headingLevel === 2 ? `${styles.title} ${styles.titleSection}` : styles.title}>
          {title}
        </Heading>
        <p className={styles.text}>{text}</p>
        <CheckList items={bullets} />
        {link && (
          <div>
            <ButtonLink href={link.href} variant="text">
              {link.label}
            </ButtonLink>
          </div>
        )}
      </div>
      <div className={styles.visual}>{visual}</div>
    </Wrapper>
  );
}
