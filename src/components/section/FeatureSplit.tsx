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
  link: { label: string; href: string };
  visual: ReactNode;
  /** Ilustração à esquerda: alterna o lado entre blocos seguidos. */
  reverse?: boolean;
}

/** Bloco de uma ideia: texto e 3 pontos de um lado, ilustração da tela do outro. */
export function FeatureSplit({ id, eyebrow, title, text, bullets, link, visual, reverse = false }: FeatureSplitProps) {
  return (
    <article className={reverse ? `${styles.split} ${styles.reverse}` : styles.split} aria-labelledby={id}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h3 id={id} className={styles.title}>
          {title}
        </h3>
        <p className={styles.text}>{text}</p>
        <CheckList items={bullets} />
        <div>
          <ButtonLink href={link.href} variant="text">
            {link.label}
          </ButtonLink>
        </div>
      </div>
      <div className={styles.visual}>{visual}</div>
    </article>
  );
}
