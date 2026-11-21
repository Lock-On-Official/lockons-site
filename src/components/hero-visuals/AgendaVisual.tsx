import { Icon } from "@/components/ui/Icon";

import { ScaleBox } from "./ScaleBox";
import { Toast } from "./Toast";
import styles from "./AgendaVisual.module.css";

const tasks = [
  { title: "Ligar para retorno", related: "Construtora Horizonte", when: "9h", check: styles.check1 },
  { title: "Enviar proposta revisada", related: "Mercado São Jorge", when: "11h", check: styles.check2 },
  { title: "Reunião de fechamento", related: "Escola Nova Era", when: "14h", check: styles.check3 },
];

/**
 * Atividades e follow-up: a agenda do dia vai sendo cumprida (tarefas marcadas uma a uma, o anel de
 * progresso avança), a atividade vencida fica em destaque e um lembrete chega. Loop. Dados fictícios.
 */
export function AgendaVisual() {
  return (
    <ScaleBox label="Ilustração da agenda do dia: três atividades sendo concluídas uma a uma, uma visita técnica vencida em destaque e um lembrete de retorno às 15h.">
      <div className={styles.scene}>
        <div className={styles.planner}>
          <div className={styles.head}>
            <span>
              <b>Hoje</b>
              <span>4 atividades</span>
            </span>
            <span className={styles.ring}>
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" pathLength={4} />
                <circle className={styles.ringFill} cx="22" cy="22" r="18" pathLength={4} />
              </svg>
              <span className={styles.ringCount} />
            </span>
          </div>
          <ul className={styles.list}>
            {tasks.map((task) => (
              <li key={task.title} className={`${styles.task} ${task.check}`}>
                <span className={styles.box}>
                  <Icon name="check" />
                </span>
                <span className={styles.label}>
                  <b>{task.title}</b>
                  <span>{task.related}</span>
                </span>
                <span className={styles.when}>{task.when}</span>
              </li>
            ))}
            <li className={`${styles.task} ${styles.late}`}>
              <span className={styles.box} />
              <span className={styles.label}>
                <b>Visita técnica</b>
                <span>Clínica Bem Viver</span>
              </span>
              <span className={styles.when}>Venceu ontem</span>
            </li>
          </ul>
        </div>

        <div className={styles.bell}>
          <Icon name="bell" />
          <span>1</span>
        </div>

        <Toast
          icon="bell"
          tone="alert"
          title="Lembrete"
          text="Retornar para Construtora Horizonte hoje, 15h"
          left={232}
          top={420}
          width={310}
          delay={2.5}
        />
      </div>
    </ScaleBox>
  );
}
