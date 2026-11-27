/**
 * O caminho atual está dentro de algum dos prefixos? Marca o item do menu como atual.
 * "/produto" casa com "/produto" e "/produto/funil-de-vendas", mas não com "/produtos".
 */
export function matchesPath(pathname: string, prefixes: readonly string[]): boolean {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
