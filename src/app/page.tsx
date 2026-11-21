import Link from "next/link";

import { demoPath } from "@/content/routes";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

import styles from "./page.module.css";

export const metadata = pageMetadata({ description: site.description, path: "/" });

// Provisória: a home completa (hero com a mira 3D e as seções) entra na subtarefa 3.
export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.copy}>
          <p className={styles.eyebrow}>CRM para equipes de vendas</p>
          <h1 className={styles.title}>
            Cada oportunidade, <em className="text-gradient">na mira.</em>
          </h1>
          <p className={styles.sub}>
            Contatos, pipeline e atividades num só lugar. Simples para o vendedor usar todo dia, claro para o gestor
            acompanhar.
          </p>
          <div>
            <Link href={demoPath} className={styles.cta}>
              Agendar demonstração
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
