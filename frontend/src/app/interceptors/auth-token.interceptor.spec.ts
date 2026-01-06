import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { authTokenInterceptor } from './auth-token.interceptor';

describe('authTokenInterceptor', () => {
  let userService: jasmine.SpyObj<any>;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authTokenInterceptor(req, next));

  beforeEach(() => {
    const userSpy = jasmine.createSpyObj('UserService', [], {
      accessToken: null,
    });

    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userSpy }],
    });

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('deve adicionar o authorization no header quando hourver o token de acesso', (done) => {
    Object.defineProperty(userService, 'accessToken', {
      get: () => 'fake-token',
    });

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('authorization')).toBe('Bearer fake-token');
      return of(new HttpResponse({ status: 200, body: 'ok' }));
    };

    interceptor(req, next).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('não deve adicionar o authorization no header quando não houver o token de acesso', (done) => {
    Object.defineProperty(userService, 'accessToken', {
      get: () => null,
    });

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('authorization')).toBe(null);
      return of(new HttpResponse({ status: 200, body: 'ok' }));
    };

    interceptor(req, next).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });
});
