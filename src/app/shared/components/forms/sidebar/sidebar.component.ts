import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarLinkModel } from './sidebar-link/models/sidebar-link.model';
import { SidebarItemModel } from './models/sidebar.model';
import { SidebarLinkComponent } from "./sidebar-link/sidebar-link.component";
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarLinkComponent, NgClass, NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit{
  @Input() titleImage      : string = '';
  @Input() titleLabel      : string = '';
  @Input() labelNew        : string = '';
  @Input() items           : SidebarItemModel[] = [];
  @Input() isCollapsed     : boolean = false;
  @Input() activeRoutePath : string = '';

  @Output() changeState: EventEmitter<boolean> = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.handleResize();  
    this.setMenuRouteValidation();
  }

  setMenuRouteValidation() {
    this.items.map((item) => {
      const isActiveRoute = this.activeRoutePath.includes(item.path);
      item.isOpen = isActiveRoute && !this.isCollapsed;
      item.isActiveRoute = isActiveRoute;

      if (item.submenus?.length) {
        item.submenus.map((subItem) => {
          const isActiveRoute = this.activeRoutePath.includes(subItem.path);
          subItem.isActiveRoute = isActiveRoute;
        });
      }
    });

    this.cdr.detectChanges();
  }

  handleNavClick(currentLink: SidebarLinkModel) {
    if (currentLink.hasSubmenu) {
      this.items.map((x) => {
        if (x.path === currentLink.path) x.isOpen = true;
        else x.isOpen = false;
      });

      this.cdr.detectChanges();
    } else {
      this.resetSubmenuActive();
    }
  }

  resetSubmenuActive() {
    this.items.map((x) => x.isOpen = false);
  }

  handleResize() {
    this.handleResizeActions();

    // Window Resize
    window.onresize = () => this.handleResizeActions();
  }

  handleResizeActions() {
    this.isCollapsed = window.innerWidth <= 1366;
    this.handleToggleActions();
  }

  handleToggle() {
    this.isCollapsed = !this.isCollapsed;
    this.handleToggleActions();
  }

  handleToggleActions() {
    this.changeState.emit(this.isCollapsed);
    this.resetSubmenuActive();
    if (!this.isCollapsed) this.setMenuRouteValidation();
  }
}
