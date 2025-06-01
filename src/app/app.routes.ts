import { Routes } from '@angular/router';
import { AuthGuard } from './infrastructure/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./main/pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
    },
    { 
        path: 'login',
        loadComponent: () => import('./main/pages/login/login.component').then(m => m.LoginComponent),
        data: { hideMenu: true }
    },
    { 
        path: 'new-account', 
        loadComponent: () => import('./main/pages/new-account/new-account.component').then(m => m.NewAccountComponent),
        data: { hideMenu: true }
    },
    {
        path: 'new-password',
        loadComponent: () => import('./main/pages/new-password/new-password.component').then(m => m.NewPasswordComponent),
        canActivate: [AuthGuard]
    }
];
