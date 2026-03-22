/**
 * Статика SPA под префиксом HUB_MOUNT (по умолчанию /hub).
 * Сборка и старт должны совпадать: HUB_MOUNT=/hub npm run build && HUB_MOUNT=/hub npm start
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');
const PORT = Number(process.env.PORT) || 3000;
const rawMount = (process.env.HUB_MOUNT || '/hub').trim();
const MOUNT = rawMount.startsWith('/') ? rawMount : `/${rawMount}`;

const app = express();

// Без 302 на /hub/ — иначе цикл, если прокси (nginx) срезает слэш или шлёт на бэкенд URI как "/".
app.get('/', (_req, res) => {
  res
    .type('html')
    .send(
      '<!DOCTYPE html><meta charset="utf-8"><title>AI HUB</title><p><a href="/hub/">Открыть /hub/</a></p>',
    );
});

app.get(MOUNT, (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.use(
  MOUNT,
  express.static(dist, { index: 'index.html', redirect: false }),
);

app.use(MOUNT, (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(PORT, () => {
  const host = process.env.PUBLIC_HOST || 'localhost';
  console.log(`Сайт: http://${host}:${PORT}${MOUNT}/`);
});
