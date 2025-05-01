import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-project',
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-delete-project.component.html',
  styleUrl: './dialog-delete-project.component.scss'
})
export class DialogDeleteProjectComponent {
  nameProject = inject<string>(MAT_DIALOG_DATA);
}
