import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

const activities = [
  { title: "Visita técnica", related: "Clínica Bem Viver", when: "Venceu ontem", overdue: true },
  { title: "Ligar para retorno", related: "Construtora Horizonte", when: "Hoje, 15h" },
  { title: "Enviar proposta revisada", related: "Mercado São Jorge", when: "Hoje, 17h" },
  { title: "Reunião de fechamento", related: "Escola Nova Era", when: "Amanhã, 10h", done: true },
];

export function ActivitiesMock() {
  return (
    <MockFrame
      title="Minhas atividades"
      aside={<span className={styles.alertPill}>1 vencida</span>}
      label="Ilustração da lista de atividades do vendedor: uma visita vencida em destaque, duas atividades para hoje e uma reunião já concluída."
    >
      <ul className={styles.tasks}>
        {activities.map((task) => (
          <li
            key={task.title}
            className={[styles.task, task.overdue && styles.taskOverdue, task.done && styles.taskDone]
              .filter(Boolean)
              .join(" ")}
          >
            <span className={styles.checkbox} />
            <span className={styles.rowText}>
              <b>{task.title}</b>
              <span>{task.related}</span>
            </span>
            <span className={styles.when}>{task.when}</span>
          </li>
        ))}
      </ul>
    </MockFrame>
  );
}
