import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
   showPassword = false;
 constructor(private fb: FormBuilder,
              private auth: Auth.Service,
              private router: Router) {}


  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });



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
