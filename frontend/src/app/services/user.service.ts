import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoggedUser, User, UserAuth, UserAuthResponse } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private url = `${environment.url}/users`;

  private readonly keyAuthToken = 'token';

  get accessToken() {
    return localStorage.getItem(this.keyAuthToken);
  }

  get loggedUser(): LoggedUser | null {
    const token = localStorage.getItem('token');

    return token ? this.parseJwt(token) : null;
  }

  private parseJwt(token: string) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  auth(body: UserAuth) {
    return this.http
      .post<UserAuthResponse>(`${this.url}/auth`, body)
      .pipe(tap((res) => localStorage.setItem(this.keyAuthToken, res.token)));
  }
}
