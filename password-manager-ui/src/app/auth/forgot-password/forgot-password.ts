import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../core/navbar/navbar';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'],
  imports: [CommonModule, FormsModule, RouterModule,NavbarComponent]
})
export class ForgotPasswordComponent {

  step = 1;

  username = '';
  method = '';

  otp = '';
  newPassword = '';

  questions: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // STEP 1
  continue() {

    if (!this.username) {
      Swal.fire('Error', 'Enter username', 'error');
      return;
    }

    this.auth.checkUser(this.username).subscribe({

      next: (exists: any) => {

        if (!exists) {
          Swal.fire('Error', 'User not found', 'error');
          return;
        }

        this.step = 2;

      },

      er
      ror: () => {
        Swal.fire('Error', 'Server error', 'error');
      }

    });

  }

  // OTP METHOD
  selectOtp() {

    this.method = 'otp';

    this.auth.generateOtp(this.username).subscribe({

      next: () => {
        Swal.fire('OTP Sent', 'Check console/email', 'success');
        this.step = 3;   // ⭐ move here
      },

      error: () => {
        Swal.fire('Error', 'OTP failed', 'error');
      }

    });

  }

  verifyOtp() {

    this.auth.verifyOtp({
      username: this.username,
      code: this.otp
    }).subscribe({

      next: (res: any) => {

        console.log("OTP VERIFIED:", res);

        Swal.fire('Verified', 'OTP correct', 'success');

        this.step = 4;   // ⭐ move here only

      },

      error: (err) => {

        console.error("VERIFY ERROR:", err);

        Swal.fire('Error', 'Invalid OTP', 'error');
      }

    });

  }
 selectQuestions() {

   this.method = 'questions';

   this.auth.getRecoveryQuestions(this.username)
     .subscribe({

       next: (res: any) => {
         this.questions = res;
         this.step = 3;  // ⭐ move here
       },

       error: () => {
         Swal.fire('Error', 'Cannot load questions', 'error');
       }

     });

 }

  verifyQuestions() {

    const answers: any = {};

    this.questions.forEach((q: any) => {
      answers[q.questionId] = q.answer;   // ⭐ correct mapping
    });

    this.auth.verifySecurityAnswers({
      username: this.username,
      answers: answers
    }).subscribe({

      next: (res: any) => {

        if (res === 'VERIFIED') {

          Swal.fire('Verified', 'Answers correct', 'success');
          this.step = 4;

        } else {

          Swal.fire('Error', 'Incorrect answers', 'error');

        }

      },

      error: () => {
        Swal.fire('Error', 'Verification failed', 'error');
      }

    });

  }

  resetPassword() {

    if (!this.newPassword) {
      Swal.fire('Error', 'Enter new password', 'error');
      return;
    }

    this.auth.resetPassword({
      username: this.username,
      newPassword: this.newPassword
    }).subscribe({

      next: () => {

        Swal.fire('Success', 'Password updated', 'success');

        this.router.navigate(['/login']);

      },

      error: () => {
        Swal.fire('Error', 'Reset failed', 'error');
      }

    });

  }
}
