import { LockBrackets } from "@/components/cards/LockBrackets";
import { Icon, type IconName } from "@/components/ui/Icon";

import { ScaleBox } from "./ScaleBox";
import styles from "./AccessLayersVisual.module.css";

const layers = [
  { role: "Diretor", scope: "todas as lojas", className: styles.outer },
  { role: "Gestor", scope: "lojas liberadas", className: styles.middle },
  { role: "Vendedor", scope: "as lojas dele", className: styles.inner },
];

const log: { icon: IconName; who: string; what: string; when: string }[] = [
  { icon: "history", who: "Josué Lima", what: "alterou o valor · Mercado São Jorge", when: "9h12" },
  { icon: "upload", who: "Ana Rocha", what: "exportou contatos · Loja Centro", when: "9h40" },
  { icon: "user", who: "Márcio Teixeira", what: "entrou no sistema", when: "10h05" },
  { icon: "upload", who: "Josefa Santos", what: "importou 112 contatos", when: "10h31" },
  { icon: "store", who: "Diretoria", what: "ligou Josué Lima à Loja Sul", when: "11h02" },
  { icon: "funnel", who: "Maria Alves", what: "mudou a etapa · Escola Nova Era", when: "11h20" },
];

/**
 * Segurança: camadas de acesso (vendedor dentro de gestor dentro de diretor) em volta do escudo,
 * e o histórico de alterações rolando ao lado. Dados fictícios.
 */
export function AccessLayersVisual() {
  return (
    <ScaleBox label="Ilustração das camadas de acesso: o vendedor vê as lojas dele, o gestor as lojas liberadas e o diretor todas; ao lado, o histórico de alterações com quem fez o quê e quando.">
      <div className={styles.scene}>
        {layers.map((layer) => (
          <div key={layer.role} className={`${styles.layer} ${layer.className}`}>
            <span className={styles.tag}>
              <b>{layer.role}</b> · {layer.scope}
            </span>
          </div>
        ))}

        <div className={styles.shield}>
          <Icon name="shield" />
          <LockBrackets />
        </div>

        <div className={styles.log}>
          <span className={styles.logTitle}>
            <Icon name="history" />
            Histórico de alterações
          </span>
          <div className={styles.viewport}>
            {/* a lista aparece duas vezes para rolar sem emenda */}
            <ul className={styles.track}>
              {[...log, ...log].map((entry, index) => (
                <li key={index}>
                  <span className={styles.logIcon}>
                    <Icon name={entry.icon} />
                  </span>
                  <span className={styles.logText}>
                    <b>{entry.who}</b>
                    <span>{entry.what}</span>
                  </span>
                  <span className={styles.when}>{entry.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ScaleBox>
  );
}
