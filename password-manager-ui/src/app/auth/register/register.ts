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

  // ===== Password Strength =====
  strengthScore = 0;
  strengthLabel = '';
  strengthColor = 'red';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // ================= Toggle Password =================

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ================= Password Strength =================

  checkStrength() {

    const password = this.form.get('password')?.value || '';

    let score = 0;

    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    this.strengthScore = score;

    if (score <= 25) {
      this.strengthLabel = 'Weak';
      this.strengthColor = 'red';
    } else if (score <= 50) {
      this.strengthLabel = 'Medium';
      this.strengthColor = 'orange';
    } else if (score <= 75) {
      this.strengthLabel = 'Strong';
      this.strengthColor = 'blue';
    } else {
      this.strengthLabel = 'Very Strong';
      this.strengthColor = 'green';
    }

  }

  // ================= Password Generator =================

  generatePassword() {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    let password = '';

    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.form.patchValue({
      password: password
    });

    this.checkStrength();
  }

  // ================= Register =================

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
