import { CtaBand } from "@/components/cta-band/CtaBand";
import { FaqList } from "@/components/faq/FaqList";
import { AccessLayersVisual } from "@/components/hero-visuals/AccessLayersVisual";
import { InfoCards } from "@/components/info-cards/InfoCards";
import { AuditLogMock } from "@/components/mockups/AuditLogMock";
import { PageHero } from "@/components/page-hero/PageHero";
import { FeatureSplit } from "@/components/section/FeatureSplit";
import { Section } from "@/components/section/Section";
import { SectionHeader } from "@/components/section/SectionHeader";
import { SplitGrid } from "@/components/section/SplitGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { securityPage, type PermissionCell } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

import styles from "./page.module.css";

export const metadata = pageMetadata({ ...securityPage.seo, path: "/seguranca" });

function Cell({ value }: { value: PermissionCell }) {
  if (typeof value === "string") return <span className={styles.scope}>{value}</span>;
  return value ? (
    <span className={`${styles.mark} ${styles.yes}`}>
      <Icon name="check" />
      <span className="visually-hidden">Sim</span>
    </span>
  ) : (
    <span className={`${styles.mark} ${styles.no}`}>
      <Icon name="x" />
      <span className="visually-hidden">Não</span>
    </span>
  );
}

export default function SecurityPage() {
  const { hero, matrix, audit, access } = securityPage;

  return (
    <>
      <PageHero
        trail={[{ label: "Segurança", href: "/seguranca" }]}
        eyebrow={hero.eyebrow}
        eyebrowId="eyebrow-seguranca"
        title={hero.title}
        sub={hero.sub}
        secondary={{ label: "Ver as permissões", href: "#permissoes" }}
        visual={<AccessLayersVisual />}
      />

      <Section id="permissoes" labelledBy="permissoes-title" tone="tint" decor="reticle">
        <div className="container">
          <SectionHeader id="permissoes-title" eyebrow={matrix.eyebrow} title={matrix.title} lead={matrix.lead} />
          {/* tabela larga: rola de lado dentro do próprio quadro no celular, sem empurrar a página */}
          <div className={styles.tableWrap}>
            <table className={styles.matrix}>
              <caption className="visually-hidden">Permissões de vendedor, gestor e diretor no LOCKONS</caption>
              <thead>
                <tr>
                  <th scope="col">Ação</th>
                  {matrix.roles.map((role) => (
                    <th key={role} scope="col">
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map((row) => (
                  <tr key={row.action}>
                    <th scope="row">{row.action}</th>
                    {row.cells.map((cell, index) => (
                      <td key={matrix.roles[index]}>
                        <Cell value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section labelledBy="historico-title" decor="network">
        <div className="container">
          <FeatureSplit
            id="historico-title"
            headingLevel={2}
            eyebrow={audit.eyebrow}
            title={audit.title}
            text={audit.text}
            bullets={audit.bullets}
            visual={<AuditLogMock />}
          />
        </div>
      </Section>

      <Section labelledBy="acesso-title" tone="navy" decor="lanes" decorSide="left">
        <div className="container">
          <SectionHeader id="acesso-title" eyebrow={access.eyebrow} title={access.title} lead={access.lead} onDark />
          <div className={styles.after}>
            <InfoCards items={access.items} columns={4} />
          </div>
        </div>
      </Section>

      <Section id="perguntas" labelledBy="perguntas-title" tone="tint" decor="route">
        <SplitGrid
          variant="wide"
          aside={
            <SectionHeader
              id="perguntas-title"
              eyebrow="Perguntas frequentes"
              title="Perguntas sobre segurança"
              action={
                <ButtonLink href="/perguntas-frequentes" variant="text">
                  Ver todas as perguntas
                </ButtonLink>
              }
            />
          }
        >
          <FaqList items={securityPage.faq} />
        </SplitGrid>
      </Section>

      <CtaBand
        title="Seu funil inteiro, sempre no foco."
        text={securityPage.closingText}
        secondary={{ label: "Conheça o produto", href: "/produto" }}
      />
    </>
  );
}
