import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    data: { hideToolbar: true },
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/register-user/register-user.component').then(
        (m) => m.RegisterUserComponent
      ),
    data: { hideToolbar: true },
  },
  {
    path: 'projetos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
  },
  { path: '**', redirectTo: 'projetos' }
];
