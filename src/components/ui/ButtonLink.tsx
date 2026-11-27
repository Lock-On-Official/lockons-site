import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./Button.module.css";

/** primary: o acento (uma ação principal por bloco); secondary: contorno neutro; text: link com seta. */
export type ButtonVariant = "primary" | "secondary" | "text";
export type ButtonSize = "md" | "sm";

interface ButtonStyle {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Sobre o azul-marinho: contorno claro no primário e no secundário, texto claro no link. */
  onDark?: boolean;
}

/** Classes do botão, reaproveitáveis num <button> de formulário. */
export function buttonClassName({ variant = "primary", size = "md", onDark = false }: ButtonStyle = {}): string {
  return [styles.button, styles[variant], variant !== "text" && styles[size], onDark && styles.onDark]
    .filter(Boolean)
    .join(" ");
}

interface ButtonLinkProps extends ButtonStyle {
  href: string;
  children: ReactNode;
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", size, onDark, className }: ButtonLinkProps) {
  const classes = [buttonClassName({ variant, size, onDark }), className].filter(Boolean).join(" ");
  const content = (
    <>
      {children}
      {variant !== "primary" && (
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  // Endereço externo (ex.: o sistema) não passa pelo roteador do Next.
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
