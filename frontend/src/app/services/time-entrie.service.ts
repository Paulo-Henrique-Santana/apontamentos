import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiGetList } from '../models/api-get-list';
import { TimeEntrie, TimeEntrieParams } from '../models/time-entries';

@Injectable({
  providedIn: 'root',
})
export class TimeEntrieService {
  private http = inject(HttpClient);

  private url = `${environment.url}/time-entries`;

  get(params?: TimeEntrieParams) {
    return this.http.get<ApiGetList<TimeEntrie>>(this.url, {
      params: { ...params },
    });
  }
}
