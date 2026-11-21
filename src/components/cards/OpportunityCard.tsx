import { Chip } from "@/components/ui/Chip";
import { formatBRL } from "@/lib/format";

import styles from "./cards.module.css";

interface OpportunityCardProps {
  stage: string;
  name: string;
  value: number;
  /** Próxima atividade, ex.: "Retornar hoje, 15h". */
  due?: string;
  /** Etiqueta de etapa em destaque (azul-royal). */
  hot?: boolean;
  /** A mira travou neste cartão: borda royal e cantos da mira. */
  locked?: boolean;
}

/** Cartão de oportunidade do funil. Os dados mostrados no site são fictícios. */
export function OpportunityCard({ stage, name, value, due, hot = false, locked = false }: OpportunityCardProps) {
  return (
    <div className={locked ? `${styles.card} ${styles.locked}` : styles.card}>
      <Chip tone={hot ? "hot" : "default"}>{stage}</Chip>
      <span className={styles.name}>{name}</span>
      <span className={styles.value}>{formatBRL(value)}</span>
      {due && <span className={styles.due}>{due}</span>}
      {locked && (
        <span className={styles.brackets} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      )}
    </div>
  );
}
