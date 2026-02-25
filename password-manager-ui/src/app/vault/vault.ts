import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VaultService } from '../core/services/vault.service';
import { NavbarComponent } from '../core/navbar/navbar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vault',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './vault.html',
  styleUrls: ['./vault.css']
})
export class VaultComponent implements OnInit {

  vaults: any[] = [];
  keyword = '';

filteredVaults: any[] = [];
isFavoriteFilter = false;
searchText = '';


showForm = false;
editMode = false;

form: any = {
  id: null,
  accountName: '',
  website: '',
  username: '',
  password: '',
  category: '',
  notes: '',
  favorite: false
};

constructor(
  private vaultService: VaultService,
  private route: ActivatedRoute,
  private cd: ChangeDetectorRef
) {}
ngOnInit() {
  this.loadVaults();
}

loadVaults() {

  this.vaultService.getAll()
    .subscribe({

      next: (res: any[]) => {

        this.vaults = res || [];
        this.filteredVaults = [...this.vaults];
        this.cd.detectChanges();   // ⭐ FIX DOUBLE CLICK

      },

      error: err => console.error(err)

    });

}
searchVault() {

  if (!this.searchText) {
    this.filteredVaults = [...this.vaults];
    return;
  }

  const text = this.searchText.toLowerCase();

  this.filteredVaults = this.vaults.filter(v =>

    v.accountName?.toLowerCase().includes(text) ||
    v.website?.toLowerCase().includes(text) ||
    v.category?.toLowerCase().includes(text)

  );

}
trackById(index: number, item: any) {
  return item.id;
}
 openAdd() {
   this.editMode = false;
   this.showForm = true;
 }
openEdit(v: any) {

  console.log("EDIT DATA:", v);

  this.editMode = true;
  this.showForm = true;

  this.form = {
    id: v.id,   // VERY IMPORTANT
    accountName: v.accountName,
    website: v.website,
    username: v.username,
    password: v.password,
    category: v.category,
    notes: v.notes,
    favorite: v.favorite
  };

}
save() {

  console.log("FORM DATA:", this.form);
  console.log("EDIT MODE:", this.editMode);

  if (this.editMode && this.form.id) {

    // UPDATE
    this.vaultService.update(this.form.id, this.form)
      .subscribe({

        next: () => {

         Swal.fire('Account Updated Successfully');

          this.loadVaults();

          this.showForm = false;
          this.editMode = false;
  this.cd.detectChanges();   // ⭐ ADD

        },

        error: err => console.error(err)

      });

  } else {

    // CREATE
    this.vaultService.create(this.form)
      .subscribe({

        next: () => {

         Swal.fire('Account Created');

          this.loadVaults();

          this.showForm = false;
  this.cd.detectChanges();   // ⭐ ADD

        }

      });

  }

}

  delete(id: number) {

    if (confirm('Delete this account?')) {
      this.vaultService.delete(id)
        .subscribe(() => this.loadVaults());
          this.cd.detectChanges();   // ⭐ ADD

    }

  }
  search() {

    if (!this.keyword) {
      this.loadVaults();
      return;
    }

    this.vaultService.search(this.keyword)
      .subscribe(res => this.vaults = res);
    this.cd.detectChanges();   // ⭐ ADD

  }

  loadFavorites() {
    this.vaultService.favorites()
      .subscribe(res => this.vaults = res);
  }

toggleFavorites() {

  this.isFavoriteFilter = !this.isFavoriteFilter;

  if (this.isFavoriteFilter) {

    this.vaultService.favorites()
      .subscribe((res: any[]) => {

        this.filteredVaults = res || [];
  this.cd.detectChanges();   // ⭐ ADD

      });

  } else {

    this.loadVaults();   // show all again

  }

}
  resetForm() {
    this.form = {
      id: null,
      accountName: '',
      website: '',
      username: '',
      password: '',
      category: '',
      notes: '',
      favorite: false
    };
  }

}
