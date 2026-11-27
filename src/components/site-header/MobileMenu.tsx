"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import type { HeaderItem } from "@/content/navigation";

import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  items: readonly HeaderItem[];
  appUrl: string | null;
}

/** Menu do celular: os mesmos grupos do mega menu, em sanfona (<details>), com ícones. */
export function MobileMenu({ items, appUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // O layout não remonta entre páginas: sem isto o menu continuaria aberto após navegar.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // fecha também em âncoras da mesma página, onde o pathname não muda
  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="menu-celular"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="visually-hidden">{open ? "Fechar menu" : "Abrir menu"}</span>
        <span className={styles.icon} data-open={open} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
      <nav id="menu-celular" aria-label="Menu" className={styles.panel} hidden={!open}>
        <ul className={`container ${styles.list}`}>
          {items.map((item) =>
            item.kind === "link" ? (
              <li key={item.href}>
                <Link href={item.href} className={styles.topLink} onClick={close}>
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.id}>
                <details className={styles.group}>
                  <summary className={styles.summary}>
                    {item.label}
                    <Icon name="chevronDown" className={styles.chevron} />
                  </summary>
                  {item.sections.map((section) => (
                    <div key={section.title} className={styles.section}>
                      <p className={styles.sectionTitle}>{section.title}</p>
                      <ul className={styles.links}>
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} className={styles.link} onClick={close}>
                              <span className={styles.linkIcon}>
                                <Icon name={link.icon} />
                              </span>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </details>
              </li>
            ),
          )}
          {appUrl && (
            <li>
              <a href={appUrl} className={styles.topLink}>
                Entrar
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
