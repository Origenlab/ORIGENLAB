#!/usr/bin/env bash
# Servidor local de previsualización para ORIGENLAB (sitio estático).
# Uso:  bash _serve.sh [puerto]   (default 8080)
# Stop: Ctrl+C
set -euo pipefail

PORT="${1:-8080}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

URL="http://localhost:${PORT}"
echo "ORIGENLAB → sirviendo  $ROOT"
echo "URL:  $URL"
echo "Stop: Ctrl+C"
echo

# Abrir navegador (macOS)
( sleep 1; command -v open >/dev/null && open "$URL" ) >/dev/null 2>&1 &

# http.server con cache deshabilitado (clave por el workflow de cache-buster).
exec python3 - "$PORT" <<'PY'
import http.server, socketserver, sys

PORT = int(sys.argv[1])

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      ".avif": "image/avif", ".webp": "image/webp",
                      ".svg": "image/svg+xml", ".js": "text/javascript"}
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()
    def log_message(self, fmt, *args):
        sys.stderr.write("  %s\n" % (fmt % args))

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nstop.")
PY
