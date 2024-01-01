"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const exchange_1 = require("./services/exchange");
function getService(serviceName, method = 'GET') {
    switch (serviceName) {
        case 'exchange':
            return exchange_1.exchange[method];
        default:
            return undefined;
    }
}
const server = (0, http_1.createServer)((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const serviceName = url.pathname.split('api/')[1];
    const service = getService(serviceName, request.method);
    if (service) {
        service(request, response);
    }
    else {
        response.writeHead(404).end();
    }
});
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Listening on ${port}/`);
});
