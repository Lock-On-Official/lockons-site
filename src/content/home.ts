/**
 * Textos da home. Tudo aqui descreve o que o MVP entrega (docs/escopo-mvp.md do crm-lockon):
 * nada de integração ou número que ainda não existe.
 */
import type { IconName } from "@/components/ui/Icon";

export const homeSeo = {
  description:
    "CRM para equipes de vendas com contatos, funil de vendas, atividades e indicadores por loja e por vendedor. Simples para o vendedor, claro para o gestor.",
};

export const hero = {
  eyebrow: "CRM para equipes de vendas",
  titleStart: "Cada oportunidade,",
  titleHighlight: "na mira.",
  sub: "Contatos, pipeline e atividades num só lugar. Simples para o vendedor usar todo dia, claro para o gestor acompanhar.",
  secondaryCta: { label: "Ver como funciona", href: "#do-caos-ao-foco" },
  proof: ["Funil e conversão sempre atualizados", "Lembretes de atividade", "Acesso por papel e por loja"],
} as const;

export interface Indicator {
  icon: IconName;
  title: string;
  text: string;
}

export const indicators = {
  eyebrow: "Indicadores",
  title: "O que o painel mostra, sem planilha paralela",
  lead: "Os números saem do que a equipe registra no dia a dia. O vendedor vê os dele; o gestor, os da equipe.",
  link: { label: "Conheça os indicadores de vendas", href: "/produto/indicadores-de-vendas" },
  items: [
    { icon: "funnel", title: "Funil por etapa", text: "Quantas oportunidades e quanto valor há em cada etapa." },
    { icon: "percent", title: "Taxa de conversão", text: "Quanto do que entra no funil vira venda." },
    { icon: "trendDown", title: "Perdas por motivo", text: "Por que as vendas se perdem, com motivos padronizados." },
    { icon: "seller", title: "Resultado por vendedor", text: "Valor ganho e atividades de cada pessoa da equipe." },
  ] satisfies Indicator[],
};

export interface BoardCard {
  name: string;
  value: number;
  due?: string;
  hot?: boolean;
  locked?: boolean;
  /** Posição "bagunçada" antes do scroll organizar: desktop e celular. */
  chaos: string;
  chaosMobile: string;
}

export interface BoardColumn {
  stage: string;
  cards: BoardCard[];
}

export const chaosToFocus = {
  id: "do-caos-ao-foco",
  eyebrow: "Como funciona",
  title: "Do caos ao foco",
  lead: "Planilha, caderno e conversa no celular viram um funil só. Cada oportunidade ganha etapa, valor, dono e próximo passo.",
  hint: "Experimente: arraste um cartão para outra etapa. No celular, toque e segure.",
  // Sequência real de uso: a numeração da lista é informação.
  steps: [
    "Cadastre os contatos ou importe a planilha que você já tem.",
    "Crie as oportunidades e mova cada uma pelas etapas do funil.",
    "Registre ligações, visitas e propostas, e receba o aviso do que vence.",
  ],
  columns: [
    {
      stage: "Qualificação",
      cards: [
        { name: "Padaria Trigo Bom", value: 2300, chaos: "translate(60px, 90px) rotate(-9deg)", chaosMobile: "translate(20px, 40px) rotate(-7deg)" },
        { name: "Auto Peças Rota", value: 5100, chaos: "translate(140px, -40px) rotate(7deg)", chaosMobile: "translate(-30px, 30px) rotate(6deg)" },
      ],
    },
    {
      stage: "Proposta",
      cards: [
        { name: "Mercado São Jorge", value: 4950, due: "Enviar revisão amanhã", chaos: "translate(-120px, 70px) rotate(8deg)", chaosMobile: "translate(30px, -20px) rotate(-5deg)" },
        { name: "Escola Nova Era", value: 9800, chaos: "translate(90px, 40px) rotate(-6deg)", chaosMobile: "translate(-20px, 50px) rotate(8deg)" },
      ],
    },
    {
      stage: "Negociação",
      cards: [
        { name: "Construtora Horizonte", value: 18400, due: "Retornar hoje, 15h", hot: true, locked: true, chaos: "translate(-150px, 110px) rotate(-10deg)", chaosMobile: "translate(25px, 35px) rotate(-6deg)" },
        { name: "Clínica Bem Viver", value: 7200, chaos: "translate(-60px, -60px) rotate(9deg)", chaosMobile: "translate(-25px, -30px) rotate(7deg)" },
      ],
    },
  ] satisfies BoardColumn[],
};

export interface Pillar {
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  link: { label: string; href: string };
  mock: "contacts" | "pipeline" | "activities";
}

export const pillars = {
  eyebrow: "Produto",
  title: "Tudo o que a equipe usa no dia a dia, em três telas",
  lead: "Sem módulo sobrando: o que importa para vender e acompanhar, do primeiro contato ao fechamento.",
  items: [
    {
      eyebrow: "Gestão de contatos",
      title: "Encontre o cliente pelo nome, telefone ou CPF",
      text: "Pessoas e empresas num cadastro só, com o histórico de tudo o que aconteceu. A busca ignora acentos e compara telefones só pelos números.",
      bullets: [
        "CPF opcional: nunca trava o cadastro",
        "Etiquetas para separar clientes, leads e indicações",
        "Linha do tempo com cada contato feito",
      ],
      link: { label: "Conheça a gestão de contatos", href: "/produto/gestao-de-contatos" },
      mock: "contacts",
    },
    {
      eyebrow: "Funil de vendas",
      title: "Veja onde cada venda está e o que falta para fechar",
      text: "Cada oportunidade tem etapa, valor e um dono responsável. Quando uma venda se perde, o motivo fica registrado para a equipe aprender com ele.",
      bullets: [
        "Motivo de perda obrigatório, escolhido de uma lista",
        "Data de fechamento gravada ao ganhar ou perder",
        "Valor do funil somado por etapa",
      ],
      link: { label: "Conheça o funil de vendas", href: "/produto/funil-de-vendas" },
      mock: "pipeline",
    },
    {
      eyebrow: "Atividades e follow-up",
      title: "Nenhum retorno esquecido",
      text: "Ligações, visitas e propostas ficam agendadas na oportunidade certa. O sistema avisa quando algo vence.",
      bullets: [
        "Alerta de atividade vencida no próprio sistema",
        "Lembrete por e-mail, quando o envio estiver configurado",
        "Histórico automático do que foi feito",
      ],
      link: { label: "Conheça atividades e follow-up", href: "/produto/atividades-e-follow-up" },
      mock: "activities",
    },
  ] satisfies Pillar[],
};

export interface TrustItem {
  icon: IconName;
  title: string;
  text: string;
  link: { label: string; href: string };
}

export const trust = {
  eyebrow: "Confiança e implantação",
  title: "Seguro para a equipe, simples de começar",
  lead: "Cada pessoa vê o que cabe a ela, e a troca da planilha pelo CRM é feita com o resultado à vista.",
  items: [
    {
      icon: "shield",
      title: "Permissões por papel e por loja",
      text: "Vendedor, gestor e diretor veem e editam só o que cabe a cada um.",
      link: { label: "Veja as permissões", href: "/seguranca" },
    },
    {
      icon: "history",
      title: "Histórico de alterações",
      text: "Cada mudança fica registrada, e o diretor consulta quem alterou o quê e quando.",
      link: { label: "Como funciona o histórico", href: "/seguranca" },
    },
    {
      icon: "upload",
      title: "Importação da planilha",
      text: "Você vê o resultado antes de gravar, linha por linha. Contatos repetidos ficam de fora.",
      link: { label: "Como é a implantação", href: "/implantacao" },
    },
    {
      icon: "store",
      title: "Várias lojas, um sistema",
      text: "Cada loja com sua equipe, seus contatos e seu funil, e a visão de todas para quem decide.",
      link: { label: "Uso com várias lojas", href: "/produto/multiplas-lojas" },
    },
  ] satisfies TrustItem[],
};

export const faqSection = {
  eyebrow: "Perguntas frequentes",
  title: "Antes de agendar a demonstração",
  link: { label: "Ver todas as perguntas", href: "/perguntas-frequentes" },
};

export const closing = {
  title: "Seu funil inteiro, sempre no foco.",
  text: "Veja o LOCKONS com o processo de venda da sua equipe numa demonstração guiada.",
  secondary: { label: "Conheça o produto", href: "/produto" },
};
