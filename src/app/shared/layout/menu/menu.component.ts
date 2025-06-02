import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuVisibilityService } from './service/menu-visibility.service';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isMobileView = false;
  isMenuVisible = true;
  private visibilitySub!: Subscription;

  constructor(
    private menuVisibilityService: MenuVisibilityService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.visibilitySub = this.menuVisibilityService.isVisible$.subscribe(
      visible => this.isMenuVisible = visible
    );
  }

  ngOnDestroy() {
    if (this.visibilitySub) {
      this.visibilitySub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 768;
    if (!this.isMobileView) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
