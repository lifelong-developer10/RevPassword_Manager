import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: '/forgot-password.html'
})
export class ForgotPasswordComponent {

  step = 1;

  email = '';
  method = '';

  otp = '';
  newPassword = '';

  questions: any[] = [];

  constructor(private authService: AuthService) {}

  // ---------------- STEP 1 ----------------

  sendMethods() {

    this.authService.requestRecovery(this.email)
      .subscribe(() => {

        this.step = 2;

      });

  }

  // ---------------- OTP ----------------

  sendOtp() {

    this.authService.sendOtp(this.email)
      .subscribe(() => {

        Swal.fire('OTP Sent','Check your email','success');
        this.step = 3;

      });

  }

  verifyOtp() {

    this.authService.verifyOtp({
      email: this.email,
      otp: this.otp
    }).subscribe(() => {

      this.step = 4;

    });

  }

  // ---------------- SECURITY QUESTIONS ----------------

  loadQuestions() {

    this.authService.getRecoveryQuestions(this.email)
      .subscribe((res: any) => {

        this.questions = res;
        this.step = 3;

      });

  }

  verifyQuestions() {

    this.authService.verifySecurityAnswers({
      email: this.email,
      questions: this.questions
    }).subscribe(() => {

      this.step = 4;

    });

  }

  // ---------------- RESET PASSWORD ----------------

  resetPassword() {

    this.authService.resetPassword({
      email: this.email,
      newPassword: this.newPassword
    }).subscribe(() => {

      Swal.fire('Success','Password reset','success');
      this.step = 1;

    });

  }

}
