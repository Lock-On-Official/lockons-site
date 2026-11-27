import type { CSSProperties } from "react";

import { BlogCover } from "@/components/blog/BlogCover";
import { LockBrackets } from "@/components/cards/LockBrackets";
import { Icon } from "@/components/ui/Icon";
import { posts } from "@/content/blog";
import { readingMinutes, sortByNewest } from "@/lib/blog";

import { ScaleBox } from "./ScaleBox";
import styles from "./BlogVisual.module.css";

/** Posição de cada cartão no palco de 560 × 500: os dois de trás primeiro, o mais novo por último (na frente). */
const slots = [
  { left: 34, top: 40, width: 236, rotate: -6, z: -90, delay: 0 },
  { left: 292, top: 22, width: 236, rotate: 5, z: -50, delay: 0.12 },
  { left: 148, top: 188, width: 272, rotate: 0, z: 40, delay: 0.24 },
];

/**
 * Hero do blog: os três artigos mais recentes como cartões em perspectiva, e a mira travando no mais novo.
 * Os cartões entram uma vez, só com movimento (texto não usa transparência), e param.
 */
export function BlogVisual() {
  const [newest, second, third] = sortByNewest(posts);
  const cards = [third, second, newest].filter(Boolean);

  return (
    <ScaleBox label="Ilustração do blog: os três artigos mais recentes em cartões, com a mira travada no artigo mais novo.">
      <div className={styles.scene}>
        <div className={styles.glow} />
        <div className={styles.stack}>
          {cards.map((post, index) => {
            const slot = slots[index + (3 - cards.length)];
            const isNewest = post === newest;
            const style = {
              left: `${slot.left}px`,
              top: `${slot.top}px`,
              width: `${slot.width}px`,
              "--rotate": `${slot.rotate}deg`,
              "--z": `${slot.z}px`,
              "--delay": `${slot.delay}s`,
            } as CSSProperties;
            return (
              <div key={post.slug} className={isNewest ? `${styles.card} ${styles.newest}` : styles.card} style={style}>
                <BlogCover icon={post.icon} category={post.category} />
                <span className={styles.body}>
                  {isNewest && <span className={styles.badge}>Novo artigo</span>}
                  <span className={styles.title}>{post.title}</span>
                  <span className={styles.meta}>
                    <Icon name="clock" className={styles.clock} />
                    {readingMinutes(post.body)} min de leitura
                  </span>
                </span>
                {isNewest && <LockBrackets />}
              </div>
            );
          })}
        </div>
      </div>
    </ScaleBox>
  );
}
