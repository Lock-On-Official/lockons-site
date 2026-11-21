"use client";

import { useEffect, useRef, useState } from "react";

import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

import { MockFrame } from "./MockFrame";
import styles from "./mockups.module.css";

/** Base fictícia da ilustração. */
const contacts = [
  { initials: "JA", name: "José Antônio Prado", company: "Construtora Horizonte", phone: "(11) 90000-1234", tag: "Cliente" },
  { initials: "JS", name: "Josefa Santos", company: "Clínica Bem Viver", phone: "(11) 90000-5678", tag: "Indicação" },
  { initials: "JL", name: "Josué Lima", company: "Mercado São Jorge", phone: "(11) 90000-9012", tag: "Lead" },
  { initials: "MA", name: "Maria Conceição Alves", company: "Escola Nova Era", phone: "(11) 90000-3456", tag: "Cliente" },
  { initials: "MT", name: "Márcio Teixeira", company: "Padaria Trigo Bom", phone: "(11) 90000-7890", tag: "Lead" },
  { initials: "AR", name: "Ana Lúcia Rocha", company: "Auto Peças Rota", phone: "(11) 90000-2468", tag: "Indicação" },
];

/** Buscas da demonstração, em loop: cada uma mostra uma regra real da busca do sistema. */
const queries = [
  { text: "jose", note: "“jose” encontra “José”: ignora acentos." },
  { text: "marcio", note: "“marcio” encontra “Márcio”, sem acento." },
  { text: "90000-5678", note: "Telefone comparado só pelos números." },
];

const TYPE_MS = 120;
const ERASE_MS = 45;
const HOLD_MS = 1900;
const PAUSE_MS = 450;
const MIN_PHONE_DIGITS = 4;
/** Linhas visíveis: a moldura tem altura fixa e o resto vira "e mais N". */
const MAX_ROWS = 3;

/** Tira acentos letra a letra, para os índices do texto original e do normalizado baterem. */
function fold(text: string): string {
  return Array.from(text, (char) => char.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()).join("");
}

function search(query: string) {
  const digits = query.replace(/\D/g, "");
  if (/\d/.test(query)) {
    if (digits.length < MIN_PHONE_DIGITS) return [];
    return contacts.filter((contact) => contact.phone.replace(/\D/g, "").includes(digits));
  }
  const term = fold(query.trim());
  if (!term) return [];
  return contacts.filter((contact) => fold(contact.name).includes(term));
}

/** Nome com o trecho encontrado em destaque (busca sem acento, destaque no texto original). */
function Highlight({ name, query }: { name: string; query: string }) {
  const term = fold(query.trim());
  const start = term && !/\d/.test(query) ? fold(name).indexOf(term) : -1;
  if (start < 0) return <>{name}</>;
  return (
    <>
      {name.slice(0, start)}
      <mark className={styles.match}>{name.slice(start, start + term.length)}</mark>
      {name.slice(start + term.length)}
    </>
  );
}

type Phase = "typing" | "holding" | "erasing" | "pausing";

/**
 * Ilustração da busca de contatos: alguém digita, os resultados aparecem, apaga e tenta outra busca.
 * Começa (e fica, com "reduzir movimento") na busca "jose" completa; só anima enquanto está na tela.
 */
export function ContactsMock() {
  const [queryIndex, setQueryIndex] = useState(0);
  const [typed, setTyped] = useState(queries[0].text);
  const [phase, setPhase] = useState<Phase>("holding");
  const [running, setRunning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const target = queries[queryIndex].text;
    let timer: number;
    if (phase === "typing") {
      timer = window.setTimeout(() => {
        const next = target.slice(0, typed.length + 1);
        setTyped(next);
        if (next === target) setPhase("holding");
      }, TYPE_MS);
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("erasing"), HOLD_MS);
    } else if (phase === "erasing") {
      timer = window.setTimeout(() => {
        const next = typed.slice(0, -1);
        setTyped(next);
        if (!next) setPhase("pausing");
      }, ERASE_MS);
    } else {
      timer = window.setTimeout(() => {
        setQueryIndex((index) => (index + 1) % queries.length);
        setPhase("typing");
      }, PAUSE_MS);
    }
    return () => window.clearTimeout(timer);
  }, [running, phase, typed, queryIndex]);

  const results = search(typed);
  const complete = typed === queries[queryIndex].text;
  const hint = typed
    ? /\d/.test(typed) && typed.replace(/\D/g, "").length < MIN_PHONE_DIGITS
      ? "Continue digitando…"
      : "Nenhum contato encontrado"
    : "Digite um nome, telefone ou CPF";

  return (
    <div ref={rootRef}>
      <MockFrame
        title="Contatos"
        label="Ilustração animada da busca de contatos: alguém digita jose e encontra José Antônio e Josefa; depois marcio, que encontra Márcio; depois um telefone com traço, comparado só pelos números."
      >
        <div className={styles.search}>
          <Icon name="search" className={styles.searchIcon} />
          <span className={styles.typed}>{typed}</span>
          <span className={styles.caret} />
        </div>
        <ul className={styles.rows}>
          {results.length === 0 && <li className={styles.rowsEmpty}>{hint}</li>}
          {results.slice(0, MAX_ROWS).map((row, index) => (
            <li key={row.name} className={index === 0 && complete ? `${styles.rowIn} ${styles.rowActive}` : styles.rowIn}>
              <span className={styles.avatar}>{row.initials}</span>
              <span className={styles.rowText}>
                <b>
                  <Highlight name={row.name} query={typed} />
                </b>
                <span>
                  {row.company} · {row.phone}
                </span>
              </span>
              <Chip>{row.tag}</Chip>
            </li>
          ))}
        </ul>
        <p className={styles.note}>
          {complete
            ? queries[queryIndex].note
            : results.length > MAX_ROWS
              ? `e mais ${results.length - MAX_ROWS} contatos`
              : "\u00a0"}
        </p>
      </MockFrame>
    </div>
  );
}
