import { Routes } from '@angular/router';
import { RenderMode, ServerRoute } from '@angular/ssr';
import {
  EMBEDDED_VIEWS,
  embeddedRenderResolver,
} from './components/embedded-render';

export const routes: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./embedded-page.component').then((m) => m.EmbeddedPageComponent),
    resolve: {
      embeddedRender: embeddedRenderResolver,
    },
  },
  // Redirect to home when no route matches
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

export const serverRoutes: readonly ServerRoute[] = [
  {
    path: 'embedded/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () =>
      Promise.resolve(EMBEDDED_VIEWS.map(({ id }) => ({ id }))),
  },
];
