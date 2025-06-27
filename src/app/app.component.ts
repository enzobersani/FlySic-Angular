import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./shared/layout/menu/menu.component";
import { MenuVisibilityService } from './shared/layout/menu/service/menu-visibility.service';
import { filter } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'flysic-Angular';

  constructor(
    private router: Router,
    private menuVisibility: MenuVisibilityService
  ) {}

  get isMenuVisible$() {
    return this.menuVisibility.isVisible$;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.router.routerState.snapshot.root;
        const hideMenu = this.getDeepestRouteData(route, 'hideMenu');
        
        if (hideMenu) {
          this.menuVisibility.hideMenu();
        } else {
          this.menuVisibility.showMenu();    
        }
      });
  }

  private getDeepestRouteData(route: ActivatedRouteSnapshot, key: string): any {
    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    return currentRoute.data[key];
  }
}
