/**
 * Página Produto e páginas de funcionalidade (/produto/<slug>).
 * Textos conferidos com docs/escopo-mvp.md do crm-lockon. As buscas-alvo de cada título são hipóteses:
 * valide no Google Keyword Planner ou no Search Console antes de mexer.
 */
import type { IconName } from "@/components/ui/Icon";

import type { FaqItem } from "./faq";

export type FeatureSlug =
  | "gestao-de-contatos"
  | "funil-de-vendas"
  | "atividades-e-follow-up"
  | "indicadores-de-vendas"
  | "multiplas-lojas";

export interface Benefit {
  icon: IconName;
  title: string;
  text: string;
}

export interface Feature {
  slug: FeatureSlug;
  /** Nome curto: trilha de navegação, rodapé e cartões. */
  name: string;
  icon: IconName;
  /** Resumo de uma frase para os cartões que apontam para a página. */
  summary: string;
  seo: { title: string; description: string };
  hero: { title: string; sub: string };
  how: { eyebrow: string; title: string; text: string; bullets: string[] };
  benefits: { title: string; lead: string; items: Benefit[] };
  faq: FaqItem[];
  related: FeatureSlug[];
  closingText: string;
}

export const features: readonly Feature[] = [
  {
    slug: "gestao-de-contatos",
    name: "Gestão de contatos",
    icon: "building",
    summary: "Pessoas e empresas num cadastro só, com busca por nome, telefone ou CPF.",
    seo: {
      title: "Gestão de contatos e cadastro de clientes",
      description:
        "Cadastre pessoas e empresas, encontre o cliente pelo nome, telefone ou CPF e veja o histórico de cada um. Gestão de contatos no CRM LOCKONS.",
    },
    hero: {
      title: "Todos os seus clientes num cadastro só, fácil de achar",
      sub: "Pessoas e empresas com o histórico de cada contato, etiquetas e campos do seu negócio. A busca encontra o cliente pelo nome, telefone ou CPF.",
    },
    how: {
      eyebrow: "Como funciona",
      title: "Encontre o cliente certo antes de ligar",
      text: "Digite parte do nome, do telefone ou do documento. A busca ignora acentos, compara telefones só pelos números e mostra apenas as lojas que cada pessoa pode ver.",
      bullets: [
        "“jose” encontra “José”",
        "Telefone com ou sem traço, parênteses e espaço",
        "CPF e CNPJ conferidos na hora de cadastrar",
      ],
    },
    benefits: {
      title: "O que muda no dia a dia",
      lead: "O cadastro deixa de ser uma planilha que cada um preenche de um jeito.",
      items: [
        {
          icon: "tag",
          title: "Etiquetas para separar a base",
          text: "Clientes, leads e indicações separados por etiquetas que o gestor define e que a equipe aplica.",
        },
        {
          icon: "building",
          title: "Pessoa ligada à empresa",
          text: "Cada contato pode ser ligado à empresa em que trabalha, e as empresas aparecem para todas as lojas.",
        },
        {
          icon: "history",
          title: "Linha do tempo do cliente",
          text: "Ligações, visitas, propostas e mudanças em ordem, com quem fez e quando.",
        },
        {
          icon: "shield",
          title: "CPF sem burocracia",
          text: "O CPF é opcional e nunca trava o cadastro. Se ele já existir, o sistema avisa e mostra o contato que tem o número.",
        },
      ],
    },
    faq: [
      {
        question: "A busca diferencia acentos e a formatação do telefone?",
        answer:
          "Não. “jose” encontra “José”, e o telefone é comparado só pelos números, com ou sem parênteses, traço ou espaço. CPF e CNPJ são buscados pelo número exato.",
      },
      {
        question: "O que acontece se eu cadastrar um CPF que já existe?",
        answer:
          "O sistema avisa que o documento já pertence a um contato ativo e mostra qual é, para não nascer um cadastro duplicado. CPF com dígito verificador errado também é recusado.",
      },
      {
        question: "Posso guardar informações específicas do meu negócio?",
        answer: "Sim. Contatos e oportunidades aceitam campos personalizados, definidos para a sua empresa.",
      },
      {
        question: "Consigo importar e exportar os contatos?",
        answer:
          "Sim. A importação lê CSV, mostra uma simulação antes de gravar e pula os repetidos. A exportação gera um CSV que abre no Excel em português e fica disponível para gestores e diretores.",
      },
    ],
    related: ["funil-de-vendas", "atividades-e-follow-up", "multiplas-lojas"],
    closingText: "Veja a gestão de contatos com a base da sua equipe numa demonstração guiada.",
  },
  {
    slug: "funil-de-vendas",
    name: "Funil de vendas",
    icon: "funnel",
    summary: "Cada oportunidade na etapa certa, com valor, dono e motivo de perda.",
    seo: {
      title: "Funil de vendas: acompanhe cada oportunidade",
      description:
        "Organize as oportunidades por etapa, com valor, dono e próximo passo, e registre o motivo de cada venda perdida no funil de vendas do LOCKONS.",
    },
    hero: {
      title: "Cada oportunidade na etapa certa, com valor e dono",
      sub: "Veja o funil inteiro de relance, saiba o que falta para fechar cada venda e entenda por que as perdidas se perderam.",
    },
    how: {
      eyebrow: "Como funciona",
      title: "Do primeiro contato ao fechamento",
      text: "Cada oportunidade nasce ligada a um contato, a uma loja e a um vendedor responsável, e anda pelas etapas do funil até ser ganha ou perdida.",
      bullets: [
        "Valor somado por etapa",
        "Oportunidade nunca nasce numa etapa já fechada",
        "Data de fechamento gravada ao ganhar ou perder",
      ],
    },
    benefits: {
      title: "O que muda no dia a dia",
      lead: "O funil para de morar na cabeça de cada vendedor.",
      items: [
        {
          icon: "seller",
          title: "Um dono para cada venda",
          text: "O vendedor é o dono do que cria. O gestor e o diretor podem passar a oportunidade para outra pessoa da equipe.",
        },
        {
          icon: "trendDown",
          title: "Motivo de perda obrigatório",
          text: "Ao perder uma venda, o vendedor escolhe o motivo numa lista definida pela empresa, e os motivos viram indicador.",
        },
        {
          icon: "funnel",
          title: "Orçamento dentro da oportunidade",
          text: "Itens, desconto e frete montados na própria oportunidade. O total vira o valor dela no funil.",
        },
        {
          icon: "search",
          title: "Filtros e busca",
          text: "Encontre oportunidades por etapa, vendedor ou cliente, sempre dentro das lojas que você pode ver.",
        },
      ],
    },
    faq: [
      {
        question: "Por que o motivo de perda é obrigatório?",
        answer:
          "Porque é ele que mostra onde o processo falha. Os motivos vêm de uma lista definida pelo diretor, então o indicador de perdas compara a mesma coisa entre vendedores e lojas.",
      },
      {
        question: "Quem pode mudar o dono de uma oportunidade?",
        answer: "O gestor e o diretor. O vendedor é sempre o dono do que cria e edita só o que é dele.",
      },
      {
        question: "Como o valor da oportunidade é calculado?",
        answer:
          "Pelo orçamento ligado a ela: itens, desconto e frete somam o total, e esse total vira o valor no funil. O desconto de cada vendedor respeita o limite definido pela empresa.",
      },
    ],
    related: ["gestao-de-contatos", "atividades-e-follow-up", "indicadores-de-vendas"],
    closingText: "Veja o funil de vendas montado com o processo da sua equipe numa demonstração guiada.",
  },
  {
    slug: "atividades-e-follow-up",
    name: "Atividades e follow-up",
    icon: "calendar",
    summary: "Ligações, visitas e propostas agendadas, com alerta do que venceu.",
    seo: {
      title: "Atividades e follow-up de vendas",
      description:
        "Agende ligações, visitas e propostas na oportunidade certa e receba o alerta do que venceu. Follow-up de vendas sem esquecer nenhum retorno.",
    },
    hero: {
      title: "Nenhum retorno esquecido, nenhum cliente esperando",
      sub: "Ligações, visitas e propostas agendadas na oportunidade certa, com alerta do que vence e o histórico do que já foi feito.",
    },
    how: {
      eyebrow: "Como funciona",
      title: "A agenda do vendedor dentro do CRM",
      text: "Cada atividade fica ligada ao cliente e à oportunidade. O vendedor abre o dia com a lista do que precisa fazer, e o que passou do prazo aparece em destaque.",
      bullets: [
        "Alertas no próprio sistema",
        "Lembrete por e-mail, quando o envio estiver configurado",
        "Atividade feita entra na linha do tempo do cliente",
      ],
    },
    benefits: {
      title: "O que muda no dia a dia",
      lead: "O follow-up deixa de depender da memória de cada um.",
      items: [
        {
          icon: "bell",
          title: "Alerta do que venceu",
          text: "Atividade vencida aparece em destaque para quem é responsável por ela.",
        },
        {
          icon: "calendar",
          title: "Próximo passo à vista",
          text: "Ligação, visita ou proposta fica agendada na oportunidade, e a equipe vê o que vem a seguir.",
        },
        {
          icon: "history",
          title: "Histórico automático",
          text: "O que foi feito entra na linha do tempo do cliente, com data e autor.",
        },
        {
          icon: "seller",
          title: "Atividades por pessoa",
          text: "O gestor vê quantas atividades cada vendedor registrou, no painel de indicadores.",
        },
      ],
    },
    faq: [
      {
        question: "Como o sistema avisa sobre atividades atrasadas?",
        answer:
          "Com alertas dentro do próprio LOCKONS, atualizados enquanto a pessoa usa o sistema. O lembrete por e-mail também existe e é ligado quando o servidor de e-mail da empresa estiver configurado.",
      },
      {
        question: "O gestor consegue ver as atividades da equipe?",
        answer:
          "Sim. O painel mostra as atividades por pessoa, das lojas que o gestor acompanha. O vendedor vê apenas a própria linha.",
      },
      {
        question: "As atividades ficam no histórico do cliente?",
        answer:
          "Sim. A linha do tempo do contato reúne as atividades e as mudanças importantes, como a troca de etapa de uma oportunidade.",
      },
    ],
    related: ["funil-de-vendas", "indicadores-de-vendas", "gestao-de-contatos"],
    closingText: "Veja como o follow-up fica organizado numa demonstração guiada.",
  },
  {
    slug: "indicadores-de-vendas",
    name: "Indicadores de vendas",
    icon: "percent",
    summary: "Funil, conversão, perdas por motivo e resultado de cada vendedor.",
    seo: {
      title: "Indicadores de vendas: funil, conversão e perdas",
      description:
        "Acompanhe funil por etapa, taxa de conversão, perdas por motivo e resultado por vendedor, com os números do que a equipe registra no dia a dia.",
    },
    hero: {
      title: "Os números da equipe, sem montar planilha",
      sub: "Funil por etapa, conversão, perdas por motivo e resultado por vendedor, calculados a partir do que a equipe registra no dia a dia.",
    },
    how: {
      eyebrow: "Como funciona",
      title: "Um painel para cada papel",
      text: "Os indicadores respeitam as lojas que cada pessoa pode ver. O diretor enxerga a empresa inteira; o gestor, as lojas dele; o vendedor, os próprios números.",
      bullets: [
        "Calculados na hora em que você abre o painel",
        "Mesmos filtros do funil",
        "Vendedor vê só a própria linha nos indicadores por pessoa",
      ],
    },
    benefits: {
      title: "O que o painel mostra",
      lead: "Os indicadores que respondem às perguntas da reunião de vendas.",
      items: [
        { icon: "funnel", title: "Funil por etapa", text: "Quantas oportunidades e quanto valor há em cada etapa agora." },
        { icon: "percent", title: "Taxa de conversão", text: "Quanto do que entra no funil vira venda." },
        {
          icon: "trendDown",
          title: "Perdas por motivo",
          text: "Os motivos mais comuns de perda, com base na lista padronizada da empresa.",
        },
        {
          icon: "seller",
          title: "Resultado por pessoa",
          text: "Valor ganho e atividades de cada vendedor no período.",
        },
      ],
    },
    faq: [
      {
        question: "Os indicadores são atualizados em tempo real?",
        answer:
          "Eles são calculados no momento em que você abre o painel, com os dados registrados até ali. Não há relatório para gerar nem planilha para atualizar.",
      },
      {
        question: "O vendedor vê os números dos colegas?",
        answer:
          "Não. Nos indicadores por pessoa, o vendedor vê apenas a própria linha. O gestor vê a equipe das lojas dele, e o diretor vê todos.",
      },
      {
        question: "Dá para levar os dados para o Excel?",
        answer: "Sim. Gestores e diretores exportam os dados em CSV, que abre no Excel em português.",
      },
    ],
    related: ["funil-de-vendas", "atividades-e-follow-up", "multiplas-lojas"],
    closingText: "Veja o painel de indicadores com o processo da sua equipe numa demonstração guiada.",
  },
  {
    slug: "multiplas-lojas",
    name: "Múltiplas lojas",
    icon: "store",
    summary: "Cada loja com sua equipe e seu funil, e a visão de todas para quem decide.",
    seo: {
      title: "CRM para empresas com várias lojas",
      description:
        "Cada loja com sua equipe, seus contatos e seu funil, e a visão de todas para quem decide. Permissões de leitura por loja no CRM LOCKONS.",
    },
    hero: {
      title: "Várias lojas, um CRM só",
      sub: "Cada loja com sua equipe, seus contatos e seu funil. Quem decide enxerga todas; quem vende vê as lojas onde trabalha.",
    },
    how: {
      eyebrow: "Como funciona",
      title: "Cada registro na sua loja",
      text: "Contatos, funis e oportunidades nascem ligados a uma loja, e a loja de um registro não muda depois de criado. Cada pessoa trabalha em uma ou mais lojas.",
      bullets: [
        "O diretor cadastra as lojas e define quem trabalha em cada uma",
        "Empresas clientes ficam visíveis para todas as lojas",
        "Etiquetas e catálogo de produtos iguais para toda a rede",
      ],
    },
    benefits: {
      title: "O que muda no dia a dia",
      lead: "A rede inteira num sistema, sem misturar o que é de cada loja.",
      items: [
        {
          icon: "shield",
          title: "Leitura por loja",
          text: "O vendedor vê as lojas em que trabalha, o gestor vê as liberadas para ele e o diretor vê todas.",
        },
        {
          icon: "user",
          title: "Uma pessoa, várias lojas",
          text: "Quem atende em mais de uma loja é ligado a todas elas e vê os dados de cada uma.",
        },
        {
          icon: "building",
          title: "Clientes empresariais compartilhados",
          text: "Empresas clientes não pertencem a uma loja e aparecem para toda a rede.",
        },
        {
          icon: "tag",
          title: "Um padrão para a rede",
          text: "Etiquetas, catálogo e motivos de perda iguais em todas as lojas, para comparar o que é comparável.",
        },
      ],
    },
    faq: [
      {
        question: "Um vendedor pode trabalhar em duas lojas?",
        answer: "Sim. Cada pessoa pode ser ligada a uma ou mais lojas e vê os dados de todas elas.",
      },
      {
        question: "Quem cria as lojas?",
        answer: "O diretor, que também define quem trabalha em cada uma.",
      },
      {
        question: "Um contato pode mudar de loja?",
        answer:
          "Não. A loja de um registro é definida na criação e não muda depois, o que mantém o histórico de cada loja coerente.",
      },
    ],
    related: ["indicadores-de-vendas", "gestao-de-contatos", "funil-de-vendas"],
    closingText: "Veja como a sua rede de lojas fica organizada numa demonstração guiada.",
  },
];

export function getFeature(slug: string): Feature | undefined {
  return features.find((feature) => feature.slug === slug);
}

export function featurePath(slug: FeatureSlug): string {
  return `/produto/${slug}`;
}

/** Página Produto (/produto). */
export const productPage = {
  seo: {
    title: "Software de CRM para equipes de vendas",
    description:
      "Conheça o LOCKONS: gestão de contatos, funil de vendas, atividades, indicadores e várias lojas num CRM simples para a equipe usar todo dia.",
  },
  hero: {
    eyebrow: "Produto",
    title: "O CRM que a equipe de vendas usa todo dia",
    sub: "Contatos, funil, atividades e indicadores ligados entre si, com permissões por papel e por loja. Sem módulo sobrando.",
    secondary: { label: "Ver as funcionalidades", href: "#funcionalidades" },
  },
  features: {
    id: "funcionalidades",
    eyebrow: "Funcionalidades",
    title: "Tudo o que a equipe precisa, cada coisa no seu lugar",
    lead: "Cinco partes que conversam entre si, mais as permissões que mantêm cada um no que é seu.",
    security: {
      icon: "shield" as IconName,
      name: "Segurança e permissões",
      summary: "Quem vê e quem edita cada registro, e o histórico de quem alterou o quê.",
      href: "/seguranca",
    },
  },
  flow: {
    eyebrow: "Tudo conectado",
    title: "Do contato ao indicador, sem digitar duas vezes",
    lead: "Cada registro alimenta o próximo. O que a equipe faz no dia a dia vira número no painel.",
    // Sequência real: a numeração é informação.
    steps: [
      { icon: "user" as IconName, title: "Contato", text: "O cliente entra uma vez, com o histórico dele." },
      { icon: "funnel" as IconName, title: "Oportunidade", text: "Cada negociação ganha etapa, valor e dono." },
      { icon: "calendar" as IconName, title: "Atividade", text: "O próximo passo fica agendado, com alerta." },
      { icon: "percent" as IconName, title: "Indicador", text: "O que foi registrado vira número no painel." },
    ],
  },
  audiences: {
    eyebrow: "Para quem",
    title: "Um sistema, três jeitos de usar",
    lead: "O mesmo CRM mostra a cada papel o que ele precisa ver.",
  },
  closing: {
    title: "Seu funil inteiro, sempre no foco.",
    text: "Veja o LOCKONS com o processo de venda da sua equipe numa demonstração guiada.",
  },
};
