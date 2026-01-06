import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ApiGetList } from '../../models/api-get-list';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['get', 'delete']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        provideHttpClient(), 
        provideHttpClientTesting(),
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    })

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar os projetos', () => {
    const mockProjects: ApiGetList<Project> = {
      items: [
        { id: 1, name: 'Project 1' },
        { id: 2, name: 'Project 2' },
      ],
      total: 2,
      hasNext: false,
    }

    projectServiceSpy.get.and.returnValue(of(mockProjects));

    component.getProjects();

    expect(projectServiceSpy.get).toHaveBeenCalled();
    expect(component.projects).toBe(mockProjects.items);
  });

  it('deve abrir o dialog de deletar projeto e ao fechar chamar o método de deletar', () => {
    const mockProject: Project = { id: 1, name: 'Projeto 1' };
    const afterClosedSpy = jasmine.createSpyObj({ afterClosed: of(true) });

    dialogSpy.open.and.returnValue(afterClosedSpy);
    spyOn(component, 'deleteProject');

    component.openDeleteDialog(mockProject);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(afterClosedSpy.afterClosed).toHaveBeenCalled();
    expect(component.deleteProject).toHaveBeenCalledWith(mockProject);
  });

  it('deve abrir o dialog de deletar projeto e ao fechar não chamar o método de deletar', () => {
    const mockProject: Project = { id: 1, name: 'Projeto 1' };
    const afterClosedSpy = jasmine.createSpyObj({ afterClosed: of(null) });

    dialogSpy.open.and.returnValue(afterClosedSpy);
    spyOn(component, 'deleteProject');

    component.openDeleteDialog(mockProject);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(afterClosedSpy.afterClosed).toHaveBeenCalled();
    expect(component.deleteProject).toHaveBeenCalledTimes(0);
  });
});
