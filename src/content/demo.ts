/**
 * Página /agendar-demonstracao.
 * O formulário está INDISPONÍVEL por decisão do time: o sistema ainda não tem versão funcional.
 * Para ligar: criar o envio (rota no servidor que manda os dados para o e-mail da LOCKONS),
 * trocar `available` para true e tirar o `disabled` do formulário. Até lá ele aparece desativado, com o aviso.
 */
import type { IconName } from "@/components/ui/Icon";

export const demoPage = {
  available: false,
  seo: {
    title: "Agendar demonstração do CRM",
    description:
      "Peça uma demonstração guiada do LOCKONS: contatos, funil de vendas, atividades e indicadores mostrados com o processo de venda da sua equipe.",
  },
  hero: {
    eyebrow: "Demonstração",
    title: "Veja o LOCKONS com o processo da sua equipe",
    sub: "Uma conversa guiada para mostrar contatos, funil, atividades e indicadores do jeito que a sua equipe vende hoje.",
  },
  form: {
    title: "Agende sua demonstração",
    unavailableTitle: "Agendamento pelo site em breve",
    unavailableText: "O formulário abre assim que as primeiras agendas estiverem disponíveis. Enquanto isso, conheça o produto pelas páginas do site.",
    stores: ["1 loja", "2 a 5 lojas", "6 a 20 lojas", "Mais de 20 lojas"],
    team: ["Até 5 pessoas", "6 a 15 pessoas", "16 a 50 pessoas", "Mais de 50 pessoas"],
    submit: "Agendar demonstração",
  },
  steps: {
    eyebrow: "Como funciona",
    title: "Como é a demonstração",
    lead: "Uma conversa, não uma apresentação genérica: o LOCKONS mostrado no cenário da sua empresa.",
    // Sequência real: a numeração é informação.
    items: [
      {
        icon: "user" as IconName,
        title: "Você conta como a equipe vende hoje",
        text: "Planilhas, lojas, quem acompanha o quê e onde as vendas se perdem.",
      },
      {
        icon: "funnel" as IconName,
        title: "Mostramos o LOCKONS no seu cenário",
        text: "Contatos, funil, atividades e indicadores com exemplos do seu dia a dia.",
      },
      {
        icon: "calendar" as IconName,
        title: "Combinamos os próximos passos",
        text: "Lojas, equipe e importação da planilha que vocês já usam.",
      },
    ],
  },
  topics: {
    eyebrow: "Na demonstração",
    title: "O que você vai ver",
  },
  closing: {
    title: "Ainda com dúvidas?",
    text: "As perguntas mais comuns sobre lojas, permissões, importação e segurança estão respondidas numa página só.",
  },
};
