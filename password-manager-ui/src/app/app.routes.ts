import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { DashboardComponent } from './dashboard/dashboard';
import { VaultListComponent } from './vault/vault-list/vault-list';
import { AddEditVaultComponent } from './vault/add-edit-vault/add-edit-vault';
import { GeneratorComponent } from './generator/generator';
import { ProfileComponent } from './profile/profile';


export const routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'vault', component: VaultListComponent },

  { path: 'vault/add', component: AddEditVaultComponent },

  { path: 'generator', component: GeneratorComponent },

  { path: 'profile', component: ProfileComponent },
{
  path: 'vault/add',
  component: AddEditVaultComponent
},
{
  path: 'vault/edit/:id',
  component: AddEditVaultComponent
}
];
