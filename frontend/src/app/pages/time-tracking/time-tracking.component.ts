import { DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DateControlComponent } from '../../components/date-control/date-control.component';
import { Project } from '../../models/project';
import { TimeEntrieParams } from '../../models/time-entries';
import { TimeEntrieService } from '../../services/time-entrie.service';
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
  ],
  templateUrl: './time-tracking.component.html',
  styleUrl: './time-tracking.component.scss',
})
export class TimeTrackingComponent {
  @ViewChild(MatTable) table!: MatTable<Project>;

  timeEntrieService = inject(TimeEntrieService);

  timeEntries: any[] = [];

  weekLabels: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  weekDays: { label: string; date: Date }[] = [];

  displayedColumns: string[] = ['project'];

  constructor() {
    this.weekDays = this.getWeekDays(new Date());
    this.displayedColumns = [...this.displayedColumns, ...this.weekLabels];
    this.getTimeEntries();
  }

  getWeekDays(date: Date): { label: string; date: Date }[] {
    date.setDate(date.getDate() - date.getDay());

    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(date);
      current.setDate(date.getDate() + i);

      weekDays.push({
        label: this.weekLabels[i],
        date: current,
      });
    }

    return weekDays;
  }

  getTimeEntries() {
    const params: TimeEntrieParams = {
      startDate: DateUtils.dateToString(this.weekDays[0].date),
      endDate: DateUtils.dateToString(this.weekDays[6].date),
    };

    this.timeEntrieService.get(params).subscribe({
      next: (res) => {
        res.items.forEach((item) => {
          const indexProject = this.timeEntries.findIndex(
            (i) => i.project.id === item.project.id
          );
          const labelDate = this.weekDays.find((weekDay) =>
            DateUtils.isSameDate(weekDay.date, item.date)
          )!.label;

          if (indexProject === -1) {
            this.timeEntries.push({
              project: item.project,
              [labelDate]: item.hours,
            });
          } else {
            this.timeEntries[indexProject][item.date] = item.hours;
          }

          this.table.renderRows();
        });
      },
    });
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
}
