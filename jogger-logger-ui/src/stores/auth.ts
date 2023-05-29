import type { VueCookies } from 'vue-cookies';

export function getIsAuthed(cookies: VueCookies) {
  const { VITE_AUTH_COOKIE } = import.meta.env;
  return Boolean(cookies.get(VITE_AUTH_COOKIE));
}
