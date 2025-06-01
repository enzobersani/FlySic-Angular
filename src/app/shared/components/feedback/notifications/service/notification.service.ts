import { Injectable } from '@angular/core';
import { NotificationsComponent } from '../notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationComponent!: NotificationsComponent;

  register(component: NotificationsComponent): void {
    this.notificationComponent = component;
  }

  show(type: 'success' | 'warning' | 'error' | 'info', message: string, duration: number = 3000): void {
    if (this.notificationComponent) {
      this.notificationComponent.showNotification(type, message, duration);
    }
  }
}
