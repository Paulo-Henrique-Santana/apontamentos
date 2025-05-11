import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userSerivce = inject(UserService);
  const router = inject(Router);

  return userSerivce.accessToken ? true : router.createUrlTree(['login']);
};
