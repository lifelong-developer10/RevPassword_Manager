import { Component, OnInit } from '@angular/core';
import { VaultService } from '../core/services/vault.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
   imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {

  total = 0;
  favorites = 0;

  constructor(private vaultService: VaultService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {

    this.vaultService.getAll()
      .subscribe((res: any[]) => {

        this.total = res.length;
        this.favorites = res.filter(v => v.favorite).length;

      });

  }

}
