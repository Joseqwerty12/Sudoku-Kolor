const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8087;
// Servir archivos desde el directorio actual (donde se ejecuta el script)
const baseDir = __dirname;

console.log(`Iniciando servidor en http://localhost:${port}`);
console.log(`Sirviendo archivos desde: ${baseDir}`);

http.createServer((req, res) => {
    // Normalizar la URL para quitar query strings si los hay
    const urlPath = req.url.split('?')[0];

    // Si la URL es '/', servir index.html
    let filePath = path.join(baseDir, urlPath === '/' ? 'index.html' : urlPath);

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.ico': contentType = 'image/x-icon'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                console.log(`404: ${filePath}`);
                res.writeHead(404);
                res.end('404 Not Found');
            }
            else {
                console.log(`500: ${error.code} para ${filePath}`);
                res.writeHead(500);
                res.end('500 Internal Server Error: ' + error.code);
            }
        } else {
            console.log(`200: ${filePath}`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(port);
