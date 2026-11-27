/**
 * Texto das imagens de compartilhamento (WhatsApp, LinkedIn etc.): o selo e o título de cada página,
 * tirados do próprio conteúdo dela para não divergir. Página nova entra aqui junto com a rota.
 */
import { blogPostPath } from "@/lib/blog";

import { audiences } from "./audiences";
import { blogPage, posts } from "./blog";
import { demoPage } from "./demo";
import { featurePath, features, productPage } from "./features";
import { hero as homeHero } from "./home";
import { privacyPage, termsPage } from "./legal";
import { faqPage, onboardingPage, securityPage } from "./resources";

export interface OgEntry {
  path: string;
  eyebrow: string;
  title: string;
}

export const ogEntries: OgEntry[] = [
  { path: "/", eyebrow: homeHero.eyebrow, title: `${homeHero.titleStart} ${homeHero.titleHighlight}` },
  { path: "/produto", eyebrow: productPage.hero.eyebrow, title: productPage.hero.title },
  ...features.map((feature) => ({ path: featurePath(feature.slug), eyebrow: feature.name, title: feature.hero.title })),
  ...audiences.map((audience) => ({ path: audience.href, eyebrow: audience.page.hero.eyebrow, title: audience.page.hero.title })),
  { path: "/seguranca", eyebrow: securityPage.hero.eyebrow, title: securityPage.hero.title },
  { path: "/implantacao", eyebrow: onboardingPage.hero.eyebrow, title: onboardingPage.hero.title },
  { path: "/perguntas-frequentes", eyebrow: faqPage.hero.eyebrow, title: faqPage.hero.title },
  { path: "/agendar-demonstracao", eyebrow: demoPage.hero.eyebrow, title: demoPage.hero.title },
  { path: "/blog", eyebrow: blogPage.hero.eyebrow, title: blogPage.hero.title },
  ...posts.map((post) => ({ path: blogPostPath(post.slug), eyebrow: post.category, title: post.title })),
  { path: privacyPage.path, eyebrow: "Documentos", title: privacyPage.title },
  { path: termsPage.path, eyebrow: "Documentos", title: termsPage.title },
];
