import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {

  activeTab = 'info';

  user: any = {
    name: '',
    email: '',
    phone: ''
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  securityQuestions: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadProfile();
    this.loadSecurityQuestions();
  }

  // ---------------- Profile ----------------

  loadProfile() {
    this.authService.getProfile()
      .subscribe((res: any) => this.user = res);
  }

  updateProfile() {
    this.authService.updateProfile(this.user)
      .subscribe(() => {
        Swal.fire('Success','Profile updated','success');
      });
  }

  // ---------------- Change Password ----------------

  changePassword() {

    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      Swal.fire('Error','Passwords do not match','error');
      return;
    }

    this.authService.changePassword(this.passwordData)
      .subscribe(() => {

        Swal.fire('Success','Password changed','success');

        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };

      });
  }

  // ---------------- Security Questions ----------------

  loadSecurityQuestions() {

    this.authService.getSecurityQuestions()
      .subscribe((res: any) => {
        this.securityQuestions = res;
      });

  }

  updateSecurityQuestions() {

    this.authService.updateSecurityQuestions(this.securityQuestions)
      .subscribe(() => {
        Swal.fire('Success','Updated','success');
      });

  }

}
