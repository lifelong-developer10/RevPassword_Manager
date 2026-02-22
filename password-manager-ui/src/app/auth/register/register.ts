import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterComponent {

  form: any;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    // Create form here (IMPORTANT)
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {

    if (this.form.invalid) return;

    this.auth.register(this.form.value)
      .subscribe({

        next: () => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },

        error: () => {
          alert('Registration failed');
        }

      });

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
