import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User, UserAuth, UserAuthResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  private url = `${environment.url}/users`;

  register(user: User) {
    return this.http.post<User>(this.url, user);
  }

  auth(body: UserAuth) {
    return this.http.post<UserAuthResponse>(`${this.url}/auth`, body);
  }
}
