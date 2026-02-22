import { Routes } from '@angular/router';
const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }

];
