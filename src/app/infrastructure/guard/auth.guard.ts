import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MenuVisibilityService } from '../../shared/layout/menu/service/menu-visibility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router,
              private menuVisibility: MenuVisibilityService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      this.menuVisibility.showMenu();
      return true;
    } else {
      this.menuVisibility.hideMenu();
      this.router.navigate(['/login']);
      return false;
    }
  }
}