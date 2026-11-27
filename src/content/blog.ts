/**
 * Artigos do blog (/blog e /blog/<slug>). Conteúdo educativo sobre vendas; quando citam o LOCKONS,
 * descrevem só o que o MVP entrega (docs/escopo-mvp.md do crm-lockon), no bloco "Na prática".
 * Artigo novo: acrescente aqui; a rota, o sitemap e a imagem de compartilhamento saem desta lista.
 */
import type { IconName } from "@/components/ui/Icon";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /** Destaque "Na prática": como o assunto aparece no LOCKONS. */
  | { type: "tip"; title: string; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  /** Uma ou duas frases: cartão, meta description e a linha abaixo do título. */
  description: string;
  category: string;
  /** Ícone da capa ilustrada. */
  icon: IconName;
  /** Data de publicação, AAAA-MM-DD. */
  publishedAt: string;
  body: BlogBlock[];
  /** Página do produto ligada ao assunto, no fim do artigo. */
  product: { label: string; href: string };
}

export const blogPage = {
  seo: {
    title: "Blog sobre vendas, funil e gestão comercial",
    description:
      "Artigos práticos sobre funil de vendas, follow-up, indicadores e gestão comercial, para quem vende e para quem lidera vendas.",
  },
  hero: {
    eyebrow: "Blog",
    title: "Vender com método, sem planilha paralela",
    sub: "Artigos práticos sobre funil, follow-up, indicadores e gestão comercial, para quem vende e para quem lidera vendas.",
  },
  listTitle: "Todos os artigos",
};

export const blogAuthor = "Equipe LOCKONS";

export const posts: readonly BlogPost[] = [
  {
    slug: "funil-de-vendas-como-montar",
    title: "Funil de vendas: o que é e como montar o da sua equipe",
    description:
      "Entenda o que é um funil de vendas, como definir as etapas do seu processo e o que acompanhar em cada uma para vender com previsibilidade.",
    category: "Funil de vendas",
    icon: "funnel",
    publishedAt: "2026-11-22",
    product: { label: "Conheça o funil de vendas do LOCKONS", href: "/produto/funil-de-vendas" },
    body: [
      {
        type: "p",
        text: "Funil de vendas é o caminho que uma oportunidade percorre do primeiro contato até o fechamento. Ele mostra, num só lugar, quantas negociações estão em andamento, em que ponto cada uma está e quanto valor existe em cada etapa.",
      },
      {
        type: "p",
        text: "Sem um funil, cada vendedor guarda o próprio processo na cabeça, no caderno ou numa planilha. O gestor só descobre que uma venda esfriou quando já é tarde para fazer alguma coisa.",
      },
      { type: "h2", text: "Comece pelas etapas que a sua equipe já vive" },
      {
        type: "p",
        text: "Não existe funil certo para todo mundo. O melhor ponto de partida é desenhar o que acontece hoje, na prática, entre o primeiro contato e a venda fechada. Um modelo comum para venda consultiva tem quatro etapas:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Qualificação: o contato tem a necessidade, o orçamento e alguém que decide?",
          "Proposta: a oferta foi enviada, com valor e condições.",
          "Negociação: ajustes de preço, prazo ou escopo antes do sim.",
          "Fechamento: a oportunidade vira ganha ou perdida.",
        ],
      },
      {
        type: "p",
        text: "Cada etapa precisa de um critério de entrada claro. “Proposta enviada” é verificável; “cliente interessado” não é. Critério claro evita que cada vendedor use o funil de um jeito.",
      },
      { type: "h2", text: "Toda oportunidade precisa de valor, dono e próximo passo" },
      {
        type: "p",
        text: "Uma oportunidade sem valor não entra na soma do funil. Sem dono, ninguém responde por ela. Sem próximo passo, ela fica parada até alguém lembrar. São esses três campos que tornam o funil confiável.",
      },
      { type: "h2", text: "Registre por que as vendas se perdem" },
      {
        type: "p",
        text: "Perder faz parte. O problema é perder sem saber por quê. Quando o motivo da perda é escolhido de uma lista padronizada (preço, prazo, concorrente, sem retorno), a equipe enxerga padrões e consegue agir sobre eles.",
      },
      {
        type: "tip",
        title: "Na prática",
        text: "No LOCKONS, cada oportunidade tem etapa, valor e um dono responsável, e o motivo de perda é obrigatório ao marcar uma venda como perdida. O valor do funil aparece somado por etapa.",
      },
      { type: "h2", text: "O que acompanhar toda semana" },
      {
        type: "list",
        items: [
          "Quanto valor há em cada etapa e se ele está andando ou parado.",
          "A taxa de conversão: quanto do que entra no funil vira venda.",
          "Os motivos de perda mais frequentes no período.",
          "Oportunidades sem próxima atividade agendada.",
        ],
      },
      {
        type: "p",
        text: "Com esses números à vista, a reunião comercial deixa de ser sobre lembrar o que aconteceu e passa a ser sobre decidir o que fazer.",
      },
    ],
  },
  {
    slug: "follow-up-de-vendas",
    title: "Follow-up de vendas: como não deixar nenhum retorno para trás",
    description:
      "Um roteiro simples para organizar ligações, visitas e propostas, definir o próximo passo de cada negociação e não esquecer nenhum retorno prometido.",
    category: "Rotina comercial",
    icon: "calendar",
    publishedAt: "2026-11-22",
    product: { label: "Conheça atividades e follow-up", href: "/produto/atividades-e-follow-up" },
    body: [
      {
        type: "p",
        text: "Muita venda não se perde para o concorrente: se perde no silêncio. O cliente pediu para retornar na semana seguinte, a semana passou e ninguém ligou. Follow-up é a disciplina de transformar cada conversa num próximo passo com data.",
      },
      { type: "h2", text: "Termine toda conversa com um próximo passo" },
      {
        type: "p",
        text: "Antes de desligar ou sair da visita, combine o que acontece depois: quem faz, o quê e quando. “Mando a proposta revisada amanhã até as 17h” é um próximo passo. “Fico no aguardo” não é.",
      },
      { type: "h2", text: "Agende na hora, na oportunidade certa" },
      {
        type: "p",
        text: "O retorno anotado num papel solto se perde. Registre a atividade no momento em que ela é combinada, ligada à negociação a que pertence. Assim, quem abrir aquela oportunidade sabe exatamente o que está pendente.",
      },
      {
        type: "list",
        items: [
          "Ligação: para tirar dúvidas ou confirmar uma decisão.",
          "Visita: quando o cliente precisa ver, testar ou conversar com mais gente.",
          "Proposta: envio ou revisão de valores e condições.",
        ],
      },
      { type: "h2", text: "Comece o dia pelo que venceu" },
      {
        type: "p",
        text: "Uma rotina simples resolve boa parte do problema: abrir o dia pelas atividades vencidas, depois as de hoje, e só então partir para novos contatos. Atividade vencida é cliente esperando.",
      },
      {
        type: "tip",
        title: "Na prática",
        text: "No LOCKONS, ligações, visitas e propostas ficam agendadas na oportunidade, e o sistema avisa quando uma atividade vence. O lembrete por e-mail funciona quando o envio estiver configurado.",
      },
      { type: "h2", text: "Guarde o histórico de cada contato" },
      {
        type: "p",
        text: "Retomar uma conversa sem lembrar o que foi dito da última vez passa insegurança. Com o histórico do cliente à mão (o que foi oferecido, quais objeções apareceram, quem participou), o próximo contato começa de onde o anterior parou.",
      },
      { type: "h2", text: "Quantas tentativas fazer?" },
      {
        type: "p",
        text: "Não existe número mágico. O que funciona é a equipe combinar um ritmo de tentativas para cada etapa e um ponto de parada: depois de algumas tentativas sem resposta, a oportunidade é marcada como perdida, com o motivo “sem retorno”. Isso mantém o funil honesto.",
      },
    ],
  },
  {
    slug: "planilha-ou-crm",
    title: "Planilha ou CRM? 5 sinais de que a sua equipe de vendas precisa trocar",
    description:
      "A planilha ajuda no começo, mas tem limites. Veja os sinais de que é hora de passar para um CRM e como fazer a troca sem perder o que você já tem.",
    category: "Gestão comercial",
    icon: "upload",
    publishedAt: "2026-11-22",
    product: { label: "Veja como é a implantação", href: "/implantacao" },
    body: [
      {
        type: "p",
        text: "A planilha é o primeiro sistema de vendas de quase toda empresa. É flexível e todo mundo sabe usar. O problema aparece quando a equipe cresce e o mesmo arquivo passa a ser editado por muitas mãos.",
      },
      { type: "h2", text: "1. Ninguém sabe qual é a versão certa" },
      {
        type: "p",
        text: "“Vendas_final_v3_atualizada” é um sintoma conhecido. Quando cada vendedor tem a sua cópia, o gestor passa a reunião conciliando números em vez de discutir vendas.",
      },
      { type: "h2", text: "2. O mesmo cliente aparece duas vezes" },
      {
        type: "p",
        text: "Um vendedor cadastra “José Antônio”, outro cadastra “Jose Antonio”, com o telefone em outro formato. Os dois ligam para o mesmo cliente, que percebe a desorganização.",
      },
      { type: "h2", text: "3. Os retornos dependem da memória" },
      {
        type: "p",
        text: "A planilha não avisa nada. Se o vendedor não abriu o arquivo naquele dia, o retorno combinado fica para trás.",
      },
      { type: "h2", text: "4. Todo mundo vê e edita tudo" },
      {
        type: "p",
        text: "Numa planilha compartilhada, qualquer pessoa pode apagar uma linha ou mudar o valor de uma venda, e não fica registrado quem fez o quê. Separar o que cada vendedor ou cada loja pode ver é quase impossível.",
      },
      { type: "h2", text: "5. O relatório leva horas para sair" },
      {
        type: "p",
        text: "Taxa de conversão, valor por etapa, resultado por vendedor: na planilha, cada número é uma fórmula frágil montada à mão. Quando o relatório fica pronto, já está desatualizado.",
      },
      { type: "h2", text: "Como trocar sem perder o que você tem" },
      {
        type: "p",
        text: "A troca não precisa começar do zero. Os contatos que estão na planilha podem ser importados, desde que você confira o resultado antes de gravar.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Arrume as colunas: um dado por coluna (nome, telefone, e-mail, empresa).",
          "Importe e revise o resultado linha por linha antes de confirmar.",
          "Defina as etapas do funil e cadastre as oportunidades em aberto.",
          "Combine com a equipe a data a partir da qual a planilha deixa de ser usada.",
        ],
      },
      {
        type: "tip",
        title: "Na prática",
        text: "No LOCKONS, a importação da planilha mostra o resultado antes de gravar, linha por linha, e deixa de fora os contatos repetidos. Cada pessoa vê só o que cabe ao seu papel e à sua loja, e cada alteração fica registrada.",
      },
    ],
  },
  {
    slug: "indicadores-de-vendas-para-gestores",
    title: "Indicadores de vendas: o que o gestor comercial precisa acompanhar",
    description:
      "Funil por etapa, conversão, perdas por motivo e resultado por vendedor: o que cada indicador mostra e que pergunta ele ajuda a responder.",
    category: "Gestão comercial",
    icon: "chart",
    publishedAt: "2026-11-22",
    product: { label: "Conheça os indicadores de vendas", href: "/produto/indicadores-de-vendas" },
    body: [
      {
        type: "p",
        text: "Indicador bom é o que muda uma decisão. Antes de montar um painel com dezenas de números, vale escolher poucos indicadores que respondem às perguntas que o gestor faz toda semana.",
      },
      { type: "h2", text: "Funil por etapa: onde está o dinheiro?" },
      {
        type: "p",
        text: "Quantas oportunidades e quanto valor existem em cada etapa agora. Mostra se o funil está cheio no começo e vazio no fim (falta avançar as negociações) ou o contrário (falta prospectar).",
      },
      { type: "h2", text: "Taxa de conversão: o processo está funcionando?" },
      {
        type: "p",
        text: "Quanto do que entra no funil vira venda. Acompanhada ao longo do tempo, mostra se uma mudança de abordagem, de preço ou de equipe teve efeito.",
      },
      { type: "h2", text: "Perdas por motivo: por que não fechamos?" },
      {
        type: "p",
        text: "Com motivos padronizados, as perdas viram informação. Se “preço” lidera, talvez a qualificação esteja trazendo clientes fora do perfil. Se “sem retorno” lidera, o problema pode estar no follow-up.",
      },
      { type: "h2", text: "Resultado por vendedor: quem precisa de ajuda?" },
      {
        type: "p",
        text: "Valor ganho e atividades de cada pessoa da equipe. O objetivo não é fazer ranking, e sim enxergar quem está com o funil travado e precisa de apoio, e quem tem uma prática que vale espalhar.",
      },
      {
        type: "tip",
        title: "Na prática",
        text: "O painel do LOCKONS mostra funil por etapa, taxa de conversão, perdas por motivo e resultado por vendedor. Os números saem do que a equipe registra no dia a dia: o vendedor vê os dele; o gestor, os da equipe.",
      },
      { type: "h2", text: "Indicador só funciona com registro em dia" },
      {
        type: "p",
        text: "Nenhum painel corrige dado que não foi lançado. Por isso, o primeiro trabalho do gestor é tornar o registro fácil e combinado: toda oportunidade com valor e etapa, toda perda com motivo, toda conversa com próximo passo.",
      },
    ],
  },
];
