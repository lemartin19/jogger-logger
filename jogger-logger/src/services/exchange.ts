import { IncomingMessage, ServerResponse } from 'http';
import { request } from 'https';
import { Service } from './Service';

function exchangeToken(code: string) {
  const url = new URL(`https://www.strava.com/oauth/token`);
  url.searchParams.set('client_id', process.env.CLIENT_ID!);
  url.searchParams.set('client_secret', process.env.CLIENT_SECRET!);
  url.searchParams.set('code', code);
  url.searchParams.set('grant_type', 'authorization_code');

  console.log(`url: ${url}`);

  return new Promise((resolve, reject) => {
    let response = '';

    const req = request(url, { method: 'POST' }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Recieved status code "${res.statusCode}" from request for OAuth token.`));
      }

      res.on('data', (data) => {
        response += data;
      });

      res.on('close', () => {
        try {
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error(e);
      reject(e);
    });

    req.end();
  });
}

function POST(
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const code = url.searchParams.get('code');

  if (!code) {
    response
      .writeHead(400, { 'Content-Type': 'application/json' })
      .end(`Invalid code "${code}" provided`);
  } else {
    exchangeToken(code)
      .then((data) => {
        response
          .writeHead(200, {
            'Content-Type': 'application/json',
          })
          .end(data);
      })
      .catch((e) => {
        console.error(e);
        response.writeHead(500, { 'Content-Type': 'application/json' }).end(e.message);
      });
  }
}

export const exchange: Service = { POST };
