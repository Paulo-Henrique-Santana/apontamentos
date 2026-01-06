import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogSelectProjectComponent } from '../../components/dialog-select-project/dialog-select-project.component';
import { DialogTimeEntryObservationsComponent } from '../../components/dialog-time-entry-observations/dialog-time-entry-observations.component';
import { ApiGetList } from '../../models/api-get-list';
import { Project } from '../../models/project';
import { TimeEntry, TimeEntryParams } from '../../models/time-entries';
import { TimeTrackingItemTable } from '../../models/time-tracking';
import { TimeEntryService } from '../../services/time-entry.service';
import { UserService } from '../../services/user.service';
import { DateUtils } from '../../utils/date-utils';
import { TimeTrackingComponent } from './time-tracking.component';

describe('TimeTrackingComponent', () => {
  let component: TimeTrackingComponent;
  let fixture: ComponentFixture<TimeTrackingComponent>;
  let timeEntryServiceSpy: jasmine.SpyObj<TimeEntryService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    timeEntryServiceSpy = jasmine.createSpyObj('TimeEntryService', [
      'get',
      'update',
      'create',
      'delete',
    ]);
    userServiceSpy = jasmine.createSpyObj('UserService', ['get'], {
      loggedUser: { userId: 999 },
    });
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [TimeTrackingComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TimeEntryService, useValue: timeEntryServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    });

    fixture = TestBed.createComponent(TimeTrackingComponent);
    component = fixture.componentInstance;

    component.table = { renderRows: jasmine.createSpy('renderRows') } as any;
    component.weekDays = component.getWeekDays(new Date('2025-10-15'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar os apontamentos passando o primeiro e último dia da semana selecionada como parâmetro', () => {
    const mockResponse: ApiGetList<TimeEntry> = {
      items: [
        {
          id: 1,
          idProject: 1,
          date: '2024-06-10',
          hours: 8,
          idUser: 1,
        },
        {
          id: 2,
          idProject: 1,
          date: '2024-06-11',
          hours: 8,
          idUser: 1,
        },
      ],
      total: 1,
      hasNext: false,
    };

    spyOn(component, 'addTimeEntriesToTable');
    timeEntryServiceSpy.get.and.returnValue(of(mockResponse));

    fixture.detectChanges();

    const params: TimeEntryParams = {
      startDate: DateUtils.dateToString(component.weekDays[0].date),
      endDate: DateUtils.dateToString(component.weekDays[6].date),
    };

    expect(timeEntryServiceSpy.get).toHaveBeenCalledWith(params);
    expect(component.addTimeEntriesToTable).toHaveBeenCalled();
  });

  it('deve adicionar os apontamentos na tabela', () => {
    const project1 = { id: 1, name: 'Project A' };
    const project2 = { id: 2, name: 'Project B' };

    const timeEntries: TimeEntry[] = [
      {
        id: 1,
        idProject: 1,
        date: '2025-10-15',
        hours: 8,
        idUser: 1,
        project: project1,
      },
      {
        id: 2,
        idProject: 1,
        date: '2025-10-16',
        hours: 9,
        idUser: 1,
        project: project1,
      },
      {
        id: 3,
        idProject: 2,
        date: '2025-10-17',
        hours: 6,
        idUser: 1,
        project: project2,
      },
      {
        id: 4,
        idProject: 1,
        date: '2025-10-17',
        hours: 2,
        idUser: 1,
        project: project1,
      },
    ];

    component.addTimeEntriesToTable(timeEntries);

    expect(component.timeEntries.length).toBe(2);

    expect(component.timeEntries[0].project.id).toBe(1);
    expect(component.timeEntries[0].qua?.hours).toBe(8);
    expect(component.timeEntries[0].qui?.hours).toBe(9);
    expect(component.timeEntries[0].sex?.hours).toBe(2);

    expect(component.timeEntries[1].project.id).toBe(2);
    expect(component.timeEntries[1].sex?.hours).toBe(6);

    expect(component.table.renderRows).toHaveBeenCalled();
  });

  it('deve alterar as datas para a semana seguinte', () => {
    const lastDate = component.weekDays[component.weekDays.length - 1].date;
    const expectedDate = new Date(lastDate);
    expectedDate.setDate(expectedDate.getDate() + 1);

    spyOn(component, 'changeWeek');

    component.nextWeek();

    expect(component.changeWeek).toHaveBeenCalledWith(expectedDate);
  });

  it('deve alterar as datas para a semana anterior', () => {
    const lastDate = component.weekDays[0].date;
    const expectedDate = new Date(lastDate);
    expectedDate.setDate(expectedDate.getDate() - 1);

    spyOn(component, 'changeWeek');

    component.lastWeek();

    expect(component.changeWeek).toHaveBeenCalledWith(expectedDate);
  });

  it('deve alterar as datas para a semana atual', () => {
    const expectedDate = new Date();

    spyOn(component, 'changeWeek');

    component.currentWeek();

    expect(component.changeWeek).toHaveBeenCalledWith(expectedDate);
  });

  it('deve alterar as datas para uma determinada semana', () => {
    const date = new Date('2025-11-05');

    spyOn(component, 'updateIsCurrentWeek');
    spyOn(component, 'getTimeEntries');

    component.changeWeek(date);

    expect(component.weekDays).toEqual(component.getWeekDays(date));
    expect(component.updateIsCurrentWeek).toHaveBeenCalled();
    expect(component.getTimeEntries).toHaveBeenCalled();
  });

  it('deve abrir o dialog com os projetos selecionados', () => {
    component.timeEntries = [
      { project: { id: 1, name: 'Project A' } },
      { project: { id: 2, name: 'Project B' } },
    ];

    dialogSpy.open.and.returnValue({
      afterClosed: () => of(undefined),
    } as any);

    component.openSelectProjectsDialog();

    expect(dialogSpy.open).toHaveBeenCalledWith(DialogSelectProjectComponent, {
      data: {
        selectedProjects: component.timeEntries.map((item) => item.project),
      },
    });
  });

  it('deve chamar onSelectProjects quando houver retorno de projetos', () => {
    const projectsMock: Project[] = [{ id: 1, name: 'Novo Projeto' }];

    spyOn(component, 'onSelectProjects');

    dialogSpy.open.and.returnValue({
      afterClosed: () => of(projectsMock),
    } as any);

    component.openSelectProjectsDialog();

    expect(component.onSelectProjects).toHaveBeenCalledWith(projectsMock);
  });

  it('deve adicionar na lista projetos selecionados não listados', () => {
    component.timeEntries = [
      {
        project: { id: 1, name: 'Project A' },
        qui: { hours: 5, date: '2025-11-14', idProject: 1, idUser: 1, id: 10 },
      },
    ];
    const selectedProjectsMock: Project[] = [
      { id: 1, name: 'Project A' },
      { id: 2, name: 'Project B' },
    ];

    component.onSelectProjects(selectedProjectsMock);

    expect(component.timeEntries.length).toBe(2);
    expect(component.timeEntries[1].project.id).toBe(2);
  });

  it('deve manter projetos com horas e adicionar novos projetos sem horas', () => {
    component.weekDays = [
      { label: 'qua', date: new Date() },
      { label: 'qui', date: new Date() },
    ];

    const project1: Project = { id: 1, name: 'Project A' };
    const project2: Project = { id: 2, name: 'Project B' };
    const project3: Project = { id: 3, name: 'Project C' };

    component.timeEntries = [
      {
        project: project1,
        qua: { hours: 8 },
      } as any,
      {
        project: project2,
      } as any,
    ];

    const selectedProjects = [project1, project3];

    component.onSelectProjects(selectedProjects);

    expect(component.timeEntries.length).toBe(2);
    expect(component.timeEntries[0].project.id).toBe(1);
    expect(component.timeEntries[1].project.id).toBe(3);
    expect(component.timeEntries[1].qua).toBeUndefined();
    expect(component.timeEntries[1].qui).toBeUndefined();
    expect(component.table.renderRows).toHaveBeenCalled();
  });

  describe('onChangeTimeEntry', () => {
    let element: any;
    let weekDay: any;

    const mockEvent = (value: string) => {
      return { target: { value } } as unknown as Event;
    };

    beforeEach(() => {
      element = {
        project: { id: 1 },
        seg: { id: 10, hours: 4 },
      };

      weekDay = { label: 'seg', date: new Date('2025-11-14') };
    });

    it('deve chamar deleteTimeEntry quando hours é vazio e existe id', () => {
      spyOn(component, 'deleteTimeEntry');

      component.onChangeTimeEntry(element, weekDay, mockEvent(''));

      expect(component.deleteTimeEntry).toHaveBeenCalledOnceWith(
        10,
        element,
        weekDay
      );
    });

    it('deve limpar input quando hours é vazio e NÃO existe id', () => {
      const elementNoId = { project: { id: 1 }, seg: undefined } as any;
      const event = mockEvent('');

      spyOn(component, 'deleteTimeEntry');

      component.onChangeTimeEntry(elementNoId, weekDay, event);

      expect((event.target as HTMLInputElement).value).toBe('');
      expect(component.deleteTimeEntry).not.toHaveBeenCalled();
    });

    it('deve chamar addTimeEntry quando id não existe', () => {
      const elementNoId = { project: { id: 1 }, seg: undefined } as any;

      spyOn(component, 'addTimeEntry');

      component.onChangeTimeEntry(elementNoId, weekDay, mockEvent('3'));

      expect(component.addTimeEntry).toHaveBeenCalled();
    });

    it('deve chamar updateTimeEntry quando existe id e hours > 0', () => {
      spyOn(component, 'updateTimeEntry');

      component.onChangeTimeEntry(element, weekDay, mockEvent('7'));

      expect(component.updateTimeEntry).toHaveBeenCalled();
    });
  });

  it('deve chamar timeEntryService.create e atualizar element com o retorno', () => {
    const weekDay = { label: 'qua', date: new Date('2025-11-19') };

    const element: TimeTrackingItemTable = {
      project: { id: 1, name: 'Projeto A' },
    };

    const timeEntry: TimeEntry = {
      hours: 5,
      date: '2025-11-19',
      idProject: element.project.id!,
      idUser: userServiceSpy.loggedUser!.userId,
    };

    const fakeResponse: TimeEntry = {
      id: 99,
      hours: 5,
      date: timeEntry.date,
      idProject: timeEntry.idProject,
      idUser: timeEntry.idUser,
    };

    timeEntryServiceSpy.create.and.returnValue(of(fakeResponse));

    component.addTimeEntry(timeEntry, element, weekDay);

    expect(timeEntryServiceSpy.create).toHaveBeenCalledWith(timeEntry);
    expect(element[weekDay.label as keyof typeof element]).toEqual({
      ...fakeResponse,
      project: element.project,
    });
  });

  it('deve chamar timeEntryService.update e atualizar element com o retorno', () => {
    const weekDay = { label: 'qua', date: new Date('2025-11-19') };

    const element: TimeTrackingItemTable = {
      project: { id: 1, name: 'Projeto A' },
    };

    const timeEntry: TimeEntry = {
      id: 55,
      hours: 5,
      date: '2025-11-19',
      idProject: element.project.id!,
      idUser: userServiceSpy.loggedUser!.userId,
    };

    const fakeResponse: TimeEntry = {
      id: 55,
      hours: 5,
      date: timeEntry.date,
      idProject: timeEntry.idProject,
      idUser: timeEntry.idUser,
    };

    timeEntryServiceSpy.update.and.returnValue(of(fakeResponse));

    component.updateTimeEntry(timeEntry, element, weekDay);

    expect(timeEntryServiceSpy.update).toHaveBeenCalledWith(
      timeEntry.id!,
      timeEntry
    );
    expect(element[weekDay.label as keyof typeof element]).toEqual(
      fakeResponse
    );
  });

  it('deve chamar timeEntryService.delete e deletar o registro do element', () => {
    const weekDay = { label: 'qua', date: new Date('2025-11-19') };

    const element: TimeTrackingItemTable = {
      project: { id: 1, name: 'Projeto A' },
    };

    const timeEntry: TimeEntry = {
      id: 55,
      hours: 5,
      date: '2025-11-19',
      idProject: element.project.id!,
      idUser: userServiceSpy.loggedUser!.userId,
    };

    timeEntryServiceSpy.delete.and.returnValue(of(undefined));

    component.deleteTimeEntry(timeEntry.id!, element, weekDay);

    expect(timeEntryServiceSpy.delete).toHaveBeenCalledWith(timeEntry.id!);
    expect(element[weekDay.label as keyof typeof element]).toEqual(undefined);
  });

  it('deve abrir o dialog de observações passando dados do apontamento e chamar', () => {
    const timeEntry: TimeEntry = {
      project: { id: 1, name: 'Project A' },
      id: 10,
      idProject: 1,
      idUser: 1,
      date: '2025-11-14',
      hours: 8,
      observations: 'Alguma observação',
    };

    spyOn(component, 'onCloseModalObservations');

    component.openModalObservations(timeEntry);

    expect(dialogSpy.open).toHaveBeenCalledWith(
      DialogTimeEntryObservationsComponent,
      {
        data: {
          projectName: timeEntry.project?.name,
          date: timeEntry.date,
          observations: timeEntry.observations,
        },
        width: '500px',
      }
    );
    expect(component.onCloseModalObservations).toHaveBeenCalled();
  });

  describe('onCloseModalObservations', () => {
    it('deve atualizar as observações quando o dialog retornar uma string', () => {
      const timeEntry: TimeEntry = {
        id: 10,
        idProject: 1,
        idUser: 1,
        date: '2025-11-14',
        hours: 8,
        observations: 'Observação antiga',
        project: { id: 1, name: 'Project A' },
      };

      const newObservations = 'Nova observação';
      const updatedTimeEntry: TimeEntry = {
        ...timeEntry,
        observations: newObservations,
      };

      const dialogRefMock = {
        afterClosed: () => of(newObservations),
      } as any;

      timeEntryServiceSpy.update.and.returnValue(of(updatedTimeEntry));

      component.onCloseModalObservations(dialogRefMock, timeEntry);

      expect(timeEntryServiceSpy.update).toHaveBeenCalledWith(timeEntry.id!, {
        observations: newObservations,
      });
      expect(timeEntry.observations).toBe(newObservations);
    });

    it('não deve atualizar quando o dialog não retornar uma string', () => {
      const timeEntry: TimeEntry = {
        id: 10,
        idProject: 1,
        idUser: 1,
        date: '2025-11-14',
        hours: 8,
        observations: 'Observação original',
        project: { id: 1, name: 'Projeto A' },
      };

      const dialogRefMock = {
        afterClosed: () => of(undefined),
      } as any;

      component.onCloseModalObservations(dialogRefMock, timeEntry);

      expect(timeEntryServiceSpy.update).not.toHaveBeenCalled();
      expect(timeEntry.observations).toBe('Observação original');
    });
  });
});
