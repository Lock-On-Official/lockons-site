"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import styles from "./AudienceTabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  panel: ReactNode;
}

interface AudienceTabsProps {
  tabs: readonly TabItem[];
  label: string;
}

/**
 * Abas acessíveis (padrão WAI-ARIA). Todos os painéis vêm no HTML do servidor, então o Google lê todos;
 * o cliente só alterna qual aparece.
 */
export function AudienceTabs({ tabs, label }: AudienceTabsProps) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function select(index: number) {
    setActive(index);
    buttons.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = tabs.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key]);
    }
  }

  return (
    <div className={styles.tabs}>
      <div role="tablist" aria-label={label} className={styles.list}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={index === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={index !== active}
          tabIndex={0}
          className={styles.panel}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
