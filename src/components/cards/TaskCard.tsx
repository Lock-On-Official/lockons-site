import { LockBrackets } from "./LockBrackets";
import styles from "./cards.module.css";

interface TaskCardProps {
  title: string;
  related: string;
  when: string;
  overdue?: boolean;
  done?: boolean;
  locked?: boolean;
}

/** Cartão de atividade (ligação, visita, proposta), para as cenas. Dados fictícios. */
export function TaskCard({ title, related, when, overdue = false, done = false, locked = false }: TaskCardProps) {
  const classes = [styles.card, locked && styles.locked, overdue && styles.overdue].filter(Boolean).join(" ");
  return (
    <div className={classes}>
      <span className={styles.task}>
        <span className={done ? `${styles.taskBox} ${styles.taskBoxDone}` : styles.taskBox} />
        <span className={styles.personText}>
          <span className={done ? `${styles.name} ${styles.struck}` : styles.name}>{title}</span>
          <span>{related}</span>
        </span>
      </span>
      <span className={overdue ? `${styles.when} ${styles.whenLate}` : styles.when}>{when}</span>
      {locked && <LockBrackets />}
    </div>
  );
}
