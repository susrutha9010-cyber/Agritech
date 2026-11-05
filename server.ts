import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { apiRouter } from './server/api.ts';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Authoritative Backend API Router
app.use('/api', apiRouter);

async function startFullStackServer() {
  if (!isProd) {
    // Development mode: mount Vite middleware for zero-lag SPA compilation & asset serving
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve static build assets from /dist
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(
      `🌾 HarvestBridge Full-Stack Server active on http://0.0.0.0:${port} [environment: ${
        isProd ? 'production' : 'development'
      }]`
    );
  });
}

startFullStackServer();
