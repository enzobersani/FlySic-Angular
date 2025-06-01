import { Component, Input, OnInit } from '@angular/core';
import { ToastModel } from './toast/models/toast.model';
import { ToastService } from './services/toast.service';
import { NgFor, NgStyle } from '@angular/common';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-toast-list',
  standalone: true,
  imports: [NgFor, NgStyle, ToastComponent],
  templateUrl: './toast-list.component.html',
  styleUrl: './toast-list.component.scss'
})
export class ToastListComponent implements OnInit{

  @Input() marginTop: string = '60px';
  @Input() waitTime: number  = 2000;
  @Input() marginRight: string = '8px';

  public toasts: ToastModel[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.listener().subscribe(this.listenerToasts.bind(this));
  }

  listenerToasts(toast: ToastModel) {
    this.sendToast(toast);
    this.waitAndRemoveToast(toast);
  }

  sendToast(toast: ToastModel) {
    this.toasts.push(toast);
  }

  waitAndRemoveToast(toast: ToastModel) {
    setTimeout(() => { this.removeToast(toast); }, this.waitTime);
  }

  removeToast(toast: ToastModel) {
    const index    = this.getIndexByToast(toast);
    const wasFound = index > -1;
    if (wasFound) {
      this.removeToastByIndex(index);
    }
  }

  getIndexByToast(toast: ToastModel) {
    return this.toasts.indexOf(toast);
  }

  removeToastByIndex(index: number) {
    this.toasts.splice(index, 1);
  }
}
