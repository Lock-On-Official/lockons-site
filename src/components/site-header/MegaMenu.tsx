"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

import { Icon } from "@/components/ui/Icon";
import type { HeaderItem, MenuGroup, MenuHighlight } from "@/content/navigation";
import { photos } from "@/content/photos";
import { matchesPath } from "@/lib/path-match";

import styles from "./MegaMenu.module.css";

/**
 * Tempos do hover (NN/g e Baymard): o primeiro painel só abre com o mouse parado sobre a palavra por
 * um instante (passar por cima a caminho de outra coisa não abre nada); com um painel já aberto, a troca
 * é imediata; ao sair, há tolerância para o ponteiro chegar ao painel pela diagonal sem ele fechar.
 */
const OPEN_INTENT_MS = 280;
const CLOSE_DELAY_MS = 350;

/**
 * Navegação principal do desktop. Os itens com painel abrem ao parar o mouse sobre a palavra (com
 * tolerância para chegar ao painel), ao clicar ou pelo teclado (Enter, Espaço ou seta para baixo).
 * Fecha com Esc, clique fora, foco saindo do item ou troca de página. Todos os links vêm no HTML do servidor.
 */
export function MegaMenu({ items }: { items: readonly HeaderItem[] }) {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef<string>("mouse");
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const panels = useRef(new Map<string, HTMLDivElement>());
  const baseId = useId();

  // O layout não remonta entre páginas: sem isto o painel ficaria aberto depois de navegar.
  useEffect(() => {
    setOpenId(null);
  }, [pathname]);

  useEffect(
    () => () => {
      window.clearTimeout(closeTimer.current);
      window.clearTimeout(openTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!openId) return;
    const current = openId;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenId(null);
      triggers.current.get(current)?.focus();
    }
    function onPointerDown(event: globalThis.PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenId(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openId]);

  function open(id: string) {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    setOpenId(id);
  }

  /** Hover do mouse: com outro painel aberto troca na hora; senão espera a intenção. */
  function openOnHover(id: string) {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    if (openId !== null) {
      setOpenId(id);
      return;
    }
    openTimer.current = window.setTimeout(() => setOpenId(id), OPEN_INTENT_MS);
  }

  function closeSoon(id: string) {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenId((value) => (value === id ? null : value)), CLOSE_DELAY_MS);
  }

  function focusFirstLink(id: string) {
    // espera o painel ficar visível (visibility) para o foco pegar
    window.requestAnimationFrame(() => panels.current.get(id)?.querySelector<HTMLAnchorElement>("a")?.focus());
  }

  function onTriggerClick(event: MouseEvent<HTMLButtonElement>, id: string) {
    // No mouse o painel já abriu ao passar por cima: o clique não deve fechá-lo de surpresa.
    const byMouse = event.detail > 0 && lastPointer.current === "mouse";
    if (openId === id && !byMouse) setOpenId(null);
    else open(id);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: string) {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    open(id);
    focusFirstLink(id);
  }

  function onItemBlur(event: FocusEvent<HTMLLIElement>, id: string) {
    const next = event.relatedTarget as Node | null;
    if (next && !event.currentTarget.contains(next) && openId === id) setOpenId(null);
  }

  return (
    <nav ref={navRef} aria-label="Principal" className={styles.nav}>
      <ul className={styles.list}>
        {items.map((item) => {
          const current = matchesPath(pathname, item.match);
          if (item.kind === "link") {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.trigger}
                  data-current={current || undefined}
                  aria-current={pathname === item.href ? "page" : current ? "true" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openId === item.id;
          const panelId = `${baseId}-${item.id}`;
          return (
            <li
              key={item.id}
              onPointerEnter={(event: PointerEvent) => {
                lastPointer.current = event.pointerType;
                if (event.pointerType === "mouse") openOnHover(item.id);
              }}
              onPointerLeave={(event: PointerEvent) => {
                if (event.pointerType === "mouse") closeSoon(item.id);
              }}
              onPointerDown={(event: PointerEvent) => {
                lastPointer.current = event.pointerType;
              }}
              onBlur={(event) => onItemBlur(event, item.id)}
            >
              <button
                ref={(element) => {
                  if (element) triggers.current.set(item.id, element);
                  else triggers.current.delete(item.id);
                }}
                type="button"
                className={styles.trigger}
                data-current={current || undefined}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={(event) => onTriggerClick(event, item.id)}
                onKeyDown={(event) => onTriggerKeyDown(event, item.id)}
              >
                {item.label}
                {current && <span className="visually-hidden"> (seção atual)</span>}
                <Icon name="chevronDown" className={styles.chevron} />
              </button>
              <div
                ref={(element) => {
                  if (element) panels.current.set(item.id, element);
                  else panels.current.delete(item.id);
                }}
                id={panelId}
                className={styles.panel}
                data-open={isOpen || undefined}
              >
                <MenuPanel group={item} panelId={panelId} onNavigate={() => setOpenId(null)} />
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MenuPanel({ group, panelId, onNavigate }: { group: MenuGroup; panelId: string; onNavigate: () => void }) {
  return (
    <div className={`container ${styles.panelGrid}`}>
      <div className={styles.sections}>
        {group.sections.map((section, index) => {
          const titleId = `${panelId}-s${index}`;
          return (
            <div key={section.title} className={styles.section} data-columns={section.columns ?? 1}>
              <p id={titleId} className={styles.sectionTitle}>
                {section.title}
              </p>
              <ul aria-labelledby={titleId} className={styles.links}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link} onClick={onNavigate}>
                      <span className={`${styles.linkIcon} lock-frame`}>
                        <Icon name={link.icon} />
                      </span>
                      <span className={styles.linkText}>
                        <span className={styles.linkLabel}>{link.label}</span>
                        <span className={styles.linkDescription}>{link.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <Highlight highlight={group.highlight} onNavigate={onNavigate} />
    </div>
  );
}

function Highlight({ highlight, onNavigate }: { highlight: MenuHighlight; onNavigate: () => void }) {
  const photo = highlight.photo ? photos[highlight.photo] : null;
  return (
    <Link href={highlight.href} className={`${styles.highlight} lock-frame`} onClick={onNavigate}>
      <span className={styles.highlightMedia}>
        {photo ? (
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="300px"
            className={styles.highlightPhoto}
            style={{ objectPosition: photo.position }}
          />
        ) : (
          <span className={styles.highlightCover}>
            <span className={styles.highlightCoverIcon}>
              <Icon name={highlight.icon ?? "book"} />
            </span>
          </span>
        )}
      </span>
      <span className={styles.highlightBody}>
        <span className={styles.highlightTitle}>
          {highlight.title}
          {highlight.badge && <span className={styles.badge}>{highlight.badge}</span>}
        </span>
        <span className={styles.highlightText}>{highlight.text}</span>
        <span className={styles.highlightLink}>
          {highlight.linkLabel} <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}
