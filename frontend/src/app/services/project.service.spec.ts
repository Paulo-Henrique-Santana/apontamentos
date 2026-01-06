import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';
import { ApiGetList } from '../models/api-get-list';
import { Project } from '../models/project';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProjectService,
      ],
    });

    service = TestBed.inject(ProjectService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar os projetos', () => {
    const mockResponse: ApiGetList<Project> = {
      hasNext: false,
      items: [
        {
          id: 1,
          name: 'Projeto 1',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
        {
          id: 2,
          name: 'Projeto 2',
          createdAt: '2023-01-02T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
      ],
      total: 2,
    }

    service.get().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/projects`
    );
    expect(req.request.method).toBe('GET');
    
    req.flush(mockResponse);
  });

  it('deve excluir um projeto', () => {
    service.delete(1).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.url}/projects/1`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('deve criar um projeto', () => {
    const newProject: Project = {
      name: 'Novo Projeto',
    };
    const createdProject: Project = {
      id: 3,
      name: 'Novo Projeto',
      createdAt: '2023-01-03T00:00:00Z',
      updatedAt: '2023-01-03T00:00:00Z',
    };

    service.create(newProject).subscribe((res) => {
      expect(res).toEqual(createdProject);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/projects`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProject);

    req.flush(createdProject);
  })

  it('deve atualizar um projeto', () => {
    const bodyUpdateProject: Project = {
      id: 1,
      name: 'Projeto Atualizado',
    };
    const updatedProject: Project = {
      id: 1,
      name: 'Projeto Atualizado',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-04T00:00:00Z',
    };

    service.update(bodyUpdateProject).subscribe((res) => {
      expect(res).toEqual(updatedProject);
    });

    const req = httpTestingController.expectOne(
      `${environment.url}/projects/${updatedProject.id}`
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(bodyUpdateProject);

    req.flush(updatedProject);
  })
});
