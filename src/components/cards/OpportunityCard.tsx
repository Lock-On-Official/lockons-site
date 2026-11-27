import { Chip, type ChipTone } from "@/components/ui/Chip";
import { formatBRL } from "@/lib/format";

import { LockBrackets } from "./LockBrackets";
import styles from "./cards.module.css";

interface OpportunityCardProps {
  stage: string;
  name: string;
  value: number;
  /** Próxima atividade, ex.: "Retornar hoje, 15h". */
  due?: string;
  /** Tom da etiqueta da etapa (ex.: "warning" em Negociação, "success" em Ganho). */
  tone?: ChipTone;
  /** Alta prioridade: etiqueta em âmbar, vence o `tone`. */
  hot?: boolean;
  /** A mira travou neste cartão: borda royal e cantos da mira. */
  locked?: boolean;
}

/** Cartão de oportunidade do funil. Os dados mostrados no site são fictícios. */
export function OpportunityCard({ stage, name, value, due, tone = "default", hot = false, locked = false }: OpportunityCardProps) {
  return (
    <div className={locked ? `${styles.card} ${styles.locked}` : styles.card}>
      <Chip tone={hot ? "warning" : tone}>{stage}</Chip>
      <span className={styles.name}>{name}</span>
      <span className={styles.value}>{formatBRL(value)}</span>
      {due && <span className={styles.due}>{due}</span>}
      {locked && <LockBrackets />}
    </div>
  );
}
