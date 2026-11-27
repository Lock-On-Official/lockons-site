import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogCover } from "@/components/blog/BlogCover";
import { PostCard } from "@/components/blog/PostCard";
import { LogoMark } from "@/components/brand/LogoMark";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { CtaBand } from "@/components/cta-band/CtaBand";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { blogAuthor, posts } from "@/content/blog";
import { closing } from "@/content/home";
import { demoPath } from "@/content/routes";
import { blogPostPath, findPost, formatPostDate, readingMinutes, relatedPosts, tableOfContents } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { blogPostingJsonLd } from "@/lib/structured-data";

import styles from "./page.module.css";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Só os artigos da lista existem; qualquer outro /blog/<algo> dá 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = findPost(posts, (await params).slug);
  if (!post) return {};
  const metadata = pageMetadata({ title: post.title, description: post.description, path: blogPostPath(post.slug) });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [blogAuthor],
      section: post.category,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = findPost(posts, (await params).slug);
  if (!post) notFound();

  const toc = tableOfContents(post.body);
  const related = relatedPosts(posts, post.slug);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />

      <article aria-labelledby="page-title">
        <header className={styles.header}>
          <div className="container">
            <Breadcrumbs
              trail={[
                { label: "Blog", href: "/blog" },
                { label: post.title, href: blogPostPath(post.slug) },
              ]}
            />
            <div className={styles.intro}>
              <p className={styles.category}>{post.category}</p>
              <h1 id="page-title" className={styles.title}>
                {post.title}
              </h1>
              <p className={styles.lead}>{post.description}</p>
              <p className={styles.meta}>
                <span className={styles.author}>
                  <LogoMark idPrefix="autor-artigo" className={styles.authorMark} />
                  {blogAuthor}
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span className={styles.reading}>
                  <Icon name="clock" className={styles.clock} />
                  {readingMinutes(post.body)} min de leitura
                </span>
              </p>
            </div>
          </div>
        </header>

        <div className={`container ${styles.cover}`}>
          <BlogCover icon={post.icon} category={post.category} size="lg" />
        </div>

        <div className={`container ${styles.layout}`}>
          <div className={styles.main}>
            <ArticleBody body={post.body} />
            <div className={styles.product}>
              <ButtonLink href={post.product.href} variant="text">
                {post.product.label}
              </ButtonLink>
            </div>
          </div>

          <aside className={styles.aside} aria-label="Índice e próximos passos">
            {toc.length > 0 && (
              <nav aria-labelledby="indice-title" className={styles.toc}>
                <p id="indice-title" className={styles.asideTitle}>
                  Neste artigo
                </p>
                <ol>
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{item.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className={styles.demo}>
              <p className={styles.demoTitle}>Veja na prática</p>
              <p>{closing.text}</p>
              <ButtonLink href={demoPath} size="sm">
                Agendar demonstração
              </ButtonLink>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <Section labelledBy="leia-tambem-title" tone="tint">
          <div className="container">
            <SectionHeader id="leia-tambem-title" eyebrow="Blog" title="Leia também" />
            <ul className={styles.related}>
              {related.map((item) => (
                <li key={item.slug}>
                  <PostCard post={item} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <CtaBand title={closing.title} text={closing.text} secondary={closing.secondary} />
    </>
  );
}
