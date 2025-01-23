import { createCache } from 'cache-manager';
import type express from 'express';

/** @description Cache time-to-live in milliseconds, current: `5 minutes` */
const CACHE_TTL = 5 * 60 * 1_000;

const cache = createCache({ ttl: CACHE_TTL });

/**
 * @description Manages caching of responses for a given request.
 */
export class CacheResponseManager {
  async cacheResponse(
    request: express.Request,
    response: Response,
  ): Promise<void> {
    const { requestUrl, ...keys } = this.getKeys(request);

    console.info(`Caching response for ${requestUrl}`);

    await Promise.all([
      cache.set(keys.bodyKey, await response.clone().text()),
      cache.set(keys.statusKey, response.status),
      cache.set(keys.headersKey, JSON.stringify([...response.headers])),
    ]);
  }

  async getCachedResponse(
    request: express.Request,
  ): Promise<Response | undefined> {
    const { requestUrl, ...keys } = this.getKeys(request);

    const [cachedResponse, cachedStatus, cachedHeaders] = await Promise.all([
      cache.get<string>(keys.bodyKey),
      cache.get<number>(keys.statusKey),
      cache.get<string>(keys.headersKey),
    ]);

    if (!cachedResponse) return;

    console.info(`Serving cached response for ${requestUrl}`);

    return new Response(cachedResponse, {
      status: cachedStatus ?? 200,
      headers: new Headers(JSON.parse(cachedHeaders ?? '[]') as HeadersInit),
    });
  }

  private getKeys(request: express.Request) {
    const requestUrl = request.originalUrl || request.url;
    const keygen = (kind: string) => `__express__${requestUrl}__${kind}__`;

    return {
      requestUrl,
      bodyKey: keygen('body'),
      statusKey: keygen('status'),
      headersKey: keygen('headers'),
    };
  }
}
