import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FieldErrorComponent } from '../../components/field-error/field-error.component';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { SnackBarData, SnackBarType } from '../../models/snack-bar';
import { UserAuth } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FieldErrorComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  userSerivce = inject(UserService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  hideValue = {
    password: true,
  };

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorsConfirmPassword = {
    diffPassword: 'A senha e a confirmação devem ser iguais',
  };

  login() {
    if (this.form.valid) {
      this.userSerivce.auth(this.form.value as UserAuth).subscribe({
        next: () => {
          const data: SnackBarData = {
            message: 'Login efetuado com sucesso!',
            type: SnackBarType.SUCCESS,
          };

          this.snackBar.openFromComponent(SnackBarComponent, {
            data,
          });

          this.router.navigate(['/projetos']);
        },
      });
    }
  }

  toggleHidePassword(field: keyof typeof this.hideValue) {
    this.hideValue[field] = !this.hideValue[field];
  }
}
