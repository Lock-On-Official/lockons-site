import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import type { BlogPost } from "@/content/blog";
import { blogPostPath, formatPostDate, readingMinutes } from "@/lib/blog";

import { BlogCover } from "./BlogCover";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: BlogPost;
  /** "featured": cartão largo, capa ao lado do texto. */
  variant?: "default" | "featured";
  /** Nível do título: 2 no destaque da listagem, 3 nas grades. */
  headingLevel?: 2 | 3;
}

/** Cartão de artigo. O cartão inteiro é clicável pelo link do título (o ::after cobre o cartão). */
export function PostCard({ post, variant = "default", headingLevel = 3 }: PostCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={[styles.card, variant === "featured" && styles.featured, "lock-frame"].filter(Boolean).join(" ")}>
      <BlogCover icon={post.icon} category={post.category} />
      <div className={styles.body}>
        <p className={styles.category}>{post.category}</p>
        <Heading className={styles.title}>
          <Link href={blogPostPath(post.slug)} className={styles.link}>
            {post.title}
          </Link>
        </Heading>
        <p className={styles.description}>{post.description}</p>
        <p className={styles.meta}>
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className={styles.reading}>
            <Icon name="clock" className={styles.clock} />
            {readingMinutes(post.body)} min de leitura
          </span>
        </p>
      </div>
    </article>
  );
}
