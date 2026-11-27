/**
 * Mapa único das páginas do site. Alimenta o rodapé e o sitemap.
 * `published: false` mantém a página fora do sitemap até ela existir;
 * cada subtarefa liga as páginas que entrega.
 */
export type RouteGroup = "home" | "product" | "audience" | "resources" | "legal";

export interface SiteRoute {
  path: string;
  label: string;
  group: RouteGroup;
  published: boolean;
}

export const routes: readonly SiteRoute[] = [
  { path: "/", label: "Início", group: "home", published: true },

  { path: "/produto", label: "Visão geral", group: "product", published: true },
  { path: "/produto/gestao-de-contatos", label: "Gestão de contatos", group: "product", published: true },
  { path: "/produto/funil-de-vendas", label: "Funil de vendas", group: "product", published: true },
  { path: "/produto/atividades-e-follow-up", label: "Atividades e follow-up", group: "product", published: true },
  { path: "/produto/indicadores-de-vendas", label: "Indicadores de vendas", group: "product", published: true },
  { path: "/produto/multiplas-lojas", label: "Múltiplas lojas", group: "product", published: true },

  { path: "/para-quem/vendedores", label: "Vendedores", group: "audience", published: true },
  { path: "/para-quem/gestores-comerciais", label: "Gestores comerciais", group: "audience", published: true },
  { path: "/para-quem/diretores", label: "Diretores", group: "audience", published: true },

  { path: "/seguranca", label: "Segurança", group: "resources", published: true },
  { path: "/implantacao", label: "Implantação", group: "resources", published: true },
  { path: "/perguntas-frequentes", label: "Perguntas frequentes", group: "resources", published: true },
  { path: "/blog", label: "Blog", group: "resources", published: true },
  { path: "/agendar-demonstracao", label: "Agendar demonstração", group: "resources", published: true },

  // Legais: fora do sitemap (e com noindex) até o jurídico entregar o texto; ver src/content/legal.ts.
  { path: "/privacidade", label: "Privacidade", group: "legal", published: false },
  { path: "/termos", label: "Termos de uso", group: "legal", published: false },
];

export function routesIn(group: RouteGroup): SiteRoute[] {
  return routes.filter((route) => route.group === group);
}

export interface NavItem {
  href: string;
  label: string;
  /** Prefixo de caminho que marca o item como atual, quando o href não serve (ex.: âncora). */
  match?: string;
}

/** Itens do header. "Para quem" aponta para a seção da home que liga às três páginas de papel. */
export const mainNav: readonly NavItem[] = [
  { href: "/produto", label: "Produto" },
  { href: "/#para-quem", label: "Para quem", match: "/para-quem" },
  { href: "/perguntas-frequentes", label: "Perguntas" },
];

export const footerColumns: readonly { title: string; group: RouteGroup }[] = [
  { title: "Produto", group: "product" },
  { title: "Para quem", group: "audience" },
  { title: "Recursos", group: "resources" },
  { title: "Legal", group: "legal" },
];

export const demoPath = "/agendar-demonstracao";
