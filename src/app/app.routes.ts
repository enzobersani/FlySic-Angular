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
        path: 'configurations',
        loadComponent: () => import('./main/pages/configurations/configurations.component').then(m => m.ConfigurationsComponent),
        canActivate: [AuthGuard]  
    },
    {
        path: 'flight-form',
        loadComponent: () => import('./main/pages/flight-form/flight-form.component').then(m => m.FlightFormComponent),
        canActivate: [AuthGuard] 
    },
    {
        path: 'my-flights',
        loadComponent: () => import('./main/pages/my-flight-forms/my-flight-forms.component').then(m => m.MyFlightFormsComponent),
        canActivate: [AuthGuard]
    },
    { 
        path: 'forgot-password', 
        loadComponent: () => import('./main/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        data: { hideMenu: true }
    },
    {
        path: 'flights', 
        loadComponent: () => import('./main/pages/flights/flights.component').then(m => m.FlightsComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'flight/:id', 
        loadComponent: () => import('./main/pages/flight-details/flight-details.component').then(m => m.FlightDetailsComponent),
        canActivate: [AuthGuard]
    }
];
