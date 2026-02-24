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
     .subscribe((res: any[]) => {

       this.questions = res;

       console.log("Questions:", this.questions);

     });

 }

  // ================= UPDATE PROFILE =================

  updateProfile() {

    this.profileService.updateProfile(this.user)
      .subscribe(() => {
        this.message = 'Profile Updated Successfully';
      });

  }

  // ================= UPDATE QUESTIONS =================

  updateQuestions() {

    const payload = {
      questions: this.questions
    };

    this.profileService.updateQuestions(payload)
      .subscribe({

        next: () => alert('Questions Updated'),
        error: (err) => console.error(err)

      });

  }

  // ================= CHANGE PASSWORD =================

  changePassword() {

    if (this.password.new !== this.password.confirm) {
      alert('Passwords do not match');
      return;
    }

    this.profileService.changePassword(this.password)
      .subscribe(() => {
        this.message = 'Password Updated Successfully';

        this.password = {
          current: '',
          new: '',
          confirm: ''
        };
      });

  }

  // ================= TOGGLE 2FA =================

  toggle2FA() {

    const token = localStorage.getItem('token');

    this.profileService.toggle2FA(!this.user.twoFactorEnabled)
      .subscribe({

        next: () => {

          this.user.twoFactorEnabled =
            !this.user.twoFactorEnabled;

        }

      });

  }

}
