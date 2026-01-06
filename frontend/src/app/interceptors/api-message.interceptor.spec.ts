import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { SnackBarType } from '../models/snack-bar';
import { apiMessageInterceptor } from './api-message.interceptor';

describe('apiMessageInterceptor', () => {
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const executeInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) =>
    TestBed.runInInjectionContext(() => apiMessageInterceptor(req, next));

  beforeEach(() => {
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', [
      'openFromComponent',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }],
    });

    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('não deve abrir snackbar quando não houver mensagem no erro', (done) => {
    const req = new HttpRequest('GET', '/test');

    const next: HttpHandlerFn = () =>
      throwError(() => ({ error: { other: 'x' } }));

    executeInterceptor(req, next).subscribe({
      error: () => {
        expect(snackBar.openFromComponent).not.toHaveBeenCalled();
        done();
      },
    });
  });

  it('deve abrir snackbar quando houver mensagem no erro', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = { error: { message: 'Erro de teste' } };

    const next: HttpHandlerFn = () => throwError(() => errorResponse);

    executeInterceptor(req, next).subscribe({
      error: () => {
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(
          SnackBarComponent,
          {
            data: {
              message: 'Erro de teste',
              type: SnackBarType.ERROR,
            },
          }
        );
        done();
      },
    });
  });

  it('deve passar a request adiante quando não houver erro', (done) => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => of(new HttpResponse({ body: 'ok' }));

    executeInterceptor(req, next).subscribe((res) => {
      const response = res as HttpResponse<any>;
      expect(response.body).toBe('ok');
      expect(snackBar.openFromComponent).not.toHaveBeenCalled();
      done();
    });
  });
});
