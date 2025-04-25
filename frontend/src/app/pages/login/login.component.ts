import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { FieldErrorComponent } from '../../components/field-error/field-error.component';
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
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  userSerivce = inject(UserService);
  snackBar = inject(MatSnackBar);

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
        next: (res) => {
          localStorage.setItem('token', res.token);

          this.snackBar.open('Login efetuado com sucesso!', 'Fechar', {
            duration: 5000,
          });
        },
      });
    }
  }

  toggleHidePassword(field: keyof typeof this.hideValue) {
    this.hideValue[field] = !this.hideValue[field];
  }
}
