// A local file server for the static export, not a commerce backend.
import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { dirname, extname, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../out")
const port = Number(process.env.PORT || 8000)
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

try {
  await stat(resolve(root, "index.html"))
} catch {
  console.error("Static export missing. Run npm run build first.")
  process.exit(1)
}

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end()
    return
  }
  let file
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname
    )
    file = resolve(root, `.${pathname}`)
    if (file !== root && !file.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end()
      return
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html")
    const content = await readFile(file)
    response.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
    })
    response.end(request.method === "HEAD" ? undefined : content)
  } catch {
    const content = await readFile(resolve(root, "404.html"))
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
    response.end(request.method === "HEAD" ? undefined : content)
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Static demo: http://localhost:${port}`)
)
