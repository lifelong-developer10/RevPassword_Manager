export const routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'vault', component: VaultListComponent },

  { path: 'vault/add', component: AddEditVaultComponent },

  { path: 'generator', component: GeneratorComponent },

  { path: 'profile', component: ProfileComponent }

];
