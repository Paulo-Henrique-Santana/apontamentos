import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userSerivce = inject(UserService);
  const { accessToken } = userSerivce;

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: { authorization: `Bearer ${accessToken}` },
    });

    return next(clonedRequest);
  }

  return next(req);
};
