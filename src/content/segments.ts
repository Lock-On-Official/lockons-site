/**
 * Seção "Segmentos" da home: tipos de negócio em que o LOCKONS se encaixa, numa faixa de fotos com o nome
 * de cada um. Não promete nada específico de segmento. Fotos: src/content/photos.ts (Unsplash, ver README).
 */
import type { photos } from "./photos";

export interface Segment {
  id: string;
  name: string;
  photo: keyof typeof photos;
}

export const segmentsSection = {
  id: "segmentos",
  eyebrow: "Segmentos",
  title: "Do balcão à visita, cada venda no foco",
  lead: "Lojas, revendas, clínicas, escolas e imobiliárias: toda equipe que atende, faz proposta e precisa dar retorno ao cliente.",
};

export const segments: readonly Segment[] = [
  {
    id: "materiais-de-construcao",
    name: "Materiais de construção",
    photo: "buildingSupply",
  },
  {
    id: "concessionarias",
    name: "Concessionárias e revendas",
    photo: "dealership",
  },
  {
    id: "clinicas",
    name: "Clínicas e consultórios",
    photo: "clinic",
  },
  {
    id: "escolas",
    name: "Escolas e cursos",
    photo: "school",
  },
  {
    id: "imobiliarias",
    name: "Imobiliárias",
    photo: "realEstate",
  },
  {
    id: "varejo",
    name: "Varejo com várias lojas",
    photo: "seller",
  },
];
