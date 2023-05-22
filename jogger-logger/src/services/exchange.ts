import { IncomingMessage, ServerResponse } from 'http';
import { Service } from './Service';

function GET(
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) {
  response
    .writeHead(200, {
      'Content-Type': 'application/json',
    })
    .end(JSON.stringify({ data: 'test' }));
}

export const exchange: Service = { GET };
