import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

const totals = [
  { label: "Linhas", value: "120" },
  { label: "Prontas", value: "112", tone: "ok" },
  { label: "Repetidas", value: "6" },
  { label: "Com erro", value: "2", tone: "error" },
];

const flagged = [
  { line: 14, name: "Josefa Santos", reason: "Já cadastrado · será pulado" },
  { line: 37, name: "Paulo Mendes", reason: "CPF com dígito inválido" },
  { line: 58, name: "Rita Campos", reason: "Já cadastrado · será pulado" },
];

export function ImportReportMock() {
  return (
    <MockFrame
      title="Simulação da importação"
      aside="clientes.csv"
      label="Ilustração do relatório da simulação: 120 linhas, 112 prontas, 6 repetidas e 2 com erro, com o motivo de cada linha recusada e o botão para importar as 112 prontas."
    >
      <div className={styles.tiles4}>
        {totals.map((total) => (
          <div
            key={total.label}
            className={[styles.tile, total.tone === "ok" && styles.tileOk, total.tone === "error" && styles.tileError]
              .filter(Boolean)
              .join(" ")}
          >
            <span>{total.label}</span>
            <b>{total.value}</b>
          </div>
        ))}
      </div>
      <ul className={styles.tasks}>
        {flagged.map((row) => (
          <li key={row.line} className={styles.task}>
            <span className={styles.lineNo}>{row.line}</span>
            <span className={styles.rowText}>
              <b>{row.name}</b>
              <span>{row.reason}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <span className={styles.ghost}>Corrigir a planilha</span>
        <span className={styles.primary}>Importar 112 contatos</span>
      </div>
    </MockFrame>
  );
}
