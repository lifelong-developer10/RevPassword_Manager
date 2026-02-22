import { Component } from '@angular/core';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { VaultService } from '../../core/services/vault.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-vault',
  templateUrl: './add-edit-vault.html'
})
export class AddEditVaultComponent {

  form: any = {
    websiteName: '',
    username: '',
    password: '',
    category: 'OTHER',
    notes: '',
    favorite: false
  };

  constructor(private vaultService: VaultService,
              private router: Router) {}

  generatePassword() {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

    let pass = '';

    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.form.password = pass;
  }

  save() {

    this.vaultService.add(this.form)
      .subscribe({

        next: () => {
          Swal.fire('Success','Saved successfully','success');
          this.router.navigate(['/vault']);
        },

        error: () => {
          Swal.fire('Error','Failed','error');
        }

      });

  }

}
