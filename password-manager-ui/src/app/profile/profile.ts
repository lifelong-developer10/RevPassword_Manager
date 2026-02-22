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
twoFAEnabled = false;
twoFACode = '';
secret = '';

enable2FA() {

  this.authService.enable2FA()
    .subscribe((res: any) => {

      this.secret = res.secret;   // backend may send secret
      this.twoFAEnabled = true;

      Swal.fire('2FA Enabled','Enter verification code','success');

    });

}

verify2FA() {

  this.authService.verify2FA(this.twoFACode)
    .subscribe(() => {

      Swal.fire('Success','2FA Verified','success');

    });

}

disable2FA() {

  this.authService.disable2FA()
    .subscribe(() => {

      this.twoFAEnabled = false;

      Swal.fire('Disabled','2FA turned off','success');

    });

}
}
