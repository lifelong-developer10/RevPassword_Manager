import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { VaultService } from '../core/services/vault.service';
import { AuthService } from '../core/services/auth.service';
import { NavbarComponent } from '../core/navbar/navbar';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class DashboardComponent implements OnInit {



  totalAccounts: number = 0;
  strongPasswords: number = 0;
  weakPasswords: number = 0;
lastAccount: any = null;
  user: any = {};

  vault: any = {
    accountName: '',
    website: '',
    username: '',
    passwordEncrypted: '',
    category: '',
    notes: '',
    favorite: false
  };

  strengthScore = 0;
  strengthColor = 'red';
  successMessage = '';

  constructor(
    private vaultService: VaultService,
    private authService: AuthService,
    private router: Router
  ) {}

  // ================= INIT =================





ngOnInit() {
  this.loadProfile();
  this.loadVaultSummary();
  this.loadLastAccount();
}


  // ================= LOAD PROFILE =================

  loadProfile() {

    this.authService.getProfile().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: () => {
        console.log('Profile load failed');
      }
    });

  }
goVault() {
  this.router.navigate(['/vault']);
}
// last added account details
loadLastAccount() {

  this.vaultService.getAll().subscribe((res: any) => {

    const data = res as any[];

    if (data.length > 0) {
      this.lastAccount = data[data.length - 1];
    }

  });

}
  // ================= LOAD SUMMARY =================
loadVaultSummary() {

  this.vaultService.getAll().subscribe((res: any) => {

    const data = res as any[];

    this.totalAccounts = data.length;

    this.strongPasswords = data.filter(v =>
      this.isStrong(v.password)
    ).length;

    this.weakPasswords = data.filter(v =>
      !this.isStrong(v.password)
    ).length;

  });

}

goProfile() {
  this.router.navigate(['/profile']);
}


isStrong(password: string): boolean {

  if (!password) return false;

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score >= 3;
}
  // ================= ADD ACCOUNT =================

  addVault() {

    const payload = {
      accountName: this.vault.accountName,
      website: this.vault.website,
      username: this.vault.username,
      passwordEncrypted: this.vault.passwordEncrypted,
      category: this.vault.category,
      notes: this.vault.notes,
      favorite: this.vault.favorite
    };

    this.vaultService.create(payload)
      .subscribe({

        next: () => {

          this.successMessage = 'Account Added Successfully ✅';

          this.vault = {
            accountName: '',
            website: '',
            username: '',
            passwordEncrypted: '',
            category: '',
            notes: '',
            favorite: false
          };

          this.loadVaultSummary();
          this.loadLastAccount();

        },

        error: (err) => {
          console.error(err);
          alert('Error adding account');
        }

      });

  }

  // ================= PASSWORD GENERATOR =================

  generatePassword() {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    let password = '';

    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.vault.password = password;

    this.checkStrength();
  }

  // ================= PASSWORD STRENGTH =================

  checkStrength() {

    const password = this.vault.password || '';

    let score = 0;

    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    this.strengthScore = score;

    if (score <= 25) this.strengthColor = 'red';
    else if (score <= 50) this.strengthColor = 'orange';
    else if (score <= 75) this.strengthColor = 'blue';
    else this.strengthColor = 'green';

  }

}
