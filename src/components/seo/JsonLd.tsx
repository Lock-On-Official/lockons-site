interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Dados estruturados (schema.org) para o Google. */
export function JsonLd({ data }: JsonLdProps) {
  // Escapa "<" para um texto com "</script>" não fechar a tag antes da hora.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
