/**
 * Regras do blog, sem dependência de framework (testadas em tests/blog.test.ts com `npm test`).
 * Só importa tipos: o Node roda este arquivo direto, apagando as anotações.
 */
import type { BlogBlock, BlogPost } from "@/content/blog";

/** Velocidade média de leitura em português, em palavras por minuto. */
export const WORDS_PER_MINUTE = 200;

export function blogPostPath(slug: string): string {
  return `/blog/${slug}`;
}

function blockWords(block: BlogBlock): string {
  if (block.type === "list") return block.items.join(" ");
  if (block.type === "tip") return `${block.title} ${block.text}`;
  return block.text;
}

/** O artigo de um endereço, ou undefined (a página dá 404). */
export function findPost(list: readonly BlogPost[], slug: string): BlogPost | undefined {
  return list.find((post) => post.slug === slug);
}

/** Minutos de leitura do corpo do artigo, arredondados para cima; no mínimo 1. */
export function readingMinutes(body: readonly BlogBlock[]): number {
  const words = body
    .map(blockWords)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Mais recentes primeiro; na mesma data, mantém a ordem do arquivo de conteúdo. */
export function sortByNewest(list: readonly BlogPost[]): BlogPost[] {
  return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/**
 * Outros artigos para o fim de um artigo: primeiro os da mesma categoria, depois os demais,
 * cada grupo do mais recente para o mais antigo. Nunca inclui o próprio artigo.
 */
export function relatedPosts(list: readonly BlogPost[], slug: string, limit = 3): BlogPost[] {
  const current = list.find((post) => post.slug === slug);
  const others = sortByNewest(list.filter((post) => post.slug !== slug));
  if (!current) return others.slice(0, limit);
  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  // A data é um dia do calendário, não um instante: em UTC ela não "volta" um dia no fuso do Brasil.
  timeZone: "UTC",
});

/** "2026-11-22" → "22 de novembro de 2026". */
export function formatPostDate(isoDate: string): string {
  return dateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}

/** Âncora de um subtítulo: "Funil por etapa: onde está?" → "funil-por-etapa-onde-esta". */
export function headingId(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Subtítulos do artigo, para o índice "Neste artigo". */
export function tableOfContents(body: readonly BlogBlock[]): { id: string; text: string }[] {
  return body.flatMap((block) => (block.type === "h2" ? [{ id: headingId(block.text), text: block.text }] : []));
}
