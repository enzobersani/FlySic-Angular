import { Component, Input, OnInit } from '@angular/core';
import { ToastModel } from './models/toast.model';
import { ToastInfoModel } from './models/toast-info.model';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit{
  
  @Input() toast: ToastModel = new ToastInfoModel();
  public show: boolean       = true;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.show = false;
  }
}
