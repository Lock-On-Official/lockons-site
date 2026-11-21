import type { CSSProperties } from "react";

import { LogoMark } from "@/components/brand/LogoMark";

import { ScaleBox } from "./ScaleBox";
import styles from "./QAChatVisual.module.css";

const exchanges = [
  { question: "Funciona para uma empresa com várias lojas?", answer: "Sim. Cada pessoa vê as lojas em que trabalha, e o diretor vê todas." },
  { question: "Consigo trazer a planilha que já uso?", answer: "Sim, em CSV, com simulação antes de gravar. Repetidos ficam de fora." },
  { question: "O vendedor mexe nos clientes dos outros?", answer: "Não. Só o dono, o gestor e o diretor editam ou excluem." },
];

/** Perguntas frequentes: uma conversa em que as dúvidas chegam e as respostas vêm em seguida, em loop. */
export function QAChatVisual() {
  return (
    <ScaleBox label="Ilustração de uma conversa: perguntas sobre várias lojas, importação da planilha e permissões, cada uma seguida da resposta.">
      <div className={styles.scene}>
        <div className={styles.window}>
          <div className={styles.head}>
            <span className={styles.mark}>
              <LogoMark idPrefix="qa-chat" />
            </span>
            <span>
              <b>Perguntas sobre o LOCKONS</b>
              <span>respostas curtas e diretas</span>
            </span>
          </div>
          <div className={styles.thread}>
            {exchanges.map((exchange, index) => (
              <div key={exchange.question} className={styles.exchange} style={{ "--slot": index } as CSSProperties}>
                <p className={styles.question}>{exchange.question}</p>
                <span className={styles.typing}>
                  <i />
                  <i />
                  <i />
                </span>
                <p className={styles.answer}>{exchange.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <span className={`${styles.chip} ${styles.c1}`}>Lojas</span>
        <span className={`${styles.chip} ${styles.c2}`}>Permissões</span>
        <span className={`${styles.chip} ${styles.c3}`}>Importação</span>
      </div>
    </ScaleBox>
  );
}
