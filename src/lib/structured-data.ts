import type { BlogPost } from "@/content/blog";

import { blogPostPath } from "./blog";
import { ogImagePath } from "./og";
import { absoluteUrl, site } from "./site";

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

/** Organization e WebSite: vão em todas as páginas, pelo layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.name,
        url: absoluteUrl("/"),
        // PNG quadrado: o formato mais seguro para o Google mostrar o logo (public/logo.png)
        logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 512, height: 512 },
        slogan: site.slogan,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: absoluteUrl("/"),
        inLanguage: "pt-BR",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

/**
 * O produto, para a home e a página de produto. Sem preço nem avaliação: ainda não existem,
 * e o Google penaliza dado estruturado que não aparece na página.
 */
export function softwareApplication(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    url: absoluteUrl("/"),
    description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM",
    operatingSystem: "Web",
    inLanguage: "pt-BR",
    publisher: { "@id": organizationId },
    featureList: [
      "Gestão de contatos e empresas",
      "Funil de vendas",
      "Atividades e lembretes",
      "Indicadores de vendas",
      "Múltiplas lojas",
      "Permissões por papel",
    ],
  };
}

/** A listagem /blog: o Blog e os artigos dele. */
export function blogJsonLd(description: string, list: readonly BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: `Blog ${site.name}`,
    url: absoluteUrl("/blog"),
    description,
    inLanguage: "pt-BR",
    publisher: { "@id": organizationId },
    blogPost: list.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(blogPostPath(post.slug)),
      datePublished: post.publishedAt,
    })),
  };
}

/** Um artigo. Autor e editora são a própria empresa: os textos são assinados pela equipe. */
export function blogPostingJsonLd(post: BlogPost) {
  const url = absoluteUrl(blogPostPath(post.slug));
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(ogImagePath(blogPostPath(post.slug))),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    articleSection: post.category,
    inLanguage: "pt-BR",
    // autor e editora por extenso: o Google pede tipo e nome no próprio artigo
    author: { "@type": "Organization", "@id": organizationId, name: site.name, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
  };
}
