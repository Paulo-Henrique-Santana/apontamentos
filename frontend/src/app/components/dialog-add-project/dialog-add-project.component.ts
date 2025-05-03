import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FieldErrorComponent } from '../field-error/field-error.component';

@Component({
  selector: 'app-dialog-add-project',
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatInput, FieldErrorComponent],
  templateUrl: './dialog-add-project.component.html',
  styleUrl: './dialog-add-project.component.scss'
})
export class DialogAddProjectComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required]
  })
}
