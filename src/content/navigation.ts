/**
 * Menu do header: itens com painel (mega menu, com seções, ícones e um destaque à direita) e links simples.
 * Os textos saem do conteúdo de cada página para não divergir. O menu do celular usa a mesma lista.
 */
import type { IconName } from "@/components/ui/Icon";
import { blogPostPath, sortByNewest } from "@/lib/blog";

import { audiences, audiencesSection, type Audience } from "./audiences";
import { posts } from "./blog";
import { featurePath, features } from "./features";
import { chaosToFocus } from "./home";
import { photos } from "./photos";
import { routes } from "./routes";

export interface MenuLink {
  href: string;
  label: string;
  description: string;
  icon: IconName;
}

export interface MenuSection {
  title: string;
  links: MenuLink[];
  /** Colunas da lista no desktop. */
  columns?: 1 | 2;
}

export type PhotoKey = keyof typeof photos;

export interface MenuHighlight {
  /** Etiqueta curta acima do título, ex.: "Novo no blog". */
  badge?: string;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
  /** Foto do destaque; sem foto, o cartão mostra a capa ilustrada com o ícone. */
  photo?: PhotoKey;
  icon?: IconName;
}

export interface MenuGroup {
  kind: "menu";
  id: string;
  label: string;
  /** Prefixos de caminho que marcam o item como atual. */
  match: string[];
  sections: MenuSection[];
  highlight: MenuHighlight;
}

export interface MenuLinkItem {
  kind: "link";
  href: string;
  label: string;
  match: string[];
}

export type HeaderItem = MenuGroup | MenuLinkItem;

const audienceIcons: Record<Audience["id"], IconName> = {
  vendedores: "user",
  gestores: "seller",
  diretores: "chart",
};

const latestPost = sortByNewest(posts)[0];

export const headerMenu: readonly HeaderItem[] = [
  {
    kind: "menu",
    id: "produto",
    label: "Produto",
    match: ["/produto"],
    sections: [
      {
        title: "Funcionalidades",
        columns: 2,
        links: [
          {
            href: "/produto",
            label: "Visão geral",
            description: "Contatos, funil, atividades e indicadores ligados entre si.",
            icon: "grid",
          },
          ...features.map((feature) => ({
            href: featurePath(feature.slug),
            label: feature.name,
            description: feature.summary,
            icon: feature.icon,
          })),
        ],
      },
    ],
    highlight: {
      badge: "Interativo",
      title: "Do caos ao foco",
      text: chaosToFocus.lead,
      href: `/#${chaosToFocus.id}`,
      linkLabel: "Ver como funciona",
      photo: "onboarding",
    },
  },
  {
    kind: "menu",
    id: "para-quem",
    label: "Para quem",
    match: ["/para-quem"],
    sections: [
      {
        title: "Por papel",
        links: audiences.map((audience) => ({
          href: audience.href,
          // o nome da página no rodapé: "Vendedores", "Gestores comerciais", "Diretores"
          label: routes.find((route) => route.path === audience.href)?.label ?? audience.label,
          description: audience.title,
          icon: audienceIcons[audience.id],
        })),
      },
      {
        title: "Para a operação",
        links: [
          {
            href: "/produto/multiplas-lojas",
            label: "Várias lojas",
            description: "Cada loja com sua equipe e seu funil, e a visão de todas para quem decide.",
            icon: "store",
          },
          {
            href: "/seguranca",
            label: "Permissões e segurança",
            description: "Cada pessoa vê e edita só o que cabe ao seu papel e à sua loja.",
            icon: "shield",
          },
        ],
      },
    ],
    highlight: {
      title: audiencesSection.title,
      text: audiencesSection.lead,
      href: `/#${audiencesSection.id}`,
      linkLabel: "Comparar os papéis",
      photo: "manager",
    },
  },
  {
    kind: "menu",
    id: "recursos",
    label: "Recursos",
    match: ["/seguranca", "/implantacao", "/perguntas-frequentes", "/agendar-demonstracao"],
    sections: [
      {
        title: "Aprenda",
        links: [
          {
            href: "/blog",
            label: "Blog",
            description: "Artigos sobre funil, follow-up, indicadores e gestão comercial.",
            icon: "book",
          },
          {
            href: "/perguntas-frequentes",
            label: "Perguntas frequentes",
            description: "Respostas sobre o LOCKONS, do cadastro à segurança.",
            icon: "help",
          },
        ],
      },
      {
        title: "Comece",
        links: [
          {
            href: "/implantacao",
            label: "Implantação",
            description: "Da planilha ao CRM, com o resultado à vista antes de gravar.",
            icon: "upload",
          },
          {
            href: "/seguranca",
            label: "Segurança",
            description: "Permissões por papel e por loja, com histórico de alterações.",
            icon: "shield",
          },
          {
            href: "/agendar-demonstracao",
            label: "Agendar demonstração",
            description: "Veja o sistema com o processo de venda da sua equipe.",
            icon: "calendar",
          },
        ],
      },
    ],
    highlight: {
      badge: "Novo no blog",
      title: latestPost.title,
      text: latestPost.description,
      href: blogPostPath(latestPost.slug),
      linkLabel: "Ler o artigo",
      icon: latestPost.icon,
    },
  },
  { kind: "link", href: "/blog", label: "Blog", match: ["/blog"] },
];
