import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiGetList } from '../models/api-get-list';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);

  private url = `${environment.url}/projects`;

  get() {
    return this.http.get<ApiGetList<Project>>(this.url);
  }
}
