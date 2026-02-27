import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {

    authServiceMock = {
      register: jasmine.createSpy('register')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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
  it('should not call register if form invalid', () => {

    component.form.setValue({
      username: '',
      email: '',
      password: ''
    });

    component.register();

    expect(authServiceMock.register).not.toHaveBeenCalled();
  });

  // ===============================
  // TEST 3: Successful Register
  // ===============================
  it('should register successfully and navigate to login', () => {

    authServiceMock.register.and.returnValue(of({}));

    component.form.setValue({
      username: 'testuser',
      email: 'test@mail.com',
      password: 'Test@123'
    });

    component.register();

    expect(authServiceMock.register).toHaveBeenCalled();

    expect(routerMock.navigate)
      .toHaveBeenCalledWith(['/login']);
  });

  // ===============================
  // TEST 4: Register Error
  // ===============================
  it('should show error if registration fails', () => {

    authServiceMock.register.and.returnValue(
      throwError(() => new Error('Error'))
    );

    component.form.setValue({
      username: 'testuser',
      email: 'test@mail.com',
      password: 'Test@123'
    });

    spyOn(window, 'alert');

    component.register();

    expect(window.alert)
      .toHaveBeenCalled();
  });

});
