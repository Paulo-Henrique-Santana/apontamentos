import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  imports: [],
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FieldErrorComponent {
  @Input({ required: true }) control!: AbstractControl;
  @Input() set errors(errors: { [key: string]: string }) {
    Object.assign(this.customErrors, errors);
  }

  customErrors: { [key: string]: string } = {
    required: 'Campo obrigatório',
  };

  get errorMessage() {
    if (this.control.invalid) {
      for (const key in this.control.errors) {
        return this.customErrors[key];
      }
    }

    return null;
  }
}
