import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";

import styles from "./Toast.module.css";

interface ToastProps {
  icon: IconName;
  title: string;
  text: string;
  /** Posição na caixa de 560 × 500. */
  left: number;
  top: number;
  width: number;
  /** "alert": aviso de algo vencido (vermelho de status); "info": neutro. */
  tone?: "alert" | "info";
  /** Atraso do ciclo, para desencontrar avisos diferentes. */
  delay?: number;
}

/** Aviso que entra, fica alguns segundos e sai, em loop: a notificação do sistema. */
export function Toast({ icon, title, text, left, top, width, tone = "info", delay = 2 }: ToastProps) {
  return (
    <div
      className={`${styles.toast} ${styles[tone]}`}
      style={{ left, top, width, "--delay": `${delay}s` } as CSSProperties}
    >
      <span className={styles.icon}>
        <Icon name={icon} />
      </span>
      <span className={styles.text}>
        <b>{title}</b>
        <span>{text}</span>
      </span>
    </div>
  );
}
