import { RenderMode, ServerRoute } from '@angular/ssr';
import { serverRoutes as embeddedPageServerRoutes } from './pages/embedded-page';

export const serverRoutes: ServerRoute[] = [
  ...embeddedPageServerRoutes,
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
