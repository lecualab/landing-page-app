import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-page').then((m) => m.routes),
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact-page').then((m) => m.routes),
  },
  // Redirect to home when no route matches
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
