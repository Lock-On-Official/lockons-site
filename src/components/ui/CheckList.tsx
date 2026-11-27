import { Icon } from "./Icon";
import styles from "./CheckList.module.css";

/** Lista curta de pontos com o visto num círculo azul-claro (sobre o azul-marinho, círculo translúcido). */
export function CheckList({ items, onDark = false }: { items: readonly string[]; onDark?: boolean }) {
  return (
    <ul className={onDark ? `${styles.list} ${styles.onDark}` : styles.list}>
      {items.map((item) => (
        <li key={item}>
          <span className={styles.check} aria-hidden="true">
            <Icon name="check" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
