import { createServer } from 'http';
import { exchange } from './services/exchange';

function getService(serviceName: string, method: string = 'GET') {
  switch (serviceName) {
    case 'exchange':
      return exchange[method];
    default:
      return undefined;
  }
}

const server = createServer((request, response) => {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const serviceName = url.pathname.split('api/')[1];
  const service = getService(serviceName, request.method);
  if (service) {
    service(request, response);
  } else {
    response.writeHead(404).end();
  }
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Listening on ${port}/`);
});
