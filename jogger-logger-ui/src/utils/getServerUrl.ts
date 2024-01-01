export function getServerUrl(isDev: boolean, pathname: string = '/') {
  return isDev ? pathname : `https://localhost:8080/api${pathname}}`;
}
