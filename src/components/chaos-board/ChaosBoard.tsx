"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { OpportunityCard } from "@/components/cards/OpportunityCard";
import type { ChipTone } from "@/components/ui/Chip";
import type { BoardCard, BoardColumn } from "@/content/home";
import { formatBRL } from "@/lib/format";

import styles from "./ChaosBoard.module.css";

/** Cor da etiqueta pela etapa: negociação em âmbar, ganho em verde; as outras na etiqueta azul. */
const stageTone: Record<string, ChipTone> = { Negociação: "warning", Ganho: "success" };

/** No toque, segurar antes de arrastar: um toque rápido continua rolando a página. */
const LONG_PRESS_MS = 220;
/** Distância mínima para o mouse começar a arrastar (um clique não move o cartão). */
const MOUSE_THRESHOLD_PX = 4;
/** Mover o dedo mais que isso antes do toque longo é rolagem, não arraste. */
const TOUCH_SLOP_PX = 8;
/** Perto da borda da tela, a página rola sozinha durante o arraste. */
const AUTO_SCROLL_EDGE_PX = 80;

interface Gesture {
  name: string;
  pointerId: number;
  pointerType: string;
  startX: number;
  startY: number;
  startScrollY: number;
  element: HTMLElement;
  active: boolean;
  timer?: number;
}

interface PendingFlip {
  name: string;
  left: number;
  top: number;
  focus: boolean;
}

interface ChaosBoardProps {
  columns: readonly BoardColumn[];
  tone?: "light" | "dark";
}

/**
 * Quadro do funil. Os cartões começam espalhados e assentam nas colunas com a rolagem (só CSS),
 * e o visitante pode arrastá-los entre as etapas: mouse, toque longo ou setas do teclado.
 * Contagem e total de cada etapa acompanham as mudanças.
 */
export function ChaosBoard({ columns, tone = "light" }: ChaosBoardProps) {
  const cardsByName = useMemo(
    () => new Map<string, BoardCard>(columns.flatMap((column) => column.cards.map((card) => [card.name, card]))),
    [columns],
  );
  const [placement, setPlacement] = useState<string[][]>(() =>
    columns.map((column) => column.cards.map((card) => card.name)),
  );
  const [dragging, setDragging] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const boardRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const gesture = useRef<Gesture | null>(null);
  const placementRef = useRef(placement);
  const overRef = useRef<number | null>(null);
  const pendingFlip = useRef<PendingFlip | null>(null);
  const instructionsId = useId();

  placementRef.current = placement;

  function columnOf(name: string): number {
    return placementRef.current.findIndex((names) => names.includes(name));
  }

  function moveCard(name: string, to: number, from: HTMLElement, focus: boolean) {
    const rect = from.getBoundingClientRect();
    pendingFlip.current = { name, left: rect.left, top: rect.top, focus };
    setPlacement((current) => {
      const next = current.map((names) => names.filter((item) => item !== name));
      next[to] = [...next[to], name];
      return next;
    });
    setAnnouncement(`${name} movida para ${columns[to].stage}.`);
  }

  // FLIP: o cartão sai de onde foi solto (ou de onde estava) e desliza até o novo lugar.
  useLayoutEffect(() => {
    const pending = pendingFlip.current;
    if (!pending) return;
    pendingFlip.current = null;
    const element = cardRefs.current.get(pending.name);
    if (!element) return;
    if (pending.focus) element.focus({ preventScroll: true });
    const rect = element.getBoundingClientRect();
    const dx = pending.left - rect.left;
    const dy = pending.top - rect.top;
    if (!dx && !dy) return;
    element.style.transition = "none";
    element.style.translate = `${dx}px ${dy}px`;
    element.getBoundingClientRect(); // força o layout antes de ligar a transição
    slideHome(element);
  }, [placement]);

  function slideHome(element: HTMLElement) {
    element.style.transition = "translate 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)";
    element.style.translate = "0px 0px";
    const clear = () => {
      // um novo arraste pode ter começado no mesmo cartão: não desfazer a posição dele
      if (gesture.current?.element === element && gesture.current.active) return;
      element.style.transition = "";
      element.style.translate = "";
    };
    element.addEventListener("transitionend", clear, { once: true });
    // garantia para quando a transição não roda (ex.: "reduzir movimento")
    window.setTimeout(clear, 400);
  }

  function columnAt(x: number, y: number): number | null {
    const index = columnRefs.current.findIndex((column) => {
      if (!column) return false;
      const box = column.getBoundingClientRect();
      return x >= box.left && x <= box.right && y >= box.top - 40 && y <= box.bottom + 40;
    });
    return index === -1 ? null : index;
  }

  function setOver(index: number | null) {
    if (overRef.current === index) return;
    overRef.current = index;
    setOverColumn(index);
  }

  function begin(current: Gesture) {
    current.active = true;
    current.timer = undefined;
    try {
      current.element.setPointerCapture(current.pointerId);
    } catch {
      // ponteiro já liberado: segue sem captura
    }
    current.element.style.transition = "none";
    setTouched(true);
    setDragging(current.name);
  }

  function finish(drop: boolean) {
    const current = gesture.current;
    if (!current) return;
    gesture.current = null;
    if (current.timer) window.clearTimeout(current.timer);
    if (!current.active) return;

    const target = overRef.current;
    setOver(null);
    setDragging(null);
    const from = columnOf(current.name);
    if (drop && target !== null && target !== from) {
      moveCard(current.name, target, current.element, false);
    } else {
      slideHome(current.element);
    }
  }

  // Movimento e soltura escutados na janela: o ponteiro sai do cartão durante o arraste.
  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      const current = gesture.current;
      if (!current || event.pointerId !== current.pointerId) return;
      const dx = event.clientX - current.startX;
      const dy = event.clientY - current.startY;

      if (!current.active) {
        if (current.pointerType === "touch") {
          if (Math.hypot(dx, dy) > TOUCH_SLOP_PX) finish(false);
          return;
        }
        if (Math.hypot(dx, dy) < MOUSE_THRESHOLD_PX) return;
        begin(current);
      }

      if (event.clientY < AUTO_SCROLL_EDGE_PX) window.scrollBy(0, -12);
      else if (event.clientY > window.innerHeight - AUTO_SCROLL_EDGE_PX) window.scrollBy(0, 12);

      // a página pode ter rolado: o cartão acompanha o dedo, não o documento
      const scrolled = window.scrollY - current.startScrollY;
      current.element.style.translate = `${dx}px ${dy + scrolled}px`;
      setOver(columnAt(event.clientX, event.clientY));
    }

    const onPointerUp = (event: PointerEvent) => {
      if (gesture.current?.pointerId === event.pointerId) finish(true);
    };
    const onPointerCancel = (event: PointerEvent) => {
      if (gesture.current?.pointerId === event.pointerId) finish(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
    };
    // Registrado uma vez: as funções leem o estado por refs, e `columns` não muda na página.
  }, []);

  // Durante o arraste por toque, o dedo move o cartão, não a página.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const onTouchMove = (event: TouchEvent) => {
      if (gesture.current?.active) event.preventDefault();
    };
    board.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => board.removeEventListener("touchmove", onTouchMove);
  }, []);

  function onPointerDown(event: ReactPointerEvent<HTMLElement>, name: string) {
    if (gesture.current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const current: Gesture = {
      name,
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      startScrollY: window.scrollY,
      element: event.currentTarget,
      active: false,
    };
    gesture.current = current;
    if (event.pointerType === "touch") {
      current.timer = window.setTimeout(() => begin(current), LONG_PRESS_MS);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>, name: string) {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    event.preventDefault();
    setTouched(true);
    const from = columnOf(name);
    const to = from + step;
    if (to < 0 || to >= columns.length) {
      setAnnouncement(`${name} já está em ${columns[from].stage}, ${step > 0 ? "a última" : "a primeira"} etapa.`);
      return;
    }
    moveCard(name, to, event.currentTarget, true);
  }

  return (
    <div
      ref={boardRef}
      className={[styles.board, tone === "dark" && styles.dark].filter(Boolean).join(" ")}
      data-touched={touched || undefined}
    >
      <p id={instructionsId} className="visually-hidden">
        Use as setas do teclado para mover o cartão entre as etapas.
      </p>
      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
      {columns.map((column, columnIndex) => {
        const names = placement[columnIndex];
        const total = names.reduce((sum, name) => sum + (cardsByName.get(name)?.value ?? 0), 0);
        const headingId = `${instructionsId}-col-${columnIndex}`;
        return (
          <section
            key={column.stage}
            ref={(element) => {
              columnRefs.current[columnIndex] = element;
            }}
            className={[styles.column, overColumn === columnIndex && styles.columnOver].filter(Boolean).join(" ")}
            aria-labelledby={headingId}
          >
            <div className={styles.columnHead}>
              <h3 id={headingId} className={styles.stage}>
                {column.stage}
              </h3>
              <span className={styles.count}>
                {names.length}
                <span className="visually-hidden"> oportunidades,</span>
              </span>
              <span className={styles.total}>{formatBRL(total)}</span>
            </div>
            <ul className={styles.cards}>
              {names.map((name) => {
                const card = cardsByName.get(name);
                if (!card) return null;
                return (
                  <li
                    key={name}
                    className={styles.slot}
                    style={{ "--chaos": card.chaos, "--chaos-m": card.chaosMobile } as CSSProperties}
                  >
                    <div
                      ref={(element) => {
                        if (element) cardRefs.current.set(name, element);
                        else cardRefs.current.delete(name);
                      }}
                      role="button"
                      tabIndex={0}
                      aria-roledescription="cartão arrastável"
                      aria-describedby={instructionsId}
                      className={[styles.card, dragging === name && styles.dragging].filter(Boolean).join(" ")}
                      onPointerDown={(event) => onPointerDown(event, name)}
                      onKeyDown={(event) => onKeyDown(event, name)}
                      onContextMenu={(event) => event.preventDefault()}
                    >
                      <OpportunityCard
                        stage={card.hot ? "Alta prioridade" : column.stage}
                        tone={stageTone[column.stage]}
                        name={card.name}
                        value={card.value}
                        due={card.due}
                        hot={card.hot}
                        locked={card.locked}
                      />
                    </div>
                  </li>
                );
              })}
              {names.length === 0 && (
                <li className={styles.empty} aria-hidden="true">
                  Solte um cartão aqui
                </li>
              )}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
