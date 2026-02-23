import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VaultService } from '../core/services/vault.service';
import { AuthService } from '../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private vaultService: VaultService,
    private authService: AuthService
  ) {}

  // ================= PROFILE =================

  profile: any = {};

  totalAccounts = 0;
  favorites = 0;

  // ================= QUICK ADD VAULT =================

  vault: any = {
    websiteName: '',
    username: '',
    password: '',
    category: ''
  };

  successMessage = '';

  // ================= PASSWORD STRENGTH =================

  strengthScore = 0;
  strengthLabel = '';
  strengthColor = 'red';

  ngOnInit(): void {

    this.loadProfile();
    this.loadStats();

  }

  // ================= LOAD PROFILE =================

  loadProfile() {

    this.authService.getProfile()
      .subscribe((res: any) => {
        this.profile = res;
      });

  }

  // ================= LOAD STATS =================

  loadStats() {

    this.vaultService.getAll()
      .subscribe((res: any) => {

        this.totalAccounts = res.length || 0;
        this.favorites = res.filter((v: any) => v.favorite).length || 0;

      });

  }

  // ================= ADD ACCOUNT =================

  addAccount() {

    if (!this.vault.websiteName ||
        !this.vault.username ||
        !this.vault.password ||
        !this.vault.category) {

      alert('Please fill all fields');
      return;
    }

    this.vaultService.create(this.vault)
      .subscribe(() => {

        this.successMessage = 'Account Added Successfully';

        this.vault = {
          websiteName: '',
          username: '',
          password: '',
          category: ''
        };

        this.loadStats();

      });

  }

  // ================= NAVIGATION =================

  goProfile() {
    this.router.navigate(['/profile']);
  }

  goVault() {
    this.router.navigate(['/vault']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // ================= PASSWORD GENERATOR =================

  generatePassword() {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

    let password = '';

    for (let i = 0; i < 12; i++) {

      password += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );

    }

    this.vault.password = password;

    this.checkStrength();

  }

  checkStrength() {

    const password = this.vault.password || '';

    let score = 0;

    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    this.strengthScore = score;

    if (score <= 25) {
      this.strengthLabel = 'Weak';
      this.strengthColor = 'red';
    } else if (score <= 50) {
      this.strengthLabel = 'Medium';
      this.strengthColor = 'orange';
    } else if (score <= 75) {
      this.strengthLabel = 'Strong';
      this.strengthColor = 'blue';
    } else {
      this.strengthLabel = 'Very Strong';
      this.strengthColor = 'green';
    }

  }

}
