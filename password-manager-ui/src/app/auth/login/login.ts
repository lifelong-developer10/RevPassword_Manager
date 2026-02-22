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

  this.auth.login(this.form.value)
    .subscribe((res: any) => {

      if (res.requires2FA) {

        this.show2FAScreen = true;
        return;

      }

      this.auth.saveToken(res.token);
      this.router.navigate(['/dashboard']);

    });

}
verifyLogin2FA() {

  this.auth.verify2FA(this.twoFACode)
    .subscribe((res: any) => {

      this.auth.saveToken(res.token);
      this.router.navigate(['/dashboard']);

    });

}
}
