import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';
import { ApiGetList } from '../models/api-get-list';
import { TimeEntry } from '../models/time-entries';
import { TimeEntryService } from './time-entry.service';

describe('TimeEntryService', () => {
  let service: TimeEntryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TimeEntryService,
      ],
    });

    service = TestBed.inject(TimeEntryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar os apontamentos de horas', () => {
    const mockResponse: ApiGetList<TimeEntry> = {
      hasNext: false,
      items: [
        {
          id: 1,
          idProject: 1,
          idUser: 1,
          date: '2025-01-01',
          hours: 8,
        },
        {
          id: 2,
          idProject: 2,
          idUser: 1,
          date: '2025-01-02',
          hours: 6,
        },
        {
          id: 3,
          idProject: 1,
          idUser: 2,
          date: '2025-01-03',
          hours: 8,
        },
      ],
      total: 3,
    };

    service.get().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/time-entries`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('deve criar um apontamento de horas', () => {
    const newTimeEntry: TimeEntry = {
      idProject: 1,
      idUser: 1,
      date: '2025-01-04',
      hours: 7,
    };
    const createdTimeEntry: TimeEntry = {
      id: 4,
      idProject: 1,
      idUser: 1,
      date: '2025-01-04',
      hours: 7,
      createdAt: '2025-01-04T00:00:00Z',
      updatedAt: '2025-01-04T00:00:00Z',
    };

    service.create(newTimeEntry).subscribe((res) => {
      expect(res).toEqual(createdTimeEntry);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/time-entries`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTimeEntry);

    req.flush(createdTimeEntry);
  });

  it('deve atualizar um apontamento de horas', () => {
    const id = 1;
    const updatedTimeEntry: Partial<TimeEntry> = {
      hours: 9,
      observations: 'Updated observation',
    };
    const returnedTimeEntry: TimeEntry = {
      id,
      idProject: 1,
      idUser: 1,
      date: '2025-01-01',
      hours: 9,
      observations: 'Updated observation',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-05T00:00:00Z',
    };

    service.update(id, updatedTimeEntry).subscribe((res) => {
      expect(res).toEqual(returnedTimeEntry);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/time-entries/${id}`
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTimeEntry);

    req.flush(returnedTimeEntry);
  });

  it('deve deletar um apontamento de horas', () => {
    const id = 1;
    service.delete(id).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/time-entries/${id}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
});
