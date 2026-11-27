import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/cta-band/CtaBand";
import { BlogVisual } from "@/components/hero-visuals/BlogVisual";
import { PageHero } from "@/components/page-hero/PageHero";
import { Section } from "@/components/section/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPage, posts } from "@/content/blog";
import { closing } from "@/content/home";
import { sortByNewest } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { blogJsonLd } from "@/lib/structured-data";

import styles from "./page.module.css";

export const metadata = pageMetadata({ ...blogPage.seo, path: "/blog" });

/** Listagem do blog: o artigo mais recente em destaque e os demais em grade. */
export default function BlogPage() {
  const [featured, ...others] = sortByNewest(posts);

  return (
    <>
      <JsonLd data={blogJsonLd(blogPage.seo.description, posts)} />

      <PageHero
        trail={[{ label: "Blog", href: "/blog" }]}
        eyebrow={blogPage.hero.eyebrow}
        eyebrowId="eyebrow-blog"
        title={blogPage.hero.title}
        sub={blogPage.hero.sub}
        secondary={{ label: "Ver os artigos", href: "#artigos" }}
        visual={<BlogVisual />}
      />

      <Section id="artigos" labelledBy="artigos-title" tone="tint">
        <div className="container">
          <h2 id="artigos-title" className="visually-hidden">
            {blogPage.listTitle}
          </h2>
          {featured && <PostCard post={featured} variant="featured" />}
          {others.length > 0 && (
            <ul className={styles.grid}>
              {others.map((post) => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <CtaBand title={closing.title} text={closing.text} secondary={closing.secondary} />
    </>
  );
}
