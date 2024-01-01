"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const assets_1 = require("./services/assets");
const exchange_1 = require("./services/exchange");
function getService(pathname, method = 'GET') {
    switch (pathname) {
        case '/exchange':
            return exchange_1.exchange[method];
        default:
            return assets_1.assets[method];
    }
}
const server = (0, http_1.createServer)((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const service = getService(url.pathname, request.method);
    if (service) {
        service(request, response);
    }
    else {
        response.writeHead(404).end();
    }
});
const hostname = 'localhost';
const port = 3001;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
