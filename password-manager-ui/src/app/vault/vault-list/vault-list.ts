import { Component, OnInit } from '@angular/core';
import { VaultService } from '../../core/services/vault.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VaultService } from '../../core/services/vault.service';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.html',
  styleUrls: ['./vault-list.css']
})
export class VaultListComponent implements OnInit {

  vault: any[] = [];
  keyword = '';

  constructor(private vaultService: VaultService) {}

  ngOnInit() {
    this.loadVault();
  }

  loadVault() {
    this.vaultService.getAll()
      .subscribe((res: any) => {
        this.vault = res;
      });
  }

  search() {
    if (!this.keyword) {
      this.loadVault();
      return;
    }

    this.vaultService.search(this.keyword)
      .subscribe((res: any) => {
        this.vault = res;
      });
  }

  delete(id: number) {

    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true
    }).then(result => {

      if (result.isConfirmed) {

        this.vaultService.delete(id)
          .subscribe(() => {

            Swal.fire('Deleted','Entry removed','success');
            this.loadVault();

          });

      }

    });

  }

  viewPassword(item: any) {

    Swal.fire({
      title: 'Enter Master Password',
      input: 'password',
      showCancelButton: true
    }).then(result => {

      if (result.value) {

        // you can call backend verification here

        Swal.fire('Password', item.password, 'info');

      }

    });

  }
viewPassword(item: any) {

  Swal.fire({
    title: 'Enter Master Password',
    input: 'password',
    showCancelButton: true
  }).then(result => {

    if (!result.value) return;

    // call backend verify API here

    Swal.fire('Password', item.password, 'info');

  });

}
}
