import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { SnackBarType } from '../../models/snack-bar';
import { UserService } from '../../services/user.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let router: Router;

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['auth']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        provideRouter([]),
      ],
    });

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('não deve autenticar se o formulário for inválido', () => {
    component.form.setValue({ email: '', password: '' });

    component.login();

    expect(userServiceMock.auth).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(snackBarMock.openFromComponent).not.toHaveBeenCalled();
  });

  it('deve autenticar e exibir snackbar e navegar ao sucesso', () => {
    const formValue = { email: 'paulo', password: '123' };
    component.form.setValue(formValue);

    userServiceMock.auth.and.returnValue(of({ token: 'mock-token' }));

    component.login();

    expect(userServiceMock.auth).toHaveBeenCalledWith(formValue);
    expect(snackBarMock.openFromComponent).toHaveBeenCalledWith(
      SnackBarComponent,
      {
        data: {
          message: 'Login efetuado com sucesso!',
          type: SnackBarType.SUCCESS,
        },
      }
    );
    expect(router.navigate).toHaveBeenCalledWith(['/projetos']);
  });

  it('deve alternar o valor de hideValue para o campo especificado', () => {
    component.toggleHidePassword('password');
    expect(component.hideValue.password).toBeFalse();
  });
});
