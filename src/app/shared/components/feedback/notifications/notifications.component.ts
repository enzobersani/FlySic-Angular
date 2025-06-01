import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  isVisible: boolean = false;
  message: string = '';
  notificationType: string = '';
  icon: string = '';

  private timeout: any;

  showNotification(type: 'success' | 'warning' | 'error' | 'info', message: string, duration: number = 3000): void {
    this.isVisible = true;
    this.message = message;
    this.notificationType = type;

    switch (type) {
      case 'success':
        this.icon = 'check_circle';
        break;
      case 'error':
        this.icon = 'error';
        break;
      case 'warning':
        this.icon = 'warning';
        break;
      case 'info':
        this.icon = 'info';
        break;
    }

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.closeNotification(), duration);
  }

  closeNotification(): void {
    this.isVisible = false;
  }
}
