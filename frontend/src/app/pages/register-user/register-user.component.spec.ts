import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { SnackBarType } from '../../models/snack-bar';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['register']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RegisterUserComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar a confirmação de senha com erro quando as senhas não coincidem', () => {
    const form = component.form;
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('differentPassword');
    form.updateValueAndValidity();

    const errors = form.controls['confirmPassword'].errors || {};
    expect(errors['diffPassword']).toBeTrue();
  });

  it('deve validar a confirmação de senha sem erros quando as senhas coincidem', () => {
    const form = component.form;
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('password123');
    form.updateValueAndValidity();

    const errors = form.controls['confirmPassword'].errors || {};
    expect(errors['diffPassword']).toBeUndefined();
  });

  it('deve cadastrar o usuário quando o formulário estiver válido', () => {
    const form = component.form;
    form.controls['name'].setValue('Test User');
    form.controls['email'].setValue('test@email.com.br');
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('password123');
    form.updateValueAndValidity();

    const createdUser: User = {
      id: 1,
      name: 'Test User',
      email: 'test@email.com.br',
      password: 'password123',
    };

    userServiceSpy.register.and.returnValue(of(createdUser));

    component.register();

    expect(userServiceSpy.register).toHaveBeenCalledWith(form.value as User);
    expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
      SnackBarComponent,
      {
        data: {
          message: 'Usuário cadastrado com sucesso!',
          type: SnackBarType.SUCCESS,
        },
      }
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('não deve chamar register se o form for inválido', () => {
    const form = component.form;
    form.controls['name'].setValue('Test User');
    form.controls['email'].setValue('test@email.com.br');
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('password1234');
    form.updateValueAndValidity();

    component.register();

    expect(userServiceSpy.register).not.toHaveBeenCalled();
    expect(snackBarSpy.openFromComponent).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('deve inverter o valor de hideValue para o campo informado', () => {
    expect(component.hideValue.password).toBeTrue();

    component.toggleHidePassword('password');

    expect(component.hideValue.password).toBeFalse();
  });
});
