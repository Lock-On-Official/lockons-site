import type { Metadata } from "next";
import { site } from "./site";

interface PageSeo {
  /** Sem o sufixo "| LOCKONS": o template do layout acrescenta. Vazio na home. */
  title?: string;
  description: string;
  /** Caminho a partir da raiz, ex.: "/produto/funil-de-vendas". */
  path: string;
}

/**
 * Metadados de uma página. Cada página declara o próprio canonical: herdar o do layout
 * apontaria todas as páginas para a home.
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const socialTitle = title ? `${title} | ${site.name}` : site.defaultTitle;

  return {
    // `title: undefined` apaga o título padrão do layout; sem título, a página usa o completo.
    title: title ?? { absolute: site.defaultTitle },
    description,
    alternates: { canonical: path },
    // O Next não mescla openGraph entre layout e página: o objeto vai completo aqui.
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
