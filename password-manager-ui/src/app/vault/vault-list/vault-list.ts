import { Component, OnInit } from '@angular/core';
import { VaultService } from '../../core/services/vault.service';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.html'
})
export class VaultListComponent implements OnInit {

  vault: any[] = [];
  keyword = '';

  constructor(private vaultService: VaultService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.vaultService.getAll()
      .subscribe((res: any) => {
        this.vault = res;
      });
  }

  search() {
    this.vaultService.search(this.keyword)
      .subscribe((res: any) => {
        this.vault = res;
      });
  }

  delete(id: number) {
    this.vaultService.delete(id)
      .subscribe(() => {
        this.load();
      });
  }
}
