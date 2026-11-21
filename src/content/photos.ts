/**
 * Fotos do site. Origem: Unsplash (licença Unsplash: uso comercial livre, sem atribuição obrigatória;
 * ver README). Importadas estaticamente: o Next gera tamanhos, formatos modernos e o desfoque de carregamento.
 */
import directorPhoto from "@/assets/photos/diretora-comercial.jpg";
import onboardingPhoto from "@/assets/photos/equipe-na-implantacao.jpg";
import meetingPhoto from "@/assets/photos/reuniao-de-vendas.jpg";
import sellerPhoto from "@/assets/photos/vendedor-no-balcao.jpg";

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
} as const;
