/**
 * Os três papéis do sistema (seller, manager e admin no crm-lockon), com o nome que o visitante reconhece.
 * Usado na seção "Para quem" da home e, na subtarefa 5, nas páginas de cada papel.
 */
export interface Audience {
  id: "vendedores" | "gestores" | "diretores";
  label: string;
  title: string;
  text: string;
  bullets: string[];
  href: string;
  linkLabel: string;
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
  },
  {
    id: "gestores",
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
  },
  {
    id: "diretores",
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
  },
];
