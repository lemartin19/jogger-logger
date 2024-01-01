import { createServer } from 'http';
import { exchange } from './services/exchange';

function getService(pathname: string, method: string = 'GET') {
  switch (pathname) {
    case '/exchange':
      return exchange[method];
    default:
      return null;
  }
}

const server = createServer((request, response) => {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const service = getService(url.pathname, request.method);
  if (service) {
    service(request, response);
  } else {
    response.writeHead(404).end();
  }
});

const hostname = 'localhost';
const port = 3001;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
