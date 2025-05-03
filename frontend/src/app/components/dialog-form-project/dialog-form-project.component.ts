import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DialogFormProjectData } from '../../models/dialog-form-project-data';
import { FieldErrorComponent } from '../field-error/field-error.component';

@Component({
  selector: 'app-dialog-form-project',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInput,
    FieldErrorComponent,
  ],
  templateUrl: './dialog-form-project.component.html',
  styleUrl: './dialog-form-project.component.scss',
})
export class DialogFormProjectComponent implements OnInit {
  fb = inject(FormBuilder);
  data = inject<DialogFormProjectData>(MAT_DIALOG_DATA);

  form = this.fb.group({
    name: ['', Validators.required],
  });

  ngOnInit() {
    this.setFormData();
  }

  setFormData() {
    if (this.data.project) {
      this.form.patchValue(this.data.project);
    }
  }
}
