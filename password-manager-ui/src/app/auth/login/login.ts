import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {

  show2FAScreen = false;
  twoFACode = '';

  form: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login() {

    this.auth.login(this.form.value)
      .subscribe((res: any) => {

        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);

      });

  }

}
