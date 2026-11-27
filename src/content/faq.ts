/**
 * Perguntas frequentes. As marcadas com `featured` aparecem na home; todas vão para
 * /perguntas-frequentes (subtarefa 6), que é a única página com o FAQPage em JSON-LD.
 * Respostas conferidas com docs/escopo-mvp.md do crm-lockon: revise ao mudar o escopo.
 */
export interface FaqItem {
  question: string;
  answer: string;
  featured?: boolean;
}

export const faq: readonly FaqItem[] = [
  {
    // Ainda não foi confirmado o modelo de precificação, mas iremos manter este visual para possíveis consultas futuras.
    question: "Como é o preço do LOCKONS?",
    answer:
      "O preço é por loja, por mês: o valor acompanha o número de lojas que usam o sistema. Para saber o valor para a sua empresa, agende uma demonstração.",
    featured: true,
  },
  {
    question: "O LOCKONS funciona para uma empresa com várias lojas?",
    answer:
      "Sim. Cada pessoa é ligada a uma ou mais lojas. O vendedor vê os dados das lojas em que trabalha, o gestor vê as lojas liberadas para ele e o diretor vê todas.",
    featured: true,
  },
  {
    question: "Consigo trazer meus clientes de uma planilha?",
    answer:
      "Sim. A importação lê arquivos CSV, mostra uma simulação antes de gravar e entrega um relatório linha por linha. Contatos repetidos são pulados.",
    featured: true,
  },
  {
    question: "Um vendedor consegue alterar os clientes de outro?",
    answer:
      "Não. Só o dono do registro, o gestor e o diretor editam ou excluem. Nos indicadores por pessoa, o vendedor vê apenas a própria linha.",
    featured: true,
  },
  {
    question: "Quais indicadores o painel mostra?",
    answer:
      "Funil por etapa, taxa de conversão, perdas por motivo, atividades por pessoa e valor ganho por vendedor, sempre dentro das lojas que cada um pode ver.",
    featured: true,
  },
  {
    question: "O sistema avisa sobre atividades atrasadas?",
    answer:
      "Sim. Os alertas aparecem no próprio sistema. O lembrete por e-mail também existe e é ligado quando o servidor de e-mail da empresa estiver configurado.",
    featured: true,
  },
  {
    question: "Preciso do CPF para cadastrar um cliente?",
    answer: "Não. O CPF é opcional e nunca impede o cadastro, a oportunidade ou a venda.",
  },
];

export const featuredFaq = faq.filter((item) => item.featured);
