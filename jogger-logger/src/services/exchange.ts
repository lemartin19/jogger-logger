import { IncomingMessage, ServerResponse } from 'http';
import { request } from 'https';
import { accessStravaApiSecret } from '../google-secrets';
import { Service } from './Service';

const CLIENT_ID = 96120;

function exchangeToken(code: string) {
  const urlPromise = accessStravaApiSecret().then((client_secret) => {
    const baseUrl = new URL(`https://www.strava.com/oauth/token`);
    baseUrl.searchParams.set('client_id', CLIENT_ID.toString());
    baseUrl.searchParams.set('client_secret', client_secret);
    baseUrl.searchParams.set('code', code);
    baseUrl.searchParams.set('grant_type', 'authorization_code');
    return baseUrl;
  });

  return new Promise((resolve, reject) => {
    urlPromise
      .then((url) => {
        let response = '';
        const req = request(url, { method: 'POST' }, (res) => {
          if (res.statusCode !== 200) {
            reject(
              new Error(`Recieved status code "${res.statusCode}" from request for OAuth token.`),
            );
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
      })
      .catch((e) => {
        reject(e);
      });
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
