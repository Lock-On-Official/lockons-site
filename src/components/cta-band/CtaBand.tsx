import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { demoPath } from "@/content/routes";

import styles from "./CtaBand.module.css";

interface CtaBandProps {
  title: ReactNode;
  text?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondary?: { label: string; href: string };
  /** id do título; único na página. */
  id?: string;
}

/**
 * Faixa azul-marinho de fechamento: a mira grande e desfocada ao fundo e o mesmo botão do topo da página.
 */
export function CtaBand({
  title,
  text,
  ctaLabel = "Agendar demonstração",
  ctaHref = demoPath,
  secondary,
  id = "fechamento",
}: CtaBandProps) {
  return (
    <section className={styles.band} aria-labelledby={id}>
      <div className={styles.backdrop} aria-hidden="true">
        <svg viewBox="0 0 64 64" focusable="false">
          <defs>
            <linearGradient id={`${id}-ring`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0" stopColor="#48A9F4" />
              <stop offset="1" stopColor="#286BE6" />
            </linearGradient>
          </defs>
          {/* anel e marcas giram juntos, quase parados; o núcleo fica fixo */}
          <g className={styles.spin}>
            <circle
              cx="32"
              cy="32"
              r="24"
              fill="none"
              stroke={`url(#${id}-ring)`}
              strokeWidth="6"
              strokeDasharray="32.7 5"
              strokeDashoffset="35.2"
            />
            <g stroke={`url(#${id}-ring)`} strokeWidth="4" strokeLinecap="round">
              <line x1="32" y1="3" x2="32" y2="13" />
              <line x1="51" y1="32" x2="61" y2="32" />
              <line x1="32" y1="51" x2="32" y2="61" />
              <line x1="3" y1="32" x2="13" y2="32" />
            </g>
          </g>
          <circle cx="32" cy="32" r="14" fill="#1E56D9" />
          <g fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="32" cy="29" r="3.2" />
            <path d="M26.5 38.5c0-3.2 2.4-5.4 5.5-5.4s5.5 2.2 5.5 5.4" />
            <circle cx="25.6" cy="31" r="2.3" />
            <path d="M21.4 37.6c0-2.4 1.8-4 4.2-4" />
            <circle cx="38.4" cy="31" r="2.3" />
            <path d="M42.6 37.6c0-2.4-1.8-4-4.2-4" />
          </g>
        </svg>
      </div>
      <div className="container">
        <div className={styles.copy}>
          <h2 id={id}>{title}</h2>
          {text && <p>{text}</p>}
          <div className={styles.actions}>
            <ButtonLink href={ctaHref} onDark>
              {ctaLabel}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="text" onDark>
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
