#!/usr/bin/env node
// OrigenLab — capturador de páginas (full-page desktop @2x).
// Renderiza páginas LOCALES del repo (servidas en localhost) con Chromium headless.
// Uso:
//   1) npx playwright install chromium   (una sola vez)
//   2) (en la raíz del repo)  python3 -m http.server 8099 &
//   3) node _tools/capture.mjs            (lee _tools/pages.json)
//   o:  node _tools/capture.mjs "/ruta/" salida 1280 800 full
//
// Salida: PNG en _tools/_out/  (luego conviértelas a WebP con to-webp.py)

import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, '_tools', '_out');
const BASE = process.env.BASE_URL || 'http://localhost:8099';

// localizar el chromium-headless-shell de playwright (sandbox o ~/.cache)
function findShell() {
  const roots = [
    process.env.PLAYWRIGHT_BROWSERS_PATH,
    path.join(process.env.HOME || '', '.cache', 'ms-playwright'),
    '/sessions/exciting-brave-rubin/.cache/ms-playwright',
  ].filter(Boolean);
  for (const r of roots) {
    if (!fs.existsSync(r)) continue;
    const dir = fs.readdirSync(r).find(d => d.startsWith('chromium_headless_shell') || d.startsWith('chromium-'));
    if (!dir) continue;
    for (const cand of ['chrome-linux/headless_shell', 'chrome-linux/chrome']) {
      const p = path.join(r, dir, cand);
      if (fs.existsSync(p)) return p;
    }
  }
  return null; // deja que playwright use su default
}

async function shoot(browser, job) {
  const w = job.w || 1280, h = job.h || 800;
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const url = BASE + job.path;
  await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  await page.waitForTimeout(500); // deja asentar fuentes/lazy
  fs.mkdirSync(OUT, { recursive: true });
  const out = path.join(OUT, job.name + '.png');
  await page.screenshot({ path: out, fullPage: job.full !== false });
  await page.close();
  console.log('OK', job.name, '←', url);
}

(async () => {
  const exe = findShell();
  const browser = await chromium.launch(exe ? { executablePath: exe, args: ['--no-sandbox'] } : { args: ['--no-sandbox'] });

  let jobs;
  if (process.argv[2]) {
    jobs = [{ path: process.argv[2], name: process.argv[3] || 'shot', w: +process.argv[4] || 1280, h: +process.argv[5] || 800, full: process.argv[6] === 'full' }];
  } else {
    jobs = JSON.parse(fs.readFileSync(path.join(ROOT, '_tools', 'pages.json'), 'utf8'));
  }
  for (const j of jobs) {
    try { await shoot(browser, j); } catch (e) { console.error('FAIL', j.name, e.message); }
  }
  await browser.close();
})();
