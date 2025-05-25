import { DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Project } from '../../models/project';
import { TimeEntrieParams } from '../../models/time-entries';
import { TimeEntrieService } from '../../services/time-entrie.service';

@Component({
  selector: 'app-time-tracking',
  imports: [
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    DatePipe,
    MatInputModule,
  ],
  templateUrl: './time-tracking.component.html',
  styleUrl: './time-tracking.component.scss',
})
export class TimeTrackingComponent {
  @ViewChild(MatTable) table!: MatTable<Project>;

  timeEntrieService = inject(TimeEntrieService);

  timeEntries: any[] = [];

  weekLabels: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  weekDays: { label: string; date: string }[] = [];

  displayedColumns: string[] = ['project'];

  constructor() {
    this.weekDays = this.getWeekDays();
    this.displayedColumns = [...this.displayedColumns, ...this.weekLabels];
    this.getTimeEntries();
  }

  getWeekDays(): { label: string; date: string }[] {
    const today = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());

    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const current = new Date(sunday);
      current.setDate(sunday.getDate() + i);

      const isoDate = current.toISOString().split('T')[0];

      weekDays.push({
        label: this.weekLabels[i],
        date: `${isoDate}`,
      });
    }

    return weekDays;
  }

  getTimeEntries() {
    const params: TimeEntrieParams = {
      startDate: this.weekDays[0].date,
      endDate: this.weekDays[6].date,
    };

    this.timeEntrieService.get(params).subscribe({
      next: (res) => {
        res.items.forEach((item) => {
          const indexProject = this.timeEntries.findIndex(
            (i) => i.project.id === item.project.id
          );
          const labelDate = this.weekDays.find(
            (item) => item.date === item.date
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
}
