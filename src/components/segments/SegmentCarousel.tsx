"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { Icon } from "@/components/ui/Icon";

import styles from "./SegmentCarousel.module.css";

export interface SegmentSlide {
  id: string;
  name: string;
  photo: { src: StaticImageData; alt: string; position?: string };
}

interface SegmentCarouselProps {
  slides: readonly SegmentSlide[];
  label: string;
}

/** Segundos de faixa por cartão: com 6 cartões, uma volta leva 33 s (cerca de 60 px por segundo no computador). */
const SECONDS_PER_SLIDE = 5.5;
/** Duração do deslize de um cartão pelas setas. */
const STEP_MS = 450;

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Faixa de segmentos de ponta a ponta da tela, em movimento contínuo (os cartões vêm duplicados para o laço
 * não ter emenda). Para quando o mouse fica sobre um cartão e só volta a andar quando o mouse sai da seção
 * inteira. Para teclado e toque, o botão de pausar. Parada, ganha setas nas pontas para passar cartão a cartão.
 * Com "reduzir movimento", a faixa fica parada, rola à mão e as setas ficam sempre à mostra.
 */
export function SegmentCarousel({ slides, label }: SegmentCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const tweenRef = useRef(0);
  const viewportId = useId();
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      cancelAnimationFrame(tweenRef.current);
    };
  }, []);

  useEffect(() => {
    // sair da seção (e não só da faixa) é o que retoma o movimento
    const area = rootRef.current?.closest("section") ?? rootRef.current;
    if (!area) return;
    const resume = () => setHoverPaused(false);
    area.addEventListener("pointerleave", resume);
    return () => area.removeEventListener("pointerleave", resume);
  }, []);

  function onCardEnter(event: PointerEvent) {
    // só o mouse para a faixa; no toque, quem para é o botão
    if (event.pointerType === "mouse") setHoverPaused(true);
  }

  const paused = hoverPaused || userPaused;
  const showArrows = paused || reduced;

  /** Passa um cartão para o lado: com a faixa em laço, avança o tempo da animação; parada, rola a faixa. */
  function step(direction: 1 | -1) {
    const first = groupRef.current?.querySelector("li");
    if (!first) return;
    const distance = first.offsetWidth + (parseFloat(getComputedStyle(first).marginRight) || 0);

    if (reduced) {
      viewportRef.current?.scrollBy({ left: direction * distance });
      return;
    }

    const animation = trackRef.current?.getAnimations()[0];
    const groupWidth = groupRef.current?.offsetWidth ?? 0;
    const duration = Number(animation?.effect?.getComputedTiming().duration);
    if (!animation || !groupWidth || !duration) return;

    // o tempo da animação equivale à distância: uma volta inteira (duration) anda a largura de uma cópia
    const from = Number(animation.currentTime ?? 0);
    const delta = (duration * distance * direction) / groupWidth;
    const start = performance.now();
    cancelAnimationFrame(tweenRef.current);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / STEP_MS);
      const time = from + delta * easeInOut(t);
      animation.currentTime = ((time % duration) + duration) % duration;
      if (t < 1) tweenRef.current = requestAnimationFrame(tick);
    };
    tweenRef.current = requestAnimationFrame(tick);
  }
  const loop = { "--loop": `${slides.length * SECONDS_PER_SLIDE}s` } as CSSProperties;

  const cards = (copy: boolean) =>
    slides.map((slide, index) => (
      <li key={slide.id} className={styles.slide} onPointerEnter={onCardEnter}>
        {/* o papel de slide fica num elemento interno: o <li> continua item de lista */}
        <div
          className={styles.slideInner}
          {...(copy ? {} : { role: "group", "aria-roledescription": "slide", "aria-label": `${index + 1} de ${slides.length}: ${slide.name}` })}
        >
          <Image
            src={slide.photo.src}
            alt={copy ? "" : slide.photo.alt}
            fill
            sizes="(max-width: 700px) 72vw, 300px"
            placeholder="blur"
            className={styles.img}
            style={{ objectPosition: slide.photo.position }}
          />
          <span className={styles.name}>{slide.name}</span>
        </div>
      </li>
    ));

  return (
    <div ref={rootRef} className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label={label}>
      {/* com "reduzir movimento" a faixa rola à mão; o foco do teclado também pausa o movimento */}
      <div className={styles.stage}>
        <div id={viewportId} ref={viewportRef} className={styles.viewport} tabIndex={0} aria-label={`${label}: faixa de fotos`}>
          <div ref={trackRef} className={styles.track} style={loop} data-paused={paused || undefined}>
            <ul ref={groupRef} className={styles.group}>{cards(false)}</ul>
            {/* cópia para o laço contínuo: escondida do leitor de tela */}
            <ul className={`${styles.group} ${styles.copy}`} aria-hidden="true">
              {cards(true)}
            </ul>
          </div>
        </div>

        {/* setas nas pontas: só com a faixa parada (pelo mouse, pelo botão ou por "reduzir movimento") */}
        {showArrows && (
          <>
            <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => step(-1)} aria-controls={viewportId}>
              <Icon name="chevronDown" className={styles.arrowIcon} />
              <span className="visually-hidden">Ver segmentos anteriores</span>
            </button>
            <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => step(1)} aria-controls={viewportId}>
              <Icon name="chevronDown" className={styles.arrowIcon} />
              <span className="visually-hidden">Ver próximos segmentos</span>
            </button>
          </>
        )}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.toggle} onClick={() => setUserPaused((value) => !value)}>
          <Icon name={userPaused ? "play" : "pause"} className={styles.toggleIcon} />
          {userPaused ? "Continuar" : "Pausar"}
          <span className="visually-hidden"> o movimento da faixa</span>
        </button>
      </div>
    </div>
  );
}
