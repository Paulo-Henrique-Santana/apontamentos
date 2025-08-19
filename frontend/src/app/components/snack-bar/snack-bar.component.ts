import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackBarData, SnackBarType } from '../../models/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatButtonModule,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  data: SnackBarData = inject(MAT_SNACK_BAR_DATA);

  iconsMessage = {
    [SnackBarType.ERROR]: 'error',
    [SnackBarType.SUCCESS]: 'check',
  }
}
