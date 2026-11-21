/**
 * Os três papéis do sistema (seller, manager e admin no crm-lockon), com o nome que o visitante reconhece.
 * Usado na seção "Para quem" da home e nas páginas /para-quem/<slug>.
 * Permissões conferidas com o CLAUDE.md e o docs/escopo-mvp.md do crm-lockon: revise ao mudar as regras.
 */
import type { IconName } from "@/components/ui/Icon";

import type { FaqItem } from "./faq";
import type { FeatureSlug } from "./features";

export type AudienceSlug = "vendedores" | "gestores-comerciais" | "diretores";

export interface Audience {
  id: "vendedores" | "gestores" | "diretores";
  slug: AudienceSlug;
  label: string;
  /** Resumo usado na aba da home e nos cartões. */
  title: string;
  text: string;
  bullets: string[];
  href: string;
  linkLabel: string;
  page: {
    seo: { title: string; description: string };
    hero: { eyebrow: string; title: string; sub: string };
    /** Rotina em ordem: a numeração dos passos é informação. */
    day: { title: string; lead: string; steps: { when: string; text: string }[] };
    sees: { eyebrow: string; title: string; text: string; bullets: string[] };
    permissions: {
      title: string;
      lead: string;
      can: string[];
      otherTitle: string;
      other: string[];
      /** "cannot": o que o papel não faz; "logged": o que fica registrado. */
      otherKind: "cannot" | "logged";
    };
    features: { slugs: FeatureSlug[]; extra?: { icon: IconName; title: string; text: string; href: string; linkLabel: string } };
    faq: FaqItem[];
    closingText: string;
  };
}

export const audiencesSection = {
  id: "para-quem",
  eyebrow: "Para quem",
  title: "Cada papel vê o que precisa",
  lead: "Os mesmos dados, recortados para quem vende, quem acompanha e quem decide.",
};

export const audiences: readonly Audience[] = [
  {
    id: "vendedores",
    slug: "vendedores",
    label: "Vendedor",
    title: "Sua carteira e seus lembretes do dia",
    text: "O vendedor abre o LOCKONS e já sabe com quem falar primeiro: as oportunidades dele, o que vence hoje e o histórico de cada cliente.",
    bullets: [
      "Vê os contatos e as oportunidades das lojas em que trabalha",
      "Recebe alerta das atividades vencidas",
      "Edita só os registros que são dele",
    ],
    href: "/para-quem/vendedores",
    linkLabel: "LOCKONS para vendedores",
    page: {
      seo: {
        title: "CRM para vendedores: carteira e follow-up do dia",
        description:
          "O vendedor abre o LOCKONS e sabe com quem falar primeiro: as oportunidades dele, as atividades que vencem hoje e o histórico de cada cliente.",
      },
      hero: {
        eyebrow: "Para vendedores",
        title: "Sua carteira e seus lembretes do dia, num lugar só",
        sub: "O LOCKONS mostra com quem falar primeiro, o que vence hoje e tudo o que já foi conversado com cada cliente.",
      },
      day: {
        title: "Um dia de vendedor com o LOCKONS",
        lead: "Do primeiro café ao fechamento, o CRM acompanha o que o vendedor já faz.",
        steps: [
          { when: "Início do dia", text: "Abre a lista de atividades e vê primeiro o que venceu." },
          { when: "Antes de ligar", text: "Busca o cliente pelo nome ou telefone e lê o histórico." },
          { when: "Depois da conversa", text: "Registra a atividade e agenda o próximo passo." },
          { when: "Ao fechar ou perder", text: "Move a oportunidade e, se perdeu, escolhe o motivo." },
        ],
      },
      sees: {
        eyebrow: "O que o vendedor vê",
        title: "Sua lista do dia, sem procurar",
        text: "As atividades aparecem em ordem, com o que venceu em destaque, e cada uma leva ao cliente e à oportunidade certos.",
        bullets: ["Atividades de hoje e as vencidas", "Histórico completo de cada cliente", "Os próprios números do mês"],
      },
      permissions: {
        title: "O que o vendedor pode fazer",
        lead: "As permissões vêm do papel de cada pessoa: o vendedor cuida do que é dele.",
        can: [
          "Ver contatos e oportunidades das lojas em que trabalha",
          "Cadastrar contatos e oportunidades, sempre como dono",
          "Editar e excluir os próprios registros",
          "Colocar e tirar etiquetas dos contatos que vê",
          "Registrar atividades e ver os próprios indicadores",
        ],
        otherTitle: "O que fica com o gestor",
        other: [
          "Editar ou excluir o que é de outro vendedor",
          "Criar oportunidade em nome de outra pessoa",
          "Exportar dados para o Excel",
          "Ver os indicadores por pessoa dos colegas",
          "Dar desconto acima do limite definido pela empresa",
        ],
        otherKind: "cannot",
      },
      features: { slugs: ["atividades-e-follow-up", "gestao-de-contatos", "funil-de-vendas"] },
      faq: [
        {
          question: "O vendedor vê os clientes de outros vendedores?",
          answer:
            "Vê os contatos e as oportunidades das lojas em que trabalha, para atender qualquer cliente da loja, mas só edita e exclui o que é dele.",
        },
        {
          question: "Preciso preencher o CPF de todo cliente?",
          answer: "Não. O CPF é opcional e nunca impede o cadastro, a oportunidade ou a venda.",
        },
        {
          question: "Como fico sabendo de uma atividade atrasada?",
          answer:
            "O alerta aparece no próprio LOCKONS. O lembrete por e-mail também existe e chega quando o envio estiver configurado pela empresa.",
        },
      ],
      closingText: "Veja como fica o dia do vendedor numa demonstração guiada.",
    },
  },
  {
    id: "gestores",
    slug: "gestores-comerciais",
    label: "Gestor",
    title: "O funil das lojas que você acompanha",
    text: "O gestor comercial acompanha a equipe sem pedir relatório: conversão, perdas e atividades de cada pessoa, das lojas sob a responsabilidade dele.",
    bullets: [
      "Conversão e perdas por motivo das suas lojas",
      "Atividades por pessoa da equipe",
      "Passa uma oportunidade para outro vendedor e exporta para o Excel",
    ],
    href: "/para-quem/gestores-comerciais",
    linkLabel: "LOCKONS para gestores comerciais",
    page: {
      seo: {
        title: "CRM para gestores comerciais: funil da equipe",
        description:
          "Acompanhe conversão, perdas por motivo e atividades de cada vendedor nas lojas sob sua gestão, sem pedir relatório. CRM para gestão comercial.",
      },
      hero: {
        eyebrow: "Para gestores comerciais",
        title: "O funil da sua equipe, sem pedir relatório",
        sub: "Conversão, perdas por motivo e atividades de cada vendedor das lojas que você acompanha, sempre atualizados.",
      },
      day: {
        title: "Uma semana de gestor com o LOCKONS",
        lead: "Os números chegam prontos para a conversa com a equipe.",
        steps: [
          { when: "Segunda de manhã", text: "Abre o funil das lojas e vê onde as oportunidades pararam." },
          { when: "Na reunião de vendas", text: "Usa conversão e perdas por motivo para orientar a equipe." },
          { when: "Durante a semana", text: "Acompanha as atividades de cada vendedor e redistribui o que está parado." },
          { when: "No fim do mês", text: "Exporta os dados para o Excel quando precisa de um relatório à parte." },
        ],
      },
      sees: {
        eyebrow: "O que o gestor vê",
        title: "A equipe inteira em uma tela",
        text: "Conversão, funil e perdas por motivo das lojas que você acompanha, com o resultado de cada vendedor.",
        bullets: ["Indicadores por pessoa da equipe", "Perdas por motivo para orientar a conversa", "Os mesmos filtros do funil"],
      },
      permissions: {
        title: "O que o gestor pode fazer",
        lead: "O gestor cuida da equipe das lojas liberadas para ele.",
        can: [
          "Ver as lojas liberadas para ele",
          "Editar e excluir registros da equipe",
          "Criar oportunidades em nome de um vendedor",
          "Criar e organizar as etiquetas",
          "Exportar dados em CSV e ver os indicadores da equipe",
        ],
        otherTitle: "O que fica com o diretor",
        other: [
          "Ver lojas que não foram liberadas para ele",
          "Cadastrar lojas e definir quem trabalha em cada uma",
          "Consultar o histórico de alterações",
        ],
        otherKind: "cannot",
      },
      features: { slugs: ["indicadores-de-vendas", "funil-de-vendas", "atividades-e-follow-up"] },
      faq: [
        {
          question: "O gestor pode passar uma oportunidade para outro vendedor?",
          answer:
            "Sim. O gestor e o diretor podem criar oportunidades em nome de um vendedor da equipe e definir quem é o responsável por elas.",
        },
        {
          question: "O gestor vê todas as lojas?",
          answer: "Vê as lojas liberadas para ele. Quem define isso é o diretor.",
        },
        {
          question: "Dá para exportar os dados da equipe?",
          answer: "Sim. Gestores e diretores exportam os dados em CSV, que abre no Excel em português.",
        },
      ],
      closingText: "Veja o painel da sua equipe numa demonstração guiada.",
    },
  },
  {
    id: "diretores",
    slug: "diretores",
    label: "Diretor",
    title: "Todas as lojas, num painel só",
    text: "O diretor enxerga a operação inteira: o funil de todas as lojas, o valor ganho por vendedor e quem alterou o quê.",
    bullets: [
      "Indicadores de todas as lojas",
      "Cadastra lojas e define quem trabalha em cada uma",
      "Consulta o histórico de alterações",
    ],
    href: "/para-quem/diretores",
    linkLabel: "LOCKONS para diretores",
    page: {
      seo: {
        title: "CRM para diretores: todas as lojas num painel",
        description:
          "Indicadores de todas as lojas, valor ganho por vendedor e histórico de quem alterou o quê. A visão completa da operação comercial no LOCKONS.",
      },
      hero: {
        eyebrow: "Para diretores",
        title: "Todas as lojas, num painel só",
        sub: "A operação comercial inteira: funil e valor ganho de cada loja e vendedor, com o histórico de quem alterou o quê.",
      },
      day: {
        title: "A rotina do diretor com o LOCKONS",
        lead: "Da implantação à decisão, com os mesmos critérios para a rede inteira.",
        steps: [
          { when: "Na implantação", text: "Cadastra as lojas, define quem trabalha em cada uma e a lista de motivos de perda." },
          { when: "Toda semana", text: "Acompanha funil e valor ganho de todas as lojas num painel só." },
          { when: "Quando algo não bate", text: "Consulta o histórico para saber quem alterou o quê e quando." },
          { when: "Na hora de decidir", text: "Usa os indicadores da rede para decidir onde reforçar a equipe." },
        ],
      },
      sees: {
        eyebrow: "O que o diretor vê",
        title: "Todas as lojas lado a lado",
        text: "Equipe, oportunidades abertas e valor ganho de cada loja, e o total da rede, sem juntar planilhas.",
        bullets: ["Visão de todas as lojas", "Valor ganho por vendedor", "Histórico de alterações dos últimos 12 meses"],
      },
      permissions: {
        title: "O que o diretor pode fazer",
        lead: "O diretor tem a visão completa e define as regras que valem para a rede.",
        can: [
          "Ver todas as lojas e todos os indicadores",
          "Cadastrar lojas e definir quem trabalha em cada uma",
          "Definir a lista de motivos de perda",
          "Editar ou excluir qualquer registro",
          "Consultar o histórico de alterações",
        ],
        otherTitle: "O que fica registrado",
        other: [
          "Alterações nos registros",
          "Acessos ao sistema",
          "Exportações e importações",
          "Vínculos entre pessoas e lojas",
          "Tudo guardado por 12 meses",
        ],
        otherKind: "logged",
      },
      features: {
        slugs: ["multiplas-lojas", "indicadores-de-vendas"],
        extra: {
          icon: "shield",
          title: "Segurança e permissões",
          text: "Quem vê e quem edita cada registro, e o histórico de quem alterou o quê.",
          href: "/seguranca",
          linkLabel: "Ver segurança e permissões",
        },
      },
      faq: [
        {
          question: "O que fica registrado no histórico de alterações?",
          answer:
            "As alterações nos registros, os acessos ao sistema, as exportações, as importações e os vínculos entre pessoas e lojas, guardados por 12 meses. Só o diretor consulta.",
        },
        {
          question: "Quem cadastra as lojas?",
          answer: "O diretor, que também define quem trabalha em cada uma e o que cada gestor acompanha.",
        },
        {
          question: "Os motivos de perda são iguais para todas as lojas?",
          answer:
            "Sim. A lista é definida pelo diretor e vale para a rede inteira, o que deixa as perdas comparáveis entre lojas e vendedores.",
        },
      ],
      closingText: "Veja a operação de todas as suas lojas numa demonstração guiada.",
    },
  },
];

export function getAudience(slug: string): Audience | undefined {
  return audiences.find((audience) => audience.slug === slug);
}
