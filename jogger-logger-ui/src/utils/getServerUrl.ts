export function getServerUrl(isDev: boolean, pathname: string = '/') {
  return isDev ? `https://localhost:8080/api${pathname}}` : `/api${pathname}`;
}
