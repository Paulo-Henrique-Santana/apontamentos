import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register-user/register-user.component').then(
        (m) => m.RegisterUserComponent
      ),
  },
];
