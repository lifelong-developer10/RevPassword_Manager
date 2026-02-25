import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'vault',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./vault/vault')
        .then(m => m.VaultComponent)
  },

  {
    path: 'generator',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./generator/generator')
        .then(m => m.GeneratorComponent)
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./profile/profile')
        .then(m => m.ProfileComponent)
  }
,
  {
    path: 'forgot-password',
      loadComponent: () =>
        import('./auth/forgot-password/forgot-password')
          .then(m => m.ForgotPasswordComponent)
  }

];
