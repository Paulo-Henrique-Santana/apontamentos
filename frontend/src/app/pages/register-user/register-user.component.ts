import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FieldErrorComponent } from '../../components/field-error/field-error.component';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { SnackBarType } from '../../models/snack-bar';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FieldErrorComponent,
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent {
  fb = inject(FormBuilder);
  userSerivce = inject(UserService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  hideValue = {
    password: true,
    confirmPassword: true,
  };

  form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.validatorConfirmPassword() }
  );

  errorsConfirmPassword = {
    diffPassword: 'A senha e a confirmação devem ser iguais',
  };

  validatorConfirmPassword(): ValidatorFn {
    return (): ValidationErrors | null => {
      if (this.form) {
        const senha = this.form?.value.password;
        const confirmSenhaControl = this.form?.controls['confirmPassword'];

        if (senha !== confirmSenhaControl?.value) {
          confirmSenhaControl.setErrors({ diffPassword: true });
        } else {
          confirmSenhaControl.setErrors(null);
        }
      }

      return null;
    };
  }

  register() {
    if (this.form.valid) {
      this.userSerivce.register(this.form.value as User).subscribe({
        next: () => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: {
              message: 'Usuário cadastrado com sucesso!',
              type: SnackBarType.SUCCESS,
            }
          });

          this.router.navigate(['/login']);
        },
      });
    }
  }

  toggleHidePassword(field: keyof typeof this.hideValue) {
    this.hideValue[field] = !this.hideValue[field];
  }
}
