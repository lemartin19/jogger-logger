import { IncomingMessage, RequestListener, ServerResponse } from 'http';

export interface Service {
  [key: string]: RequestListener<typeof IncomingMessage, typeof ServerResponse>;
}
