import { DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DateControlComponent } from '../../components/date-control/date-control.component';
import { DialogSelectProjectComponent } from '../../components/dialog-select-project/dialog-select-project.component';
import { Project } from '../../models/project';
import { TimeEntry, TimeEntryParams } from '../../models/time-entries';
import {
  TimeTrackingItemTable,
  TimeTrackingWeekDay,
} from '../../models/time-tracking';
import { TimeEntryService } from '../../services/time-entry.service';
import { UserService } from '../../services/user.service';
import { DateUtils } from '../../utils/date-utils';

@Component({
  selector: 'app-time-tracking',
  imports: [
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    DatePipe,
    MatInputModule,
    DateControlComponent,
    FormsModule,
  ],
  templateUrl: './time-tracking.component.html',
  styleUrl: './time-tracking.component.scss',
})
export class TimeTrackingComponent {
  @ViewChild(MatTable) table!: MatTable<Project>;

  timeEntryService = inject(TimeEntryService);
  dialog = inject(MatDialog);
  userService = inject(UserService);

  timeEntries: TimeTrackingItemTable[] = [];

  weekDays: TimeTrackingWeekDay[] = [];

  weekColumns = [
    { property: 'dom', label: 'Dom' },
    { property: 'seg', label: 'Seg' },
    { property: 'ter', label: 'Ter' },
    { property: 'qua', label: 'Qua' },
    { property: 'qui', label: 'Qui' },
    { property: 'sex', label: 'Sex' },
    { property: 'sab', label: 'Sáb' },
  ];
  displayedColumns: string[] = ['project'];

  get weekProperties() {
    return this.weekColumns.map((column) => column.property);
  }

  constructor() {
    this.weekDays = this.getWeekDays(new Date());
    this.displayedColumns = [...this.displayedColumns, ...this.weekProperties];
    this.getTimeEntries();
  }

  getWeekDays(date: Date): { label: string; date: Date }[] {
    date.setDate(date.getDate() - date.getDay());

    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(date);
      current.setDate(date.getDate() + i);

      weekDays.push({
        label: this.weekProperties[i],
        date: current,
      });
    }

    return weekDays;
  }

  getTimeEntries() {
    const params: TimeEntryParams = {
      startDate: DateUtils.dateToString(this.weekDays[0].date),
      endDate: DateUtils.dateToString(this.weekDays[6].date),
    };

    this.timeEntryService.get(params).subscribe({
      next: (res) => {
        this.addTimeEntriesToTable(res.items);
      },
    });
  }

  addTimeEntriesToTable(timeEntries: TimeEntry[]) {
    timeEntries.forEach((item) => {
      const indexProject = this.timeEntries.findIndex(
        (i) => i.project.id === item.project!.id
      );
      const labelDate = this.weekDays.find((weekDay) =>
        DateUtils.isSameDate(weekDay.date, item.date)
      )!.label;

      if (indexProject === -1) {
        this.timeEntries.push({
          project: item.project!,
          [labelDate]: item,
        });
      } else {
        Object.assign(this.timeEntries[indexProject], {
          [labelDate]: item,
        });
      }
    });

    this.table.renderRows();
  }

  nextWeek() {
    const nextSunday = this.weekDays[this.weekDays.length - 1].date;
    nextSunday.setDate(nextSunday.getDate() + 1);
    this.changeWeek(nextSunday);
  }

  lastWeek() {
    const lastSaturday = this.weekDays[0].date;
    lastSaturday.setDate(lastSaturday.getDate() - 1);
    this.changeWeek(lastSaturday);
  }

  currentWeek() {
    const currentDate = new Date();
    this.changeWeek(currentDate);
  }

  changeWeek(date: Date) {
    this.weekDays = this.getWeekDays(date);
    this.timeEntries = [];
    this.getTimeEntries();
  }

  openSelectProjectsDialog() {
    const dialogRef = this.dialog.open(DialogSelectProjectComponent, {
      data: {
        selectedProjects: this.timeEntries.map((item) => item.project),
      },
    });

    dialogRef.afterClosed().subscribe((projects: Project[] | undefined) => {
      if (projects) {
        this.onSelectProjects(projects);
      }
    });
  }

  onSelectProjects(projects: Project[]) {
    const projectsWithTimeEntries = this.timeEntries.filter((item) =>
      this.weekDays.some((weekDay) => item[weekDay.label as keyof typeof item])
    );
    const unlistedProjects = projects.filter((project) =>
      this.timeEntries.every((item) => item.project.id !== project.id)
    );
    const newRows: TimeTrackingItemTable[] = unlistedProjects.map(
      (project) => ({
        project,
      })
    );

    this.timeEntries = [...projectsWithTimeEntries, ...newRows];
    this.table.renderRows();
  }

  onChangeTimeEntry(
    element: TimeTrackingItemTable,
    weekDay: TimeTrackingWeekDay,
    event: Event
  ) {
    const input = event.target as HTMLInputElement;
    const hours = parseFloat(input.value);

    if (isNaN(hours) || hours < 0.1) {
      input.value = '';
      return;
    }
    
    const dateString = DateUtils.dateToString(weekDay.date);

    const labelDate = this.weekDays.find((weekDay) =>
      DateUtils.isSameDate(weekDay.date, dateString)
    )!.label;

    Object.assign(element, { [labelDate]: hours });

    const timeEntry: TimeEntry = {
      id: element[weekDay.label as keyof typeof element]?.id,
      idProject: element.project.id!,
      date: dateString,
      hours,
      idUser: this.userService.loggedUser!.userId,
    };

    if (!timeEntry.id) {
      this.addTimeEntry(timeEntry, element, weekDay);
    }
  }

  addTimeEntry(
    timeEntry: TimeEntry,
    element: TimeTrackingItemTable,
    weekDay: TimeTrackingWeekDay
  ) {
    this.timeEntryService.create(timeEntry).subscribe({
      next: (res) => {
        (element[weekDay.label as keyof typeof element] as TimeEntry) = res;
      },
    });
  }
}
