import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {

    authServiceMock = {
      login: jasmine.createSpy('login')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  // ===============================
  // TEST 1: Component Creation
  // ===============================
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // ===============================
  // TEST 2: Form Invalid
  // ===============================
  it('should not call login if form invalid', () => {

    component.form.setValue({
      username: '',
      password: ''
    });

    component.login();

    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  // ===============================
  // TEST 3: Successful Login
  // ===============================
  it('should login successfully and navigate', () => {

    const mockResponse = { token: 'fake-jwt-token' };

    authServiceMock.login.and.returnValue(of(mockResponse));

    component.form.setValue({
      username: 'test',
      password: '123456'
    });

    spyOn(localStorage, 'setItem');

    component.login();

    expect(authServiceMock.login).toHaveBeenCalled();

    expect(localStorage.setItem)
      .toHaveBeenCalledWith('token', 'fake-jwt-token');

    expect(routerMock.navigate)
      .toHaveBeenCalledWith(['/dashboard']);
  });

  // ===============================
  // TEST 4: Login Error
  // ===============================
  it('should show error on login failure', () => {

    authServiceMock.login.and.returnValue(
      throwError(() => new Error('Invalid'))
    );

    component.form.setValue({
      username: 'wrong',
      password: 'wrong'
    });

    spyOn(window, 'alert');

    component.login();

    expect(window.alert)
      .toHaveBeenCalledWith('Invalid Credentials');
  });

});
