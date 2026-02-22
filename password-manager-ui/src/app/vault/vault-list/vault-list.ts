import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { VaultService } from '../../core/services/vault.service';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.html'
})
export class VaultListComponent implements OnInit {

  vault: any[] = [];

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

}
