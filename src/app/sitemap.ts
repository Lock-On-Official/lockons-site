import type { MetadataRoute } from "next";

import { posts } from "@/content/blog";
import { routes } from "@/content/routes";
import { blogPostPath } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

// Sem lastModified: data errada (ex.: a do build em toda página) faz o Google ignorar o campo.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.filter((route) => route.published).map((route) => ({ url: absoluteUrl(route.path) }));
  // Os artigos saem da lista do blog: artigo novo entra no sitemap sem mexer aqui.
  const articles = posts.map((post) => ({ url: absoluteUrl(blogPostPath(post.slug)) }));
  return [...pages, ...articles];
}
