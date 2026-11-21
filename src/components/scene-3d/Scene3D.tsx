"use client";

import { useEffect, useRef, type ReactNode } from "react";

import styles from "./Scene3D.module.css";

/** Tamanho do palco em px; as posições dos itens usam esta escala. */
export const STAGE_SIZE = 440;

const BASE_TILT_X = 10;
const BASE_TILT_Y = -16;

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

interface Scene3DProps {
  children: ReactNode;
  className?: string;
}

/**
 * Palco 3D só com CSS (perspectiva + preserve-3d), sem biblioteca.
 * O cliente só ajusta a escala à largura disponível e inclina a cena com o ponteiro.
 * A inclinação vale na área do ancestral com `data-scene-tilt` (ex.: o hero inteiro) ou só na cena.
 */
export function Scene3D({ children, className }: Scene3DProps) {
  const fitRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = fitRef.current;
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!fit || !scene || !stage) return;

    const rescale = () => {
      const width = fit.clientWidth;
      if (width) scene.style.setProperty("--k", (width / STAGE_SIZE).toFixed(4));
    };
    rescale();
    const observer = new ResizeObserver(rescale);
    observer.observe(fit);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const area = fit.closest<HTMLElement>("[data-scene-tilt]") ?? fit;

    const onPointerMove = (event: PointerEvent) => {
      // No toque, o movimento é rolagem da página, não intenção de girar a cena.
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const box = fit.getBoundingClientRect();
      const dx = clamp((event.clientX - (box.left + box.width / 2)) / box.width);
      const dy = clamp((event.clientY - (box.top + box.height / 2)) / box.height);
      stage.style.setProperty("--rx", `${(BASE_TILT_X - dy * 12).toFixed(2)}deg`);
      stage.style.setProperty("--ry", `${(BASE_TILT_Y + dx * 18).toFixed(2)}deg`);
    };
    const onPointerLeave = () => {
      stage.style.removeProperty("--rx");
      stage.style.removeProperty("--ry");
    };

    area.addEventListener("pointermove", onPointerMove);
    area.addEventListener("pointerleave", onPointerLeave);
    return () => {
      observer.disconnect();
      area.removeEventListener("pointermove", onPointerMove);
      area.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    // Decorativa: o texto ao lado da cena carrega a informação.
    <div ref={fitRef} className={[styles.fit, className].filter(Boolean).join(" ")} aria-hidden="true">
      <div ref={sceneRef} className={styles.scene}>
        <div ref={stageRef} className={styles.stage}>
          {children}
        </div>
      </div>
    </div>
  );
}
