/**
 * Páginas de recursos: Segurança, Implantação e Perguntas frequentes.
 * Regras conferidas com o CLAUDE.md e o docs/escopo-mvp.md do crm-lockon (permissões, auditoria,
 * limite de login, backup, importação). Revise ao mudar as regras do sistema.
 */
import type { IconName } from "@/components/ui/Icon";

import { faq, type FaqItem } from "./faq";
import { features } from "./features";

/** Célula da matriz de permissões: sim, não ou um texto curto (ex.: "Lojas em que trabalha"). */
export type PermissionCell = boolean | string;

export const securityPage = {
  seo: {
    title: "Segurança e permissões do CRM",
    description:
      "Permissões por papel e por loja, histórico de alterações guardado por 12 meses, limite de tentativas de login e rotina de backup no CRM LOCKONS.",
  },
  hero: {
    eyebrow: "Segurança",
    title: "Cada pessoa vê o que precisa, e tudo fica registrado",
    sub: "Permissões por papel e por loja, histórico de quem alterou o quê e proteção no acesso. Segurança que a equipe nem percebe no dia a dia.",
  },
  matrix: {
    eyebrow: "Permissões",
    title: "Quem pode fazer o quê",
    lead: "As permissões vêm do papel de cada pessoa e das lojas em que ela trabalha. Ninguém precisa configurar caso a caso.",
    roles: ["Vendedor", "Gestor", "Diretor"],
    rows: [
      { action: "Ver contatos e oportunidades", cells: ["Lojas em que trabalha", "Lojas liberadas", "Todas as lojas"] },
      { action: "Editar e excluir registros", cells: ["Os próprios", "Da equipe", "Todos"] },
      { action: "Colocar etiquetas nos contatos que vê", cells: [true, true, true] },
      { action: "Criar oportunidade em nome de outra pessoa", cells: [false, true, true] },
      { action: "Criar e organizar as etiquetas", cells: [false, true, true] },
      { action: "Exportar dados em CSV", cells: [false, true, true] },
      { action: "Ver indicadores por pessoa", cells: ["Só a própria linha", "Da equipe", "Todos"] },
      { action: "Cadastrar lojas e definir quem trabalha nelas", cells: [false, false, true] },
      { action: "Definir os motivos de perda", cells: [false, false, true] },
      { action: "Consultar o histórico de alterações", cells: [false, false, true] },
    ] satisfies { action: string; cells: PermissionCell[] }[],
  },
  audit: {
    eyebrow: "Histórico de alterações",
    title: "Quem alterou o quê, e quando",
    text: "O sistema registra sozinho as mudanças importantes. Quando um valor não bate ou um cliente some da carteira, o diretor descobre o que aconteceu sem perguntar para ninguém.",
    bullets: [
      "Alterações nos registros, com autor e horário",
      "Acessos, exportações, importações e vínculos com as lojas",
      "Guardado por 12 meses e consultado só pelo diretor",
    ],
  },
  access: {
    eyebrow: "Proteção no acesso",
    title: "A porta de entrada também é cuidada",
    lead: "Do login ao banco de dados, o que protege a conta da sua empresa.",
    items: [
      {
        icon: "user" as IconName,
        title: "Cada pessoa com o seu usuário",
        text: "O acesso é individual e expira depois de um tempo, pedindo um novo login.",
      },
      {
        icon: "shield" as IconName,
        title: "Limite de tentativas de login",
        text: "Muitas senhas erradas seguidas bloqueiam novas tentativas por um tempo.",
      },
      {
        icon: "seller" as IconName,
        title: "Pessoa desativada não assume registros",
        text: "Ao criar um registro, o sistema confere se o dono e quem cria estão ativos.",
      },
      {
        icon: "history" as IconName,
        title: "Backup e restauração",
        text: "O banco de dados tem rotina de cópia de segurança e de restauração.",
      },
    ],
  },
  faq: [
    {
      question: "Quem vê os dados de cada loja?",
      answer:
        "O vendedor vê as lojas em que trabalha, o gestor vê as lojas liberadas para ele e o diretor vê todas. Empresas clientes não pertencem a uma loja e aparecem para toda a rede.",
    },
    {
      question: "Por quanto tempo o histórico de alterações fica guardado?",
      answer: "Por 12 meses. Só o diretor consulta o histórico.",
    },
    {
      question: "Um vendedor consegue exportar a base de clientes?",
      answer:
        "Não. A exportação é só para gestores e diretores, e cada exportação fica registrada no histórico.",
    },
    {
      question: "O que acontece se alguém errar a senha muitas vezes?",
      answer: "Depois de várias tentativas erradas seguidas, o login fica bloqueado por um tempo antes de aceitar uma nova tentativa.",
    },
  ] satisfies FaqItem[],
  closingText: "Veja as permissões funcionando com os papéis da sua equipe numa demonstração guiada.",
};

export const onboardingPage = {
  seo: {
    title: "Implantação do CRM: da planilha ao sistema",
    description:
      "Cadastre as lojas e a equipe, importe sua planilha de clientes com simulação antes de gravar e comece a usar o funil. Veja como é a implantação do LOCKONS.",
  },
  hero: {
    eyebrow: "Implantação",
    title: "Da planilha ao CRM, sem perder nenhum cliente",
    sub: "A base que você já tem entra por arquivo CSV, com simulação antes de gravar e relatório linha por linha. Contatos repetidos ficam de fora.",
  },
  steps: {
    eyebrow: "Passo a passo",
    title: "Quatro passos até a equipe usar no dia a dia",
    lead: "A ordem importa: primeiro a estrutura, depois os dados, por fim a rotina.",
    // Sequência real: a numeração é informação.
    items: [
      { icon: "store" as IconName, title: "Lojas e equipe", text: "O diretor cadastra as lojas e define quem trabalha em cada uma." },
      { icon: "tag" as IconName, title: "Regras da rede", text: "Motivos de perda e etiquetas que todas as lojas vão usar." },
      { icon: "upload" as IconName, title: "Importação", text: "A planilha de clientes entra com simulação e relatório antes de gravar." },
      { icon: "calendar" as IconName, title: "Dia a dia", text: "A equipe registra oportunidades e atividades, e o painel ganha vida." },
    ],
  },
  import: {
    eyebrow: "Importação",
    title: "Importação sem susto",
    text: "Antes de gravar qualquer coisa, a simulação mostra o que vai entrar, o que vai ficar de fora e por quê. Você corrige a planilha e importa de novo quantas vezes precisar.",
    bullets: [
      "Simulação antes de gravar",
      "Relatório por linha, com o motivo de cada recusa",
      "Contatos repetidos pulados e contato já ligado à empresa",
    ],
  },
  ready: {
    eyebrow: "Pronto para usar",
    title: "A equipe começa no mesmo dia em que a base entra",
    text: "Cada pessoa entra com o próprio usuário e já encontra os clientes da sua loja, com a busca que ignora acentos e o histórico de cada um.",
    bullets: [
      "Acesso individual para cada pessoa",
      "Cada um vê as lojas em que trabalha",
      "Exportação em CSV para o Excel, quando gestores e diretores precisarem",
    ],
  },
  faq: [
    {
      question: "Em que formato a planilha precisa estar?",
      answer: "Em CSV, o formato que o Excel salva. A exportação do LOCKONS usa o mesmo padrão do Excel em português.",
    },
    {
      question: "O que acontece com os contatos repetidos?",
      answer: "São pulados e aparecem no relatório da importação, com o motivo, para você conferir.",
    },
    {
      question: "Posso testar a importação antes de gravar?",
      answer: "Sim. A simulação mostra o resultado linha por linha, e nada é gravado até você confirmar.",
    },
    {
      question: "Quem pode exportar os dados depois?",
      answer: "Gestores e diretores, em CSV. Cada exportação fica registrada no histórico de alterações.",
    },
  ] satisfies FaqItem[],
  closingText: "Veja como seria a implantação na sua empresa numa demonstração guiada.",
};

export interface FaqCategory {
  id: string;
  title: string;
  lead: string;
  link?: { label: string; href: string };
  items: FaqItem[];
}

function featureFaq(slug: string) {
  return features.find((feature) => feature.slug === slug)?.faq ?? [];
}

/** Página /perguntas-frequentes: as perguntas do site agrupadas, sem repetir a mesma pergunta. */
const rawCategories: FaqCategory[] = [
  { id: "geral", title: "Geral", lead: "O básico sobre lojas, permissões e o dia a dia.", items: [...faq] },
  {
    id: "contatos",
    title: "Contatos",
    lead: "Cadastro, busca, CPF e importação.",
    link: { label: "Ver gestão de contatos", href: "/produto/gestao-de-contatos" },
    items: featureFaq("gestao-de-contatos"),
  },
  {
    id: "funil",
    title: "Funil de vendas",
    lead: "Etapas, donos e motivos de perda.",
    link: { label: "Ver funil de vendas", href: "/produto/funil-de-vendas" },
    items: featureFaq("funil-de-vendas"),
  },
  {
    id: "atividades",
    title: "Atividades",
    lead: "Lembretes, alertas e histórico.",
    link: { label: "Ver atividades e follow-up", href: "/produto/atividades-e-follow-up" },
    items: featureFaq("atividades-e-follow-up"),
  },
  {
    id: "indicadores",
    title: "Indicadores",
    lead: "O que o painel mostra e para quem.",
    link: { label: "Ver indicadores de vendas", href: "/produto/indicadores-de-vendas" },
    items: featureFaq("indicadores-de-vendas"),
  },
  {
    id: "lojas",
    title: "Várias lojas",
    lead: "Lojas, equipes e visibilidade.",
    link: { label: "Ver múltiplas lojas", href: "/produto/multiplas-lojas" },
    items: featureFaq("multiplas-lojas"),
  },
  {
    id: "seguranca",
    title: "Segurança",
    lead: "Permissões, histórico e acesso.",
    link: { label: "Ver segurança e permissões", href: "/seguranca" },
    items: securityPage.faq,
  },
  {
    id: "implantacao",
    title: "Implantação",
    lead: "Da planilha ao primeiro dia de uso.",
    link: { label: "Ver implantação", href: "/implantacao" },
    items: onboardingPage.faq,
  },
];

const seen = new Set<string>();
export const faqCategories: FaqCategory[] = rawCategories
  .map((category) => ({
    ...category,
    items: category.items.filter((item) => (seen.has(item.question) ? false : (seen.add(item.question), true))),
  }))
  .filter((category) => category.items.length > 0);

export const faqPage = {
  seo: {
    title: "Perguntas frequentes sobre o CRM",
    description:
      "Respostas sobre lojas, permissões, funil, atividades, indicadores, importação e segurança no LOCKONS, o CRM para equipes de vendas.",
  },
  hero: {
    eyebrow: "Perguntas frequentes",
    title: "Tudo o que perguntam antes de começar",
    sub: "Respostas curtas sobre como o LOCKONS funciona no dia a dia. A sua não está aqui? Traga para a demonstração.",
  },
  closingText: "Tire o resto das dúvidas vendo o LOCKONS com os dados da sua equipe numa demonstração guiada.",
};
