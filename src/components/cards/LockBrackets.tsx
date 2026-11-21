import styles from "./cards.module.css";

/** Cantos da mira em volta de um cartão "travado". Vai dentro de um cartão com position: relative. */
export function LockBrackets() {
  return (
    <span className={styles.brackets} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
