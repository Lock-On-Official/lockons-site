import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

const results = [
  { initials: "JA", name: "José Antônio Prado", detail: "Construtora Horizonte · (11) 90000-1234", tag: "Cliente", active: true },
  { initials: "JS", name: "Josefa Santos", detail: "Clínica Bem Viver · (11) 90000-5678", tag: "Indicação" },
  { initials: "JL", name: "Josué Lima", detail: "Mercado São Jorge · (11) 90000-9012", tag: "Lead" },
];

export function ContactsMock() {
  return (
    <MockFrame
      title="Contatos"
      label="Ilustração da busca de contatos: a busca por jose encontra José Antônio Prado, Josefa Santos e Josué Lima, cada um com empresa, telefone e etiqueta."
    >
      <div className={styles.search}>
        <Icon name="search" className={styles.searchIcon} />
        <span>jose</span>
        <span className={styles.caret} />
      </div>
      <ul className={styles.rows}>
        {results.map((row) => (
          <li key={row.name} className={row.active ? styles.rowActive : undefined}>
            <span className={styles.avatar}>{row.initials}</span>
            <span className={styles.rowText}>
              <b>{row.name}</b>
              <span>{row.detail}</span>
            </span>
            <Chip>{row.tag}</Chip>
          </li>
        ))}
      </ul>
      <p className={styles.note}>“jose” encontra “José”: a busca ignora acentos.</p>
    </MockFrame>
  );
}
