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
        logo: absoluteUrl("/icon.svg"),
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
