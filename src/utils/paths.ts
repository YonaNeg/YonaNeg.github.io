// Public assets and navigation must include the repository prefix on Pages.
export function withBase(path: string = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + '/' + path.replace(/^\/+/, '');
}
