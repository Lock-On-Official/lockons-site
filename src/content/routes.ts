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

  { path: "/produto", label: "Visão geral", group: "product", published: false },
  { path: "/produto/gestao-de-contatos", label: "Gestão de contatos", group: "product", published: false },
  { path: "/produto/funil-de-vendas", label: "Funil de vendas", group: "product", published: false },
  { path: "/produto/atividades-e-follow-up", label: "Atividades e follow-up", group: "product", published: false },
  { path: "/produto/indicadores-de-vendas", label: "Indicadores de vendas", group: "product", published: false },
  { path: "/produto/multiplas-lojas", label: "Múltiplas lojas", group: "product", published: false },

  { path: "/para-quem/vendedores", label: "Vendedores", group: "audience", published: false },
  { path: "/para-quem/gestores-comerciais", label: "Gestores comerciais", group: "audience", published: false },
  { path: "/para-quem/diretores", label: "Diretores", group: "audience", published: false },

  { path: "/seguranca", label: "Segurança", group: "resources", published: false },
  { path: "/implantacao", label: "Implantação", group: "resources", published: false },
  { path: "/perguntas-frequentes", label: "Perguntas frequentes", group: "resources", published: false },
  { path: "/agendar-demonstracao", label: "Agendar demonstração", group: "resources", published: false },

  { path: "/privacidade", label: "Privacidade", group: "legal", published: false },
  { path: "/termos", label: "Termos de uso", group: "legal", published: false },
];

export function routesIn(group: RouteGroup): SiteRoute[] {
  return routes.filter((route) => route.group === group);
}

export interface NavItem {
  href: string;
  label: string;
}

/** Itens do header. "Para quem" aponta para a seção da home que liga às três páginas de papel. */
export const mainNav: readonly NavItem[] = [
  { href: "/produto", label: "Produto" },
  { href: "/#para-quem", label: "Para quem" },
  { href: "/perguntas-frequentes", label: "Perguntas" },
];

export const footerColumns: readonly { title: string; group: RouteGroup }[] = [
  { title: "Produto", group: "product" },
  { title: "Para quem", group: "audience" },
  { title: "Recursos", group: "resources" },
  { title: "Legal", group: "legal" },
];

export const demoPath = "/agendar-demonstracao";
