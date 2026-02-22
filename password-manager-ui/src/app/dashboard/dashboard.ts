import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VaultService } from '../services/vault.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  vault: any[] = [];
  search = '';

  form: any = {
    website: '',
    username: '',
    password: ''
  };

  constructor(private vaultService: VaultService,
              private auth: AuthService) {}

  ngOnInit() {
    this.loadVault();
  }

  loadVault() {
    this.vaultService.getAll()
      .subscribe((res: any) => {
        this.vault = res;
      });
  }

  addAccount() {

    this.vaultService.add(this.form)
      .subscribe(() => {

        Swal.fire('Success','Account added','success');

        this.loadVault();

      });
  }

  delete(id: number) {

    this.vaultService.delete(id)
      .subscribe(() => {

        Swal.fire('Deleted','Account removed','success');

        this.loadVault();

      });
  }

  viewPassword(v: any) {

    Swal.fire({
      title: 'Enter Master Password',
      input: 'password',
      showCancelButton: true
    }).then(result => {

      if (result.value) {

        Swal.fire('Password', v.password, 'info');

      }

    });

  }

  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
