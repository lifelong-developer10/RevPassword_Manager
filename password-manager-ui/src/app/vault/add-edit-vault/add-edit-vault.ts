import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VaultService } from '../../core/services/vault.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-vault',
  templateUrl: './add-edit-vault.html'
})
export class AddEditVaultComponent implements OnInit {

  form: any = {
    id: null,
    websiteName: '',
    username: '',
    password: '',
    category: 'OTHER',
    notes: '',
    favorite: false
  };

  isEdit = false;

  constructor(
    private vaultService: VaultService,
    private router: Router
  ) {}

  ngOnInit() {

    const data = history.state;

    if (data && data.id) {

      this.isEdit = true;

      this.form = { ...data };

    }

  }

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

    if (this.isEdit) {

      this.vaultService.update(this.form.id, this.form)
        .subscribe(() => {

          Swal.fire('Updated','Saved successfully','success');
          this.router.navigate(['/vault']);

        });

    } else {

      this.vaultService.add(this.form)
        .subscribe(() => {

          Swal.fire('Success','Added successfully','success');
          this.router.navigate(['/vault']);

        });

    }

  }

}
