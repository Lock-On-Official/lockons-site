import { formatBRL } from "@/lib/format";

import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

const stores = [
  { name: "Loja Centro", people: 8, open: 21, won: 64200 },
  { name: "Loja Norte", people: 6, open: 15, won: 38900 },
  { name: "Loja Sul", people: 4, open: 9, won: 24300 },
];

export function StoresMock() {
  const totalWon = stores.reduce((sum, store) => sum + store.won, 0);
  const totalOpen = stores.reduce((sum, store) => sum + store.open, 0);
  return (
    <MockFrame
      title="Lojas"
      aside={<span className={styles.scopePill}>Você vê: todas as lojas</span>}
      label="Ilustração da visão do diretor com três lojas, Centro, Norte e Sul, cada uma com a equipe, as oportunidades abertas e o valor ganho no mês, e o total da rede."
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Loja</th>
            <th>Equipe</th>
            <th>Abertas</th>
            <th>Ganho no mês</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.name}>
              <td>{store.name}</td>
              <td>{store.people}</td>
              <td>{store.open}</td>
              <td>{formatBRL(store.won)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Todas</td>
            <td>{stores.reduce((sum, store) => sum + store.people, 0)}</td>
            <td>{totalOpen}</td>
            <td>{formatBRL(totalWon)}</td>
          </tr>
        </tfoot>
      </table>
    </MockFrame>
  );
}
