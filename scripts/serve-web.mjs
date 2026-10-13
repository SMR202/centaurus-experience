import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve("dist");
const port = Number(process.env.PORT || 8094);
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ttf": "font/ttf",
};
http
  .createServer((req, res) => {
    let name;
    try {
      name = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      res.writeHead(400).end();
      return;
    }
    let file = path.resolve(root, "." + name);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403).end();
      return;
    }
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory())
      file = path.join(root, "index.html");
    res.setHeader(
      "Content-Type",
      mime[path.extname(file)] || "application/octet-stream",
    );
    res.setHeader("Cache-Control", "no-cache");
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, "0.0.0.0", () =>
    console.log(`Centaurus preview: http://localhost:${port}`),
  );
