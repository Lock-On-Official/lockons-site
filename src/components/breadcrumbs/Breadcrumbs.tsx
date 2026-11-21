import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";

import styles from "./Breadcrumbs.module.css";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  /** Caminho a partir da home, sem ela; o último item é a página atual. */
  trail: readonly Crumb[];
}

/** Trilha de navegação das páginas internas, com o BreadcrumbList que o Google mostra no resultado. */
export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  const items: Crumb[] = [{ label: "Início", href: "/" }, ...trail];
  const lastIndex = items.length - 1;

  return (
    <>
      <nav aria-label="Trilha de navegação" className={styles.breadcrumbs}>
        <ol>
          {items.map((item, index) => (
            <li key={item.href}>
              {index === lastIndex ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: absoluteUrl(item.href),
          })),
        }}
      />
    </>
  );
}
