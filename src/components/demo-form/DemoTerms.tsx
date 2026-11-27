import { Icon } from "@/components/ui/Icon";
import { demoTerms } from "@/content/demo";

import styles from "./DemoTerms.module.css";

/**
 * As condições da demonstração ao lado do botão "Agendar demonstração" (quanto dura, quanto custa):
 * responde a dúvida que trava o clique antes de ela aparecer.
 */
export function DemoTerms({ onDark = false }: { onDark?: boolean }) {
  return (
    <p className={onDark ? `${styles.terms} ${styles.onDark}` : styles.terms}>
      <Icon name="clock" className={styles.icon} />
      {demoTerms}
    </p>
  );
}
