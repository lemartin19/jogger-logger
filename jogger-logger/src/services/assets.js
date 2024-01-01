"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assets = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function getContentType(filePath) {
    switch (path_1.default.extname(filePath)) {
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
const DIST_DIR = path_1.default.join(__dirname, '../../dist');
function GET(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const isAsset = url.pathname.startsWith('/assets');
    const filePath = isAsset ? path_1.default.join(DIST_DIR, url.pathname) : path_1.default.join(DIST_DIR, 'index.html');
    const contentType = getContentType(filePath);
    fs_1.default.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                response.writeHead(404).end(`File '${url.pathname}' not found`);
            }
            else {
                response.writeHead(500).end(`Sorry, check with the site admin for error: ${error.code}`);
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType }).end(content, 'utf-8');
        }
    });
}
exports.assets = { GET };
