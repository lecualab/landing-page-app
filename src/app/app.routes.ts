import { Routes } from '@angular/router';
import { EMBEDDED_VIEWS } from './pages/embedded-page/components/embedded-render';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-page').then((m) => m.routes),
  },
  {
    path: 'contact',
    redirectTo: () => `embedded/${EMBEDDED_VIEWS[0].id}`,
  },
  {
    path: 'embedded',
    loadChildren: () => import('./pages/embedded-page').then((m) => m.routes),
  },
  // Redirect to home when no route matches
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
