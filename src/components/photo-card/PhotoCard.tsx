import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import styles from "./PhotoCard.module.css";

interface PhotoCardProps {
  photo: { src: StaticImageData; alt: string; position?: string };
  /** Cartão do sistema sobreposto no canto da foto. */
  card: ReactNode;
}

/** Foto com o tratamento da marca (cantos arredondados, véu azul) e um cartão do sistema por cima. */
export function PhotoCard({ photo, card }: PhotoCardProps) {
  return (
    <figure className={styles.figure}>
      <div className={styles.photo}>
        <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 90vw, 420px" placeholder="blur" className={styles.img} style={{ objectPosition: photo.position }} />
      </div>
      {/* ilustração do sistema com dados fictícios: decorativa para leitor de tela */}
      <div className={styles.card} aria-hidden="true">
        {card}
      </div>
    </figure>
  );
}
