import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  showPassword = false;

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
    ]],
    phone: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private auth: AuthService) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.form.invalid) return;

    this.auth.register(this.form.value)
      .subscribe({
        next: () => {
          Swal.fire('Success', 'Registration successful', 'success');
        },
        error: () => {
          Swal.fire('Error', 'Registration failed', 'error');
        }
      });
  }
}
