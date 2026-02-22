import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  showPassword = false;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {

    if (this.form.invalid) return;

    this.auth.login(this.form.value)
      .subscribe({

        next: (res: any) => {

          this.auth.saveToken(res.token);

          Swal.fire('Success','Login successful','success');

          this.router.navigate(['/dashboard']);
        },

        error: () => {
          Swal.fire('Error','Invalid credentials','error');
        }

      });
  }
}
