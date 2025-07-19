import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CalendarSingleToggleService {

  public  isOpen: BehaviorSubject<boolean>       = new BehaviorSubject<boolean>(false);
  private _isOpenEvent: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  toggle() {
    if (this.isOpen.value) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen.next(true);
    this.sendEvent();
  }

  close() {
    this.isOpen.next(false);
    this.sendEvent();
  }

  sendEvent() {
    this._isOpenEvent.next(this.isOpen.value);
  }

  listener() {
    return this._isOpenEvent;
  }

}
