import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ActivationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router);

  showToolbar = false;

  menus = [
    { name: 'Projetos', icon: 'assignment', route: '/projetos' },
    { name: 'Apontamentos', icon: 'schedule', route: '/apontamentos' },
  ];

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof ActivationStart))
      .subscribe((event) => {
        this.showToolbar = !event?.snapshot?.routeConfig?.data?.['hideToolbar'];
      });
  }
}
