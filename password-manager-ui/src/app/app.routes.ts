import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { DashboardComponent } from './dashboard/dashboard';
import { VaultListComponent } from './vault/vault-list/vault-list';
import { AddEditVaultComponent } from './vault/add-edit-vault/add-edit-vault';
import { GeneratorComponent } from './generator/generator';
import { ProfileComponent } from './profile/profile';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
canActivate: [authGuard]
  },

  { path: 'vault', component: VaultListComponent,
    canActivate: [authGuard] },

  { path: 'vault/add',
    component: AddEditVaultComponent,
     canActivate: [authGuard]},

  { path: 'vault/edit/:id', component: AddEditVaultComponent,
    canActivate: [authGuard]
    },

  { path: 'generator', component: GeneratorComponent },

  { path: 'profile', component: ProfileComponent,
    canActivate: [authGuard]}

];
