import { Icon, type IconName } from "@/components/ui/Icon";

import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

const entries: { icon: IconName; when: string; who: string; what: string }[] = [
  { icon: "funnel", when: "Hoje, 11h20", who: "Maria Alves", what: "mudou a etapa de Escola Nova Era" },
  { icon: "store", when: "Hoje, 11h02", who: "Diretoria", what: "ligou Josué Lima à Loja Sul" },
  { icon: "upload", when: "Hoje, 10h31", who: "Josefa Santos", what: "importou 112 contatos" },
  { icon: "upload", when: "Hoje, 9h40", who: "Ana Rocha", what: "exportou os contatos da Loja Centro" },
  { icon: "history", when: "Hoje, 9h12", who: "Josué Lima", what: "alterou o valor de Mercado São Jorge" },
];

export function AuditLogMock() {
  return (
    <MockFrame
      title="Histórico de alterações"
      aside={<span className={styles.scopePill}>Só o diretor vê</span>}
      label="Ilustração do histórico de alterações: mudança de etapa, vínculo de pessoa a uma loja, importação, exportação e alteração de valor, cada uma com autor e horário."
    >
      <div className={styles.filters}>
        <span className={styles.filterOn}>Todas as ações</span>
        <span>Alterações</span>
        <span>Exportações</span>
        <span>Acessos</span>
      </div>
      <ul className={styles.audit}>
        {entries.map((entry) => (
          <li key={entry.when}>
            <span className={styles.auditIcon}>
              <Icon name={entry.icon} />
            </span>
            <span className={styles.rowText}>
              <b>{entry.who}</b>
              <span>{entry.what}</span>
            </span>
            <span className={styles.when}>{entry.when}</span>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}
