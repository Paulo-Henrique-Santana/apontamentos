import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ApiGetList } from '../../models/api-get-list';
import { DialogSelectProjectData } from '../../models/dialog-select-project';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { DialogSelectProjectComponent } from './dialog-select-project.component';

describe('DialogSelectProjectComponent', () => {
  let component: DialogSelectProjectComponent;
  let fixture: ComponentFixture<DialogSelectProjectComponent>;
  let projectServiceSpy: jasmine.SpyObj<ProjectService>;

  const dialogData: DialogSelectProjectData = {
    selectedProjects: [],
  };

  beforeEach(async () => {
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['get']);

    TestBed.configureTestingModule({
      imports: [DialogSelectProjectComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: ProjectService, useValue: projectServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(DialogSelectProjectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar os projetos', () => {
    const mockResponse: ApiGetList<Project> = {
      items: [
        { id: 1, name: 'Projeto A' },
        { id: 2, name: 'Projeto B' },
      ],
      total: 2,
      hasNext: false,
    };
    projectServiceSpy.get.and.returnValue(of(mockResponse));

    spyOn(component, 'markSelectedProjects');

    fixture.detectChanges();

    expect(projectServiceSpy.get).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockResponse.items);
    expect(component.markSelectedProjects).toHaveBeenCalled();
  });

  it('deve marcar os projetos selecionados', () => {
    component.dataSource.data = [
      { id: 1, name: 'Projeto A' },
      { id: 2, name: 'Projeto B' },
      { id: 3, name: 'Projeto C' },
    ];
    component.data.selectedProjects = [{ id: 2, name: 'Projeto B' }];
    component.markSelectedProjects();

    expect(component.selection.selected.length).toBe(1);
    expect(component.selection.selected[0].id).toBe(2);
  })

  it('deve verificar se todos os projetos estão selecionados', () => {
    component.dataSource.data = [
      { id: 1, name: 'Projeto A' },
      { id: 2, name: 'Projeto B' },
      { id: 3, name: 'Projeto C' },
    ];

    component.selection.select(...component.dataSource.data);

    expect(component.isAllSelected()).toBeTrue();
  });

  it('deve selecionar todos os projetos', () => {
    component.dataSource.data = [
      { id: 1, name: 'Projeto A' },
      { id: 2, name: 'Projeto B' },
      { id: 3, name: 'Projeto C' },
    ];

    component.toggleAllRows();
    expect(component.selection.selected.length).toBe(3);
  })

  it('deve desmarcar todos os projetos', () => {
    component.dataSource.data = [
      { id: 1, name: 'Projeto A' },
      { id: 2, name: 'Projeto B' },
      { id: 3, name: 'Projeto C' },
    ];

    component.selection.select(...component.dataSource.data);

    component.toggleAllRows();
    expect(component.selection.selected.length).toBe(0);
  })
});
