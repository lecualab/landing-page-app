import { isDevMode } from '@angular/core';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { getContext } from '@netlify/angular-runtime/context';
import express from 'express';
import { Http2ServerRequest } from 'node:http2';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CacheResponseManager } from './cache.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const cacheResponseManager = new CacheResponseManager();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api{/*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('{/*splat}', async (req, res, next) => {
  // INFO: Avoid caching responses in development mode.
  if (isDevMode()) {
    await angularApp
      .handle(req)
      .then(async (response) => {
        if (!response) {
          next();
          return;
        }

        await writeResponseToNodeResponse(response, res);
      })
      .catch(next);

    return;
  }

  const cachedResponse = await cacheResponseManager.getCachedResponse(req);
  if (cachedResponse) {
    await writeResponseToNodeResponse(cachedResponse, res);
    return;
  }

  const response = await angularApp.handle(req).catch(next);
  if (!response) {
    next();
    return;
  }

  await cacheResponseManager.cacheResponse(req, response);
  await writeResponseToNodeResponse(response, res);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] ?? 4200;
  app.listen(port, () => {
    console.info(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);

/**
 * The request handler used by Netlify Functions.
 */
export async function netlifyAppEngineHandler(
  request: Http2ServerRequest,
): Promise<Response> {
  // TODO: Add caching
  const result = await angularApp.handle(request, getContext());
  return result ?? new Response('Not found', { status: 404 });
}
