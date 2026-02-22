import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VaultService } from '../../core/services/vault.service';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.html',
  styleUrls: ['./vault-list.css']
})
export class VaultListComponent implements OnInit {

  vault: any[] = [];
  keyword = '';

  constructor(
    private vaultService: VaultService,
    private router: Router
  ) {}

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

  filter(category: string) {

    if (category === 'ALL') {
      this.loadVault();
      return;
    }

    this.vaultService.filter(category)
      .subscribe((res: any) => {
        this.vault = res;
      });
  }

  delete(id: number) {

    Swal.fire({
      title: 'Delete?',
      icon: 'warning',
      showCancelButton: true
    }).then(result => {

      if (!result.isConfirmed) return;

      this.vaultService.delete(id)
        .subscribe(() => {

          Swal.fire('Deleted','Entry removed','success');
          this.loadVault();

        });

    });

  }

  viewPassword(item: any) {

    Swal.fire({
      title: 'Enter Master Password',
      input: 'password',
      showCancelButton: true
    }).then(result => {

      if (!result.value) return;

      // TODO: call backend verify API

      Swal.fire('Password', item.password, 'info');

    });

  }

  edit(item: any) {

    this.router.navigate(['/vault/add'], {
      state: item
    });

  }

  toggleFavorite(item: any) {

    item.favorite = !item.favorite;

    this.vaultService.update(item.id, item)
      .subscribe(() => {

        Swal.fire('Updated','Favorite changed','success');

      });

  }

}
