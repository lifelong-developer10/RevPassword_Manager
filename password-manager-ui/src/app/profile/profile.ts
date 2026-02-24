import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../core/services/profile.service';
import { NavbarComponent } from '../core/navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule, FormsModule,NavbarComponent]
})
export class ProfileComponent implements OnInit {

  // ================= USER =================
  user: any = {};



  // ================= PASSWORD MODEL =================
  password = {
    current: '',
    new: '',
    confirm: ''
  };

  // ================= MESSAGE =================
  message = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.loadProfile();
    this.loadQuestions();
  }

  // ================= LOAD PROFILE =================

  loadProfile() {

    this.profileService.getProfile()
      .subscribe((res: any) => {
        this.user = res;
      });

  }

  // ================= LOAD QUESTIONS =================

 questions: any[] = [];
 loadQuestions() {

   this.profileService.getQuestions()
     .subscribe((res: any) => {

       this.questions = res || [];

     });

 }
 // ================= UPDATE PROFILE =================

 updateProfile() {

   this.profileService.updateProfile(this.user)
     .subscribe(() => alert('Profile Updated'));

 }

  // ================= UPDATE QUESTIONS =================

updateQuestions() {

  const payload = this.questions.map(q => ({
    questionId: q.id,
    answer: q.answer
  }));

  this.profileService.updateQuestions(payload)
    .subscribe(() => alert('Questions Updated'));

}

  // ================= CHANGE PASSWORD =================

  changePassword() {

    if (this.password.new !== this.password.confirm) {
      alert('Password mismatch');
      return;
    }

    this.profileService.changePassword({
      currentPassword: this.password.current,
      newPassword: this.password.new,
      confirmPassword: this.password.confirm
    }).subscribe(() => alert('Password Updated'));

  }
  // ================= TOGGLE 2FA =================

  toggle2FA() {

    const token = localStorage.getItem('token');

this.profileService.update2FA(!this.user.twoFactorEnabled)      .subscribe({

        next: () => {

          this.user.twoFactorEnabled =
            !this.user.twoFactorEnabled;

        }

      });

  }

}
