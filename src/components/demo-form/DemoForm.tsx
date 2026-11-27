import Link from "next/link";

import { LogoMark } from "@/components/brand/LogoMark";
import { LockBrackets } from "@/components/cards/LockBrackets";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { buttonClassName } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { demoPage } from "@/content/demo";

import styles from "./DemoForm.module.css";

/**
 * Formulário de demonstração. Hoje fica todo desativado (`demoPage.available = false`), com o aviso;
 * o envio para o e-mail da LOCKONS ainda não existe. Campos, rótulos e preenchimento automático já
 * estão prontos para quando ele for ligado.
 */
export function DemoForm() {
  const { form, available } = demoPage;

  return (
    <div className={styles.card}>
      <LockBrackets />
      <div className={styles.head}>
        <span className={styles.mark}>
          <LogoMark idPrefix="demo-form" />
        </span>
        <h2 className={styles.title}>{form.title}</h2>
      </div>

      {!available && (
        <div id="demo-indisponivel" className={styles.notice} role="note">
          <Icon name="bell" className={styles.noticeIcon} />
          <span>
            <b>{form.unavailableTitle}</b>
            <span>{form.unavailableText}</span>
            <ContactLinks lead="Para conversar agora:" className={styles.noticeContact} />
          </span>
        </div>
      )}

      <form className={styles.form} aria-describedby={available ? undefined : "demo-indisponivel"} noValidate>
        <fieldset className={styles.fields} disabled={!available}>
          <legend className="visually-hidden">Seus dados para a demonstração</legend>

          <label className={styles.field}>
            <span>Nome completo</span>
            <input id="demo-nome" name="nome" type="text" autoComplete="name" required />
          </label>

          <label className={styles.field}>
            <span>E-mail de trabalho</span>
            <input id="demo-email" name="email" type="email" autoComplete="email" required />
          </label>

          <label className={styles.field}>
            <span>Telefone</span>
            <input id="demo-telefone" name="telefone" type="tel" autoComplete="tel" inputMode="tel" />
          </label>

          <label className={styles.field}>
            <span>Empresa</span>
            <input id="demo-empresa" name="empresa" type="text" autoComplete="organization" required />
          </label>

          <label className={styles.field}>
            <span>Quantas lojas?</span>
            <select id="demo-lojas" name="lojas" defaultValue="">
              <option value="" disabled>
                Escolha
              </option>
              {form.stores.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className={styles.field}>
            <span>Quantas pessoas vendem?</span>
            <select id="demo-equipe" name="equipe" defaultValue="">
              <option value="" disabled>
                Escolha
              </option>
              {form.team.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className={`${styles.field} ${styles.wide}`}>
            <span>
              O que você quer resolver? <em>(opcional)</em>
            </span>
            <textarea id="demo-mensagem" name="mensagem" rows={3} />
          </label>

          <label className={`${styles.consent} ${styles.wide}`}>
            <input id="demo-consentimento" name="consentimento" type="checkbox" required />
            <span>
              Concordo com a <Link href="/privacidade">Política de Privacidade</Link> e aceito ser contatado sobre a
              demonstração.
            </span>
          </label>

          <button type="submit" className={`${buttonClassName()} ${styles.submit}`} aria-disabled={!available}>
            {form.submit}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
