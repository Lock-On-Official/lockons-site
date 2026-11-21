"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { NavItem } from "@/content/routes";

import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  items: readonly NavItem[];
  appUrl: string | null;
}

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
        <ul className="container">
          {items.map((item) => (
            <li key={item.href}>
              {/* fecha também em âncoras da mesma página, onde o pathname não muda */}
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          {appUrl && (
            <li>
              <a href={appUrl}>Entrar</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
