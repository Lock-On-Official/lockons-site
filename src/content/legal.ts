/**
 * Páginas legais. Os TEXTOS AINDA NÃO EXISTEM: vêm do jurídico. Até lá as páginas mostram só a estrutura,
 * ficam fora do Google (noindex) e fora do sitemap (`published: false` em routes.ts).
 * Quando o texto chegar: preencher `text` de cada seção, trocar `draft` para false e marcar a rota como publicada.
 */
export interface LegalSection {
  id: string;
  title: string;
  /** Parágrafos da seção; vazio enquanto o jurídico não entrega o texto. */
  text: string[];
}

export interface LegalPage {
  draft: boolean;
  path: string;
  seo: { title: string; description: string };
  title: string;
  sub: string;
  sections: LegalSection[];
}

export const privacyPage: LegalPage = {
  draft: true,
  path: "/privacidade",
  seo: {
    title: "Política de Privacidade",
    description: "Como o LOCKONS coleta, usa, guarda e protege os dados pessoais, e como exercer os seus direitos pela LGPD.",
  },
  title: "Política de Privacidade",
  sub: "Como os dados pessoais são coletados, usados, guardados e protegidos, e como exercer os seus direitos pela Lei Geral de Proteção de Dados (LGPD).",
  sections: [
    { id: "quem-somos", title: "Quem somos", text: [] },
    { id: "dados-coletados", title: "Quais dados coletamos", text: [] },
    { id: "finalidades", title: "Para que usamos os dados", text: [] },
    { id: "compartilhamento", title: "Com quem compartilhamos", text: [] },
    { id: "retencao", title: "Por quanto tempo guardamos", text: [] },
    { id: "direitos", title: "Seus direitos", text: [] },
    { id: "cookies", title: "Cookies", text: [] },
    { id: "encarregado", title: "Encarregado de dados (DPO)", text: [] },
    { id: "alteracoes", title: "Alterações nesta política", text: [] },
  ],
};

export const termsPage: LegalPage = {
  draft: true,
  path: "/termos",
  seo: {
    title: "Termos de Uso",
    description: "As condições de uso do LOCKONS: o serviço, a conta e o acesso, as responsabilidades de cada parte e o encerramento.",
  },
  title: "Termos de Uso",
  sub: "As condições para usar o LOCKONS: o que o serviço oferece, como funcionam a conta e o acesso, e as responsabilidades de cada parte.",
  sections: [
    { id: "aceite", title: "Aceite dos termos", text: [] },
    { id: "servico", title: "O serviço", text: [] },
    { id: "conta", title: "Conta e acesso", text: [] },
    { id: "responsabilidades", title: "Responsabilidades do cliente", text: [] },
    { id: "dados", title: "Dados e privacidade", text: [] },
    { id: "disponibilidade", title: "Disponibilidade e suporte", text: [] },
    { id: "pagamento", title: "Pagamento", text: [] },
    { id: "encerramento", title: "Encerramento", text: [] },
    { id: "foro", title: "Legislação e foro", text: [] },
  ],
};
