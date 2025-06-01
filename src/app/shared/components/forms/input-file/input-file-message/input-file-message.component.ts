import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessage } from '../models/errors.model';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'cso-input-file-message',
    templateUrl: './input-file-message.component.html',
    styleUrls: ['./input-file-message.component.scss'],
    standalone: true,
    imports: [NgIf, NgClass, AsyncPipe]
})
export class InputFileMessageComponent implements OnInit {

  message: string = '';
  success: boolean = true;

  showEvent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit(): void {
  }

  public open(model: ErrorMessage) {
    this.message = model.message;
    this.success = model.success;
    this.showEvent.next(true);
  }

  public close() {
    this.showEvent.next(false);
  }
  
}
