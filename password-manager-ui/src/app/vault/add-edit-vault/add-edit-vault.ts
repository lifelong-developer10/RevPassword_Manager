import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VaultService } from '../../core/services/vault.service';
import { Router, ActivatedRoute } from '@angular/router';
import { calculateStrength } from '../../core/password-strength';
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
strengthScore = 0;
strengthLabel = '';
strengthColor = '';
  constructor(
    private vaultService: VaultService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEdit = true;

      this.vaultService.getOne(Number(id))
        .subscribe((res: any) => {

          this.form = res;

        });

    }

  }


checkStrength() {

  const result = calculateStrength(this.form.password);

  this.strengthScore = result.score;
  this.strengthLabel = result.label;
  this.strengthColor = result.color;

}
  generatePassword() {

    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

    let pass = '';

    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    this.form.password = pass;

    this.checkStrength();
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
