import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarLinkModel } from './models/sidebar-link.model';
import { NgClass, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-link',
  standalone: true,
  imports: [NgClass, NgIf, RouterModule],
  templateUrl: './sidebar-link.component.html',
  styleUrl: './sidebar-link.component.scss'
})
export class SidebarLinkComponent {
  @Input() labelNew    : string = '';
  @Input() link       !: SidebarLinkModel;
  @Input() isCollapsed : boolean = false;
  @Input() isOpen      : boolean = false;

  @Output() clickFunc: EventEmitter<SidebarLinkModel> = new EventEmitter<SidebarLinkModel>();

  constructor() {}

  handleClick() {
    this.clickFunc.emit(this.link);
  }
}
