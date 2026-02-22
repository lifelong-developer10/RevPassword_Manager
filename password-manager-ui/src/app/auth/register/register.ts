import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { calculateStrength } from '../../core/password-strength';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: '/login.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {}

@Component({
  selector: 'app-register',
  templateUrl: '/register.component.html'
})
export class RegisterComponent {

  showPassword = false;
  strength = 0;
  strengthScore = 0;
  strengthLabel = '';
  strengthColor = '';
constructor(private fb: FormBuilder,
              private auth: AuthService) {}
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



  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  checkStrength() {
    const value = this.form.value.password || '';
    let score = 0;

    if (value.length > 6) score += 25;
    if (/[A-Z]/.test(value)) score += 25;
    if (/[0-9]/.test(value)) score += 25;
    if (/[^A-Za-z0-9]/.test(value)) score += 25;

    this.strength = score;
  }

  generatePassword() {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

    let pass = '';

    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.form.password = pass;

    this.checkStrength();
  }

  register() {

    if (this.form.invalid) return;

    this.auth.register(this.form.value)
      .subscribe({

        next: () => {
          Swal.fire('Success','Registered successfully','success');
        },

        error: () => {
          Swal.fire('Error','Registration failed','error');
        }

      });
  }
}
