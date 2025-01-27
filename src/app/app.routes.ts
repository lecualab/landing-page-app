import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page').then((m) => m.HomePageComponent),
  },
  // Redirect to home when no route matches
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
