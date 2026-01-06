import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;
  let executeGuard: CanActivateFn;

  beforeEach(() => {
    const userSpy = jasmine.createSpyObj('UserService', [], {
      accessToken: null,
    });
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    executeGuard = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('deve retornar true quando houver accessToken', () => {
    Object.defineProperty(userService, 'accessToken', {
      get: () => 'fake-token',
    });

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
  });

  it('deve redirecionar para login quando não houver accessToken', () => {
    Object.defineProperty(userService, 'accessToken', { get: () => null });
    const fakeUrlTree = {} as any;
    router.createUrlTree.and.returnValue(fakeUrlTree);

    const result = executeGuard({} as any, {} as any);

    expect(router.createUrlTree).toHaveBeenCalledWith(['login']);
    expect(result).toBe(fakeUrlTree);
  });
});
