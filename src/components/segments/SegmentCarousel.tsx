"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

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

/** Segundos de faixa por cartão: com 6 cartões, uma volta leva 48 s (devagar, para dar tempo de ler). */
const SECONDS_PER_SLIDE = 8;

/**
 * Faixa de segmentos de ponta a ponta da tela, em movimento contínuo (os cartões vêm duplicados para o laço
 * não ter emenda). Para quando o mouse fica sobre um cartão e só volta a andar quando o mouse sai da seção
 * inteira. Para teclado e toque, o botão de pausar; com "reduzir movimento", a faixa fica parada e rola à mão.
 */
export function SegmentCarousel({ slides, label }: SegmentCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

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
  const loop = { "--loop": `${slides.length * SECONDS_PER_SLIDE}s` } as CSSProperties;

  const cards = (copy: boolean) =>
    slides.map((slide, index) => (
      <li
        key={slide.id}
        className={styles.slide}
        onPointerEnter={onCardEnter}
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
      </li>
    ));

  return (
    <div ref={rootRef} className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label={label}>
      {/* com "reduzir movimento" a faixa rola à mão; o foco do teclado também pausa o movimento */}
      <div className={styles.viewport} tabIndex={0} aria-label={`${label}: faixa de fotos`}>
        <div className={styles.track} style={loop} data-paused={paused || undefined}>
          <ul className={styles.group}>{cards(false)}</ul>
          {/* cópia para o laço contínuo: escondida do leitor de tela */}
          <ul className={`${styles.group} ${styles.copy}`} aria-hidden="true">
            {cards(true)}
          </ul>
        </div>
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
