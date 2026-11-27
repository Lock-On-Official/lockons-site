/**
 * Fotos do site. Origem: Unsplash (licença Unsplash: uso comercial livre, sem atribuição obrigatória;
 * ver README). Importadas estaticamente: o Next gera tamanhos, formatos modernos e o desfoque de carregamento.
 */
import directorPhoto from "@/assets/photos/diretora-comercial.jpg";
import onboardingPhoto from "@/assets/photos/equipe-na-implantacao.jpg";
import meetingPhoto from "@/assets/photos/reuniao-de-vendas.jpg";
import sellerPhoto from "@/assets/photos/vendedor-no-balcao.jpg";
import dealershipPhoto from "@/assets/photos/concessionaria.jpg";
import clinicPhoto from "@/assets/photos/clinica.jpg";
import schoolPhoto from "@/assets/photos/escola.jpg";
import realEstatePhoto from "@/assets/photos/imobiliaria.jpg";
import buildingSupplyPhoto from "@/assets/photos/materiais-de-construcao.jpg";

export const photos = {
  seller: {
    src: sellerPhoto,
    alt: "Vendedor sorrindo no balcão da loja enquanto atende uma cliente com o celular na mão",
    // o rosto do vendedor fica no terço esquerdo, no alto
    position: "8% 0%",
  },
  manager: {
    src: meetingPhoto,
    alt: "Gestora conduzindo a reunião de vendas da equipe diante de um quadro com anotações",
    position: "center 35%",
  },
  director: { src: directorPhoto, alt: "Diretora comercial sorrindo no escritório", position: "center 25%" },
  onboarding: {
    src: onboardingPhoto,
    alt: "Equipe reunida em volta de um notebook, olhando a tela juntos",
    position: "center 40%",
  },
  // seção "Segmentos" da home
  buildingSupply: {
    src: buildingSupplyPhoto,
    alt: "Corredor de uma loja de materiais de construção com prateleiras cheias de produtos",
    position: "center 50%",
  },
  dealership: { src: dealershipPhoto, alt: "Fileira de carros novos no pátio de uma revenda", position: "30% 60%" },
  clinic: { src: clinicPhoto, alt: "Consultório odontológico claro, com cadeira e equipamentos", position: "center 55%" },
  school: { src: schoolPhoto, alt: "Professora em sala de aula com alunos levantando a mão", position: "42% 40%" },
  realEstate: { src: realEstatePhoto, alt: "Casa moderna de dois andares com piscina", position: "center 60%" },
} as const;
