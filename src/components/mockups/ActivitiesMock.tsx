"use client";

import { useEffect, useRef, useState } from "react";

import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

const activities = [
  { title: "Visita técnica", related: "Clínica Bem Viver", when: "Venceu ontem", overdue: true },
  { title: "Ligar para retorno", related: "Construtora Horizonte", when: "Hoje, 15h" },
  { title: "Enviar proposta revisada", related: "Mercado São Jorge", when: "Hoje, 17h" },
  { title: "Reunião de fechamento", related: "Escola Nova Era", when: "Amanhã, 10h", done: true },
];

type Action = "focus" | "check" | "uncheck" | "rest";

/**
 * Roteiro em loop: a linha da vez ganha destaque e é marcada (a vencida primeiro); depois de uma pausa,
 * as três são desmarcadas mais rápido, como a busca de contatos apaga o texto. `wait` é quanto o passo fica na tela.
 */
const script: { action: Action; row: number; wait: number }[] = [
  { action: "focus", row: 0, wait: 550 },
  { action: "check", row: 0, wait: 950 },
  { action: "focus", row: 1, wait: 450 },
  { action: "check", row: 1, wait: 950 },
  { action: "focus", row: 2, wait: 450 },
  { action: "check", row: 2, wait: 1900 },
  { action: "uncheck", row: 2, wait: 420 },
  { action: "uncheck", row: 1, wait: 420 },
  { action: "uncheck", row: 0, wait: 500 },
  { action: "rest", row: 0, wait: 900 },
];

const START_DELAY_MS = 700;

/** Estado da lista depois do passo `step` (-1 = estado inicial, o mesmo com "reduzir movimento"). */
function stateAt(step: number) {
  const done = activities.map((task) => Boolean(task.done));
  let active: number | null = null;
  for (const { action, row } of script.slice(0, step + 1)) {
    if (action === "rest") active = null;
    else active = row;
    if (action === "check") done[row] = true;
    if (action === "uncheck") done[row] = false;
  }
  return { done, active };
}

/**
 * Ilustração da lista de atividades: o vendedor marca as tarefas como feitas e depois desmarca, em loop.
 * Só anima enquanto está na tela; com "reduzir movimento", fica no estado inicial.
 */
export function ActivitiesMock() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const wait = step < 0 ? START_DELAY_MS : script[step].wait;
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % script.length), wait);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  const { done, active } = stateAt(step);
  const overdueCount = activities.filter((task, index) => task.overdue && !done[index]).length;

  return (
    <div ref={rootRef}>
      <MockFrame
        title="Minhas atividades"
        aside={
          overdueCount > 0 ? (
            <span className={styles.alertPill}>{overdueCount} vencida</span>
          ) : (
            <span className={styles.okPill}>Em dia</span>
          )
        }
        label="Ilustração animada da lista de atividades do vendedor: a visita vencida, a ligação e a proposta são marcadas como feitas, uma a uma, e depois desmarcadas; a reunião de fechamento já está concluída."
      >
        <ul className={styles.tasks}>
          {activities.map((task, index) => (
            <li
              key={task.title}
              className={[
                styles.task,
                task.overdue && !done[index] && styles.taskOverdue,
                done[index] && styles.taskDone,
                active === index && styles.taskActive,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.checkbox}>
                <svg viewBox="0 0 24 24" fill="none" focusable="false">
                  <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
                </svg>
              </span>
              <span className={styles.rowText}>
                <b>
                  <span className={styles.taskTitle}>{task.title}</span>
                </b>
                <span>{task.related}</span>
              </span>
              <span className={styles.when}>{task.when}</span>
            </li>
          ))}
        </ul>
      </MockFrame>
    </div>
  );
}
