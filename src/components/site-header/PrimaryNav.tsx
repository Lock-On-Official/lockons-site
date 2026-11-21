"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/content/routes";

import styles from "./SiteHeader.module.css";

/** Cliente só para marcar a página atual (aria-current); os links já vêm no HTML do servidor. */
export function PrimaryNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal" className={styles.nav}>
      <ul>
        {items.map((item) => {
          const isPage = !item.href.includes("#") && (pathname === item.href || pathname.startsWith(`${item.href}/`));
          // "Para quem" aponta para uma âncora da home: nas páginas de papel, marca a seção, não a página
          const inSection = Boolean(item.match && pathname.startsWith(item.match));
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={isPage ? "page" : inSection ? "true" : undefined}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
