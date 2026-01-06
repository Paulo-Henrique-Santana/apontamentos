import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DialogTimeEntryObservations } from '../../models/dialog-time-entry-observations';
import { DateUtils } from '../../utils/date-utils';

@Component({
  selector: 'app-dialog-time-entry-observations',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInput,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './dialog-time-entry-observations.component.html',
  styleUrl: './dialog-time-entry-observations.component.scss',
})
export class DialogTimeEntryObservationsComponent {
  data = inject<DialogTimeEntryObservations>(MAT_DIALOG_DATA);
  dialogRef =
    inject<MatDialogRef<DialogTimeEntryObservationsComponent>>(MatDialogRef);

  observations: string = '';

  constructor() {
    this.initObservations();
  }

  get weekDay() {
    return DateUtils.getWeekdayAbbreviation(this.data.date);
  }

  initObservations() {
    this.dialogRef.afterOpened().subscribe(() => {
      this.observations = this.data.observations || '';
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
