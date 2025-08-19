import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { SnackBarData, SnackBarType } from '../models/snack-bar';

export const apiMessageInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    tap({
      error: (res) => {
        const body = res.error as { message?: string };

        if (body.message) {
          const data: SnackBarData = {
            message: body.message,
            type: SnackBarType.ERROR
          }

          snackBar.openFromComponent(SnackBarComponent, {
            data,
          });
        }
      },
    })
  );
};
