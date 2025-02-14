import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page').then((m) => m.HomePageComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact-page').then((m) => m.ContactPageComponent),
  },
  // Redirect to home when no route matches
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
