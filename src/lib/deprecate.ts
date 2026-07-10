const warned = new Set<string>();

/**
 * Dev-only, once-per-key deprecation warning (D-49: keep the old API working
 * + warn for one minor, remove the next).
 */
export function deprecate(key: string, message: string): void {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  if (env === 'production') return;
  if (warned.has(key)) return;
  warned.add(key);
  // eslint-disable-next-line no-console
  console.warn(`[@ornie/react] ${message}`);
}
