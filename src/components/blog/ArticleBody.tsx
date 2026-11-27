import type { BlogBlock } from "@/content/blog";
import { headingId } from "@/lib/blog";

import styles from "./ArticleBody.module.css";

/** Corpo do artigo a partir dos blocos de src/content/blog.ts. Os subtítulos ganham âncora para o índice. */
export function ArticleBody({ body }: { body: readonly BlogBlock[] }) {
  return (
    <div className={styles.prose}>
      {body.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} id={headingId(block.text)}>
                {block.text}
              </h2>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            );
          }
          case "tip":
            return (
              <aside key={index} className={styles.tip} aria-label={block.title}>
                <p className={styles.tipTitle}>{block.title}</p>
                <p>{block.text}</p>
              </aside>
            );
          default:
            return <p key={index}>{block.text}</p>;
        }
      })}
    </div>
  );
}
