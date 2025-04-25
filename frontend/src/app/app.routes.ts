import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
    data: { hideToolbar: true },
  },
];
