import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../core/services/profile.service';
import { NavbarComponent } from '../core/navbar/navbar';
import { VaultService } from '../core/services/vault.service';

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

  questions: any[] = [];   // ✅ ADD THIS LINE


  // ================= PASSWORD MODEL =================
  password = {
    current: '',
    new: '',
    confirm: ''
  };

  // ================= MESSAGE =================
  message = '';

 constructor(
   private profileService: ProfileService
 ) {}

  ngOnInit() {
    this.loadProfile();


  }

  // ================= LOAD PROFILE =================

  loadProfile() {

    this.profileService.getProfile()
      .subscribe((res: any) => {
        this.user = res;
         this.loadQuestions();
      });

  }

  // ================= LOAD QUESTIONS =================
loadQuestions() {

  this.profileService.getQuestions()
    .subscribe({

      next: (res: any) => {

        console.log("QUESTIONS:", res);

        this.questions = res || [];

      },

      error: err => console.error(err)

    });

}
 // ================= UPDATE PROFILE =================

updateProfile() {

  this.profileService.updateProfile(this.user)
    .subscribe(() => {
      alert('Profile Updated');
      this.loadProfile();   // ✅ IMPORTANT
    });

}

  // ================= UPDATE QUESTIONS =================

updateQuestions() {

  const payload = this.questions.map(q => ({
    questionId: q.questionId,
    answer: q.answer
  }));

  this.profileService.updateQuestions(payload)
    .subscribe(() => {

      alert('Questions Updated');

      this.loadQuestions(); // reload

    });

}
 // ✅ ADD THIS METHOD HERE
  trackById(index: number, item: any) {
    return item.questionId;
  }
vaults: any[] = [];



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
