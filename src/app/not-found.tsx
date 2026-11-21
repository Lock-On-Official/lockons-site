import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

const shortcuts: { icon: IconName; label: string; href: string }[] = [
  { icon: "funnel", label: "Produto", href: "/produto" },
  { icon: "user", label: "Para vendedores", href: "/para-quem/vendedores" },
  { icon: "shield", label: "Segurança", href: "/seguranca" },
  { icon: "search", label: "Perguntas frequentes", href: "/perguntas-frequentes" },
];

/** 404: a mira procura o alvo e não acha. Atalhos para as páginas principais. */
export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="nao-encontrada-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.code}>Erro 404</p>
          <h1 id="nao-encontrada-title" className={styles.title}>
            Esta página saiu da <em className="text-gradient">mira.</em>
          </h1>
          <p className={styles.text}>
            O endereço pode ter mudado ou não existir mais. Volte ao início ou siga por um dos atalhos.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="/">Voltar ao início</ButtonLink>
          </div>
          <ul className={styles.shortcuts}>
            {shortcuts.map((item) => (
              <li key={item.href}>
                <ButtonLink href={item.href} variant="text">
                  <Icon name={item.icon} className={styles.shortcutIcon} />
                  {item.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.radar} aria-hidden="true">
          <span className={styles.target}>?</span>
          <svg className={styles.scope} viewBox="0 0 200 200" fill="none" stroke="currentColor">
            <circle cx="100" cy="100" r="92" strokeWidth="1" />
            <circle cx="100" cy="100" r="84" strokeWidth="4" strokeDasharray="1.2 7.6" />
            <circle cx="100" cy="100" r="70" strokeWidth="11" strokeDasharray="98 12" strokeDashoffset="104" />
            <g strokeWidth="5" strokeLinecap="round">
              <line x1="100" y1="12" x2="100" y2="40" />
              <line x1="160" y1="100" x2="188" y2="100" />
              <line x1="100" y1="160" x2="100" y2="188" />
              <line x1="12" y1="100" x2="40" y2="100" />
            </g>
            <path d="M92 100h16M100 92v16" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
