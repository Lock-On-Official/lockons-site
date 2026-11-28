"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { demoPath } from "@/content/routes";

import styles from "./SiteHeader.module.css";

/** Duração do voo do botão do hero até o cabeçalho (e de volta). */
const FLIGHT_MS = 420;
/** Folga abaixo do cabeçalho: o voo começa quando o botão do hero chega a essa distância dele. */
const DOCK_GAP_PX = 24;
/** Altura do cabeçalho (--header-h, 4,25rem): fixa, para não medir o layout durante o carregamento. */
const HEADER_PX = 68;

/**
 * Botão "Agendar demonstração" do cabeçalho. Em página com esse botão no hero, só um dos dois aparece:
 * o do cabeçalho fica escondido (CSS) e, quando a rolagem leva o botão do hero para perto do cabeçalho,
 * uma cópia "voa" do lugar dele até aqui; ao subir de volta, o voo é o inverso. Com "reduzir movimento",
 * a troca é direta. Sem data-hero-cta (artigos, demonstração), o do cabeçalho aparece sempre; na 404, o
 * data-hero-cta marca o botão de volta e, sem o de demonstração para voar, o do cabeçalho fica escondido.
 */
export function HeaderCta() {
  const slotRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const slot = slotRef.current;
    const headerButton = slot?.querySelector<HTMLElement>("a");
    const heroButton = document.querySelector<HTMLElement>(`[data-hero-cta] a[href="${demoPath}"]`);
    if (!slot || !headerButton || !heroButton) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let docked = false;
    let first = true;
    let ghost: HTMLElement | null = null;
    let flight: Animation | null = null;

    const settle = (value: boolean) => {
      slot.toggleAttribute("data-docked", value);
      heroButton.style.visibility = value ? "hidden" : "";
    };

    const dropGhost = () => {
      flight?.cancel();
      ghost?.remove();
      flight = null;
      ghost = null;
    };

    const fly = (toHeader: boolean) => {
      dropGhost();
      const from = (toHeader ? heroButton : headerButton).getBoundingClientRect();
      const to = (toHeader ? headerButton : heroButton).getBoundingClientRect();
      const fromFont = getComputedStyle(toHeader ? heroButton : headerButton).fontSize;
      const toFont = getComputedStyle(toHeader ? headerButton : heroButton).fontSize;

      // a cópia tem o visual do botão do cabeçalho; durante o voo os dois botões de verdade ficam escondidos
      const copy = headerButton.cloneNode(true) as HTMLElement;
      copy.removeAttribute("href");
      copy.setAttribute("aria-hidden", "true");
      copy.tabIndex = -1;
      Object.assign(copy.style, {
        position: "fixed",
        left: "0",
        top: "0",
        margin: "0",
        padding: "0",
        zIndex: "60",
        pointerEvents: "none",
        boxSizing: "border-box",
        overflow: "hidden",
        transformOrigin: "0 0",
      });
      document.body.appendChild(copy);
      ghost = copy;
      slot.removeAttribute("data-docked");
      heroButton.style.visibility = "hidden";

      flight = copy.animate(
        [
          { transform: `translate(${from.left}px, ${from.top}px)`, width: `${from.width}px`, height: `${from.height}px`, fontSize: fromFont },
          { transform: `translate(${to.left}px, ${to.top}px)`, width: `${to.width}px`, height: `${to.height}px`, fontSize: toFont },
        ],
        { duration: FLIGHT_MS, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "forwards" },
      );
      flight.onfinish = () => {
        dropGhost();
        settle(toHeader);
      };
    };

    const setDocked = (value: boolean) => {
      if (value === docked) return;
      docked = value;
      if (first || reduceMotion.matches) {
        dropGhost();
        settle(value);
      } else {
        fly(value);
      }
    };

    // "perto de ocultar": o topo do botão do hero cruzou a linha logo abaixo do cabeçalho
    const observer = new IntersectionObserver(
      ([entry]) => {
        const lineTop = entry.rootBounds?.top ?? 0;
        setDocked(entry.intersectionRatio < 1 && entry.boundingClientRect.top < lineTop + 1);
        first = false;
      },
      { rootMargin: `-${HEADER_PX + DOCK_GAP_PX}px 0px 0px 0px`, threshold: [1] },
    );
    // começa depois do carregamento, com o navegador ocioso: não pesa no tempo de bloqueio da página
    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 200));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const idleId = idle(() => observer.observe(heroButton));

    return () => {
      cancelIdle(idleId);
      observer.disconnect();
      dropGhost();
      slot.removeAttribute("data-docked");
      heroButton.style.visibility = "";
    };
  }, [pathname]);

  return (
    <span ref={slotRef} className={styles.ctaSlot}>
      <ButtonLink href={demoPath} size="sm" className={styles.cta}>
        {/* um único item do botão (flex): sem isso o espaçamento entre itens alarga o texto */}
        <span>
          Agendar<span className={styles.ctaRest}> demonstração</span>
        </span>
      </ButtonLink>
    </span>
  );
}
