import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.html',
  imports: [CommonModule, FormsModule]
})
export class ForgotPasswordComponent {

  step = 1;

  email = '';
  method = '';

  otp = '';
  newPassword = '';

  questions: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ================= STEP 1 =================

  continue() {

    if (!this.email) {
      Swal.fire('Error', 'Enter email', 'error');
      return;
    }

    this.step = 2;
  }

  // ================= OTP FLOW =================

  sendOtp() {

    this.method = 'otp';

    this.authService.sendOtp(this.email)
      .subscribe({

        next: () => {
          Swal.fire('OTP Sent', 'Check your email', 'success');
          this.step = 3;
        },

        error: () => {
          Swal.fire('Error', 'Failed to send OTP', 'error');
        }

      });

  }

  verifyOtp() {

    this.authService.verifyOtp({
      email: this.email,
      otp: this.otp
    }).subscribe({

      next: () => {
        Swal.fire('Verified', 'OTP correct', 'success');
        this.step = 4;
      },

      error: () => {
        Swal.fire('Error', 'Invalid OTP', 'error');
      }

    });

  }

  // ================= SECURITY QUESTIONS =================

  loadQuestions() {

    this.method = 'questions';

    this.authService.getRecoveryQuestions(this.email)
      .subscribe({

        next: (res: any) => {
          this.questions = res;
          this.step = 3;
        },

        error: () => {
          Swal.fire('Error', 'Unable to load questions', 'error');
        }

      });

  }

  verifyQuestions() {

    this.authService.verifySecurityAnswers({
      email: this.email,
      questions: this.questions
    }).subscribe({

      next: () => {
        Swal.fire('Verified', 'Answers correct', 'success');
        this.step = 4;
      },

      error: () => {
        Swal.fire('Error', 'Wrong answers', 'error');
      }

    });

  }

  // ================= RESET PASSWORD =================

  resetPassword() {

    if (!this.newPassword) {
      Swal.fire('Error', 'Enter new password', 'error');
      return;
    }

    this.authService.resetPassword({
      email: this.email,
      newPassword: this.newPassword
    }).subscribe({

      next: () => {

        Swal.fire('Success', 'Password reset successful', 'success');

        this.router.navigate(['/login']);

      },

      error: () => {
        Swal.fire('Error', 'Reset failed', 'error');
      }

    });

  }
sendMethods() {
  this.continue();
}
  // ================= LOGOUT =================

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
