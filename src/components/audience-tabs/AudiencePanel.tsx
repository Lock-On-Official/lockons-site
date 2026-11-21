import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { CheckList } from "@/components/ui/CheckList";
import type { Audience } from "@/content/audiences";

import styles from "./AudiencePanel.module.css";

interface AudiencePanelProps {
  audience: Audience;
  visual: ReactNode;
}

/** Conteúdo de uma aba de "Para quem": texto do papel, 3 pontos, link para a página dele e uma ilustração. */
export function AudiencePanel({ audience, visual }: AudiencePanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.copy}>
        <h3 className={styles.title}>{audience.title}</h3>
        <p className={styles.text}>{audience.text}</p>
        <CheckList items={audience.bullets} />
        <div>
          <ButtonLink href={audience.href} variant="text">
            {audience.linkLabel}
          </ButtonLink>
        </div>
      </div>
      <div className={styles.visual}>{visual}</div>
    </div>
  );
}
