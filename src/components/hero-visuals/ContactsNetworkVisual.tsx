import type { CSSProperties } from "react";

import { LockBrackets } from "@/components/cards/LockBrackets";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

import { ScaleBox } from "./ScaleBox";
import styles from "./ContactsNetworkVisual.module.css";

const HUB = { x: 280, y: 235 };

const people = [
  { initials: "JS", name: "Josefa Santos", tag: "Indicação", x: 92, y: 88 },
  { initials: "JA", name: "José Antônio", tag: "Cliente", x: 468, y: 92, focus: true },
  { initials: "MA", name: "Maria Alves", x: 500, y: 330 },
  { initials: "JL", name: "Josué Lima", tag: "Lead", x: 300, y: 438 },
  { initials: "AR", name: "Ana Rocha", x: 70, y: 352 },
];

/**
 * Gestão de contatos: a empresa no centro, as pessoas ligadas a ela. As linhas saem da empresa,
 * os contatos aparecem um a um e a mira trava no cliente com a ficha dele. Dados fictícios.
 */
export function ContactsNetworkVisual() {
  return (
    <ScaleBox label="Ilustração: a empresa Construtora Horizonte no centro, ligada a cinco contatos; a ficha de José Antônio Prado aparece em destaque.">
      <div className={styles.scene}>
        <svg className={styles.lines} viewBox="0 0 560 500" fill="none">
          {people.map((person, index) => (
            <line
              key={person.initials}
              x1={HUB.x}
              y1={HUB.y}
              x2={person.x}
              y2={person.y}
              pathLength={1}
              style={{ "--delay": `${0.2 + index * 0.15}s` } as CSSProperties}
            />
          ))}
          <circle className={styles.orbit} cx={HUB.x} cy={HUB.y} r="118" />
        </svg>

        <div className={styles.hub} style={{ left: HUB.x, top: HUB.y }}>
          <span className={styles.hubIcon}>
            <Icon name="building" />
          </span>
          <b>Construtora Horizonte</b>
          <span>Empresa · 5 contatos</span>
        </div>

        {people.map((person, index) => (
          <div
            key={person.initials}
            className={person.focus ? `${styles.person} ${styles.focus}` : styles.person}
            style={{ left: person.x, top: person.y, "--delay": `${0.45 + index * 0.15}s` } as CSSProperties}
          >
            <span className={styles.avatar}>{person.initials}</span>
            <span className={styles.name}>{person.name}</span>
            {person.tag && <Chip>{person.tag}</Chip>}
            {person.focus && <LockBrackets />}
          </div>
        ))}

        <div className={styles.detail}>
          <span className={styles.detailTitle}>José Antônio Prado</span>
          <span>Construtora Horizonte</span>
          <span>(11) 90000-1234</span>
          <span className={styles.timeline}>
            <Icon name="history" />
            Última ligação: ontem, 16h
          </span>
        </div>
      </div>
    </ScaleBox>
  );
}
