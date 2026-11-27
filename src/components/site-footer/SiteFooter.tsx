import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { footerColumns, routesIn } from "@/content/routes";
import { site } from "@/lib/site";

import styles from "./SiteFooter.module.css";

// Ano do build: o site é estático e cada publicação o atualiza.
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo idPrefix="logo-footer" />
            <p>{site.slogan}</p>
            <ContactLinks lead="Fale com a equipe:" className={styles.contact} />
          </div>
          {/* Links para todas as páginas: ajudam o visitante e o rastreador do Google a achar cada uma. */}
          <nav aria-label="Rodapé" className={styles.columns}>
            {footerColumns.map((column) => (
              <div key={column.group}>
                <h2>{column.title}</h2>
                <ul>
                  {routesIn(column.group).map((route) => (
                    <li key={route.path}>
                      <Link href={route.path}>{route.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
