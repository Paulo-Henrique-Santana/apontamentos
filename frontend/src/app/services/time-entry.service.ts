import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiGetList } from '../models/api-get-list';
import { TimeEntry, TimeEntryParams } from '../models/time-entries';

@Injectable({
  providedIn: 'root',
})
export class TimeEntryService {
  private http = inject(HttpClient);

  private url = `${environment.url}/time-entries`;

  get(params?: TimeEntryParams) {
    return this.http.get<ApiGetList<TimeEntry>>(this.url, {
      params: { ...params },
    });
  }

  create(timeEntry: TimeEntry) {
    return this.http.post<TimeEntry>(this.url, timeEntry);
  }

  update(id: number, timeEntry: TimeEntry) {
    return this.http.put<TimeEntry>(`${this.url}/${id}`, timeEntry);
  }

  delete(id: number) {
    return this.http.delete<TimeEntry>(`${this.url}/${id}`);
  }
}
