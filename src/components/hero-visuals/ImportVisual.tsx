import type { CSSProperties } from "react";

import { LockBrackets } from "@/components/cards/LockBrackets";
import { Icon } from "@/components/ui/Icon";

import { ScaleBox } from "./ScaleBox";
import styles from "./ImportVisual.module.css";

const rows = [
  { name: "José Antônio Prado", phone: "(11) 90000-1234" },
  { name: "Josefa Santos", phone: "(11) 90000-5678" },
  { name: "Josefa Santos", phone: "(11) 90000-5678", duplicate: true },
  { name: "Márcio Teixeira", phone: "(11) 90000-7890" },
  { name: "Ana Lúcia Rocha", phone: "(11) 90000-2468" },
  { name: "Maria Alves", phone: "(11) 90000-3456" },
];

/**
 * Implantação: as linhas da planilha acendem uma a uma e aparecem do outro lado como contatos;
 * a repetida fica de fora, e a simulação resume o resultado. Loop. Dados fictícios.
 */
export function ImportVisual() {
  return (
    <ScaleBox label="Ilustração da importação: as linhas da planilha clientes.csv viram contatos no LOCKONS, uma linha repetida é pulada e a simulação mostra 5 prontos e 1 repetido.">
      <div className={styles.scene}>
        <div className={styles.sheet}>
          <span className={styles.file}>
            <Icon name="upload" />
            clientes.csv
          </span>
          <span className={`${styles.cell} ${styles.headRow}`}>
            <span>Nome</span>
            <span>Telefone</span>
          </span>
          {rows.map((row, index) => (
            <span key={index} className={styles.cell} style={{ "--i": index } as CSSProperties}>
              <span>{row.name}</span>
              <span>{row.phone}</span>
            </span>
          ))}
        </div>

        <span className={styles.arrow}>
          <i />
          <i />
          <i />
        </span>

        <div className={styles.crm}>
          <span className={styles.file}>
            <Icon name="building" />
            Contatos no LOCKONS
          </span>
          {rows.map((row, index) => (
            <span
              key={index}
              className={row.duplicate ? `${styles.contact} ${styles.duplicate}` : styles.contact}
              style={{ "--i": index } as CSSProperties}
            >
              <span className={styles.avatar}>
                {row.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className={styles.contactText}>
                <b>{row.name}</b>
                <span>{row.duplicate ? "Repetido · pulado" : row.phone}</span>
              </span>
              {!row.duplicate && <Icon name="check" className={styles.ok} />}
            </span>
          ))}
        </div>

        <div className={styles.summary}>
          <span>Simulação</span>
          <b>5 prontos · 1 repetido</b>
          <LockBrackets />
        </div>
      </div>
    </ScaleBox>
  );
}
