import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LoggedUser, User, UserAuth, UserAuthResponse } from '../models/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), UserService],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  it('deve retornar o token do localStorage', () => {
    localStorage.setItem('token', 'meu-token-mock');

    expect(service.accessToken).toBe('meu-token-mock');
  });

  it('deve retornar null se não houver token', () => {
    expect(service.loggedUser).toBeNull();
  });

  it('deve retornar o usuário decodificado se houver token', () => {
    const mockUser: LoggedUser = {
      userId: 1,
      name: 'Teste',
      email: 'teste@teste.com',
      exp: 1234567890,
      iat: 1234567890,
    };
    const payload = btoa(JSON.stringify(mockUser));
    const fakeToken = `header.${payload}.signature`;

    localStorage.setItem('token', fakeToken);

    expect(service.loggedUser).toEqual(mockUser);
  });

  it('deve cadastrar o usuário', () => {
    const mockUser: User = {
      id: 1,
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456',
    };

    service.register(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${environment.url}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('deve autenticar o usuário e salvar o token no localStorage', () => {
    const body: UserAuth = {
      email: 'teste@teste.com',
      password: '123456',
    };
    const mockResponse: UserAuthResponse = { token: 'token-mock' };

    const setItemSpy = spyOn(localStorage, 'setItem').and.callThrough();

    service.auth(body).subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(setItemSpy).toHaveBeenCalledWith('token', mockResponse.token);
    });

    const req = httpTestingController.expectOne(`${environment.url}/users/auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);
  });
});
