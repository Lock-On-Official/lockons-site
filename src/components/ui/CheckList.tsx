import { Icon } from "./Icon";
import styles from "./CheckList.module.css";

/** Lista curta de pontos com o visto azul. */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" className={styles.check} />
          {item}
        </li>
      ))}
    </ul>
  );
}
