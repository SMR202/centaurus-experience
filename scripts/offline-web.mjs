import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
const dist = path.resolve("dist");
async function list(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) =>
      e.isDirectory() ? list(path.join(dir, e.name)) : [path.join(dir, e.name)],
    ),
  );
  return nested.flat();
}
const files = (await list(dist))
  .filter((f) => !f.endsWith("sw.js"))
  .map((f) => "/" + path.relative(dist, f).replaceAll("\\", "/"));
const version = createHash("sha256")
  .update(files.join("|"))
  .digest("hex")
  .slice(0, 12);
const worker = `const CACHE='centaurus-${version}';const FILES=${JSON.stringify(files)};self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('centaurus-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('/index.html'):Response.error())));});`;
await writeFile(path.join(dist, "sw.js"), worker);
const file = path.join(dist, "index.html");
let html = await readFile(file, "utf8");
if (!html.includes('href="/favicon.svg"'))
  html = html.replace("</head>", '<link rel="icon" type="image/svg+xml" href="/favicon.svg"></head>');
if (!html.includes("centaurus-offline"))
  html = html.replace(
    "</body>",
    `<script id="centaurus-offline">if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{});}</script></body>`,
  );
await writeFile(file, html);
console.log(
  `Offline web cache prepared: ${files.length} assets. First visit needs localhost or HTTPS; later launches can work offline.`,
);
