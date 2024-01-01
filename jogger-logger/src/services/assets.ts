import fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import { Service } from './Service';

function getContentType(filePath: string) {
  switch (path.extname(filePath)) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    case '.wav':
      return 'audio/wav';
    case '.woff':
      return 'font/woff';
    case '.woff2':
      return 'font/woff2';
    case '.ttf':
      return 'font/ttf';
    default:
      return 'text/html';
  }
}

const DIST_DIR = path.join(__dirname, '../../dist');

function GET(
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const isAsset = url.pathname.startsWith('/assets');
  const filePath = isAsset ? path.join(DIST_DIR, url.pathname) : path.join(DIST_DIR, 'index.html');
  const contentType = getContentType(filePath);

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        response.writeHead(404).end(`File '${url.pathname}' not found`);
      } else {
        response.writeHead(500).end(`Sorry, check with the site admin for error: ${error.code}`);
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType }).end(content, 'utf-8');
    }
  });
}

export const assets: Service = { GET };
