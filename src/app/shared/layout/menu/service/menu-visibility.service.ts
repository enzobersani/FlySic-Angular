import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuVisibilityService {
  private isVisibleSubject = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSubject.asObservable();

  constructor() { }

  showMenu() {
    this.isVisibleSubject.next(true);
  }

  hideMenu() {
    this.isVisibleSubject.next(false);
  }
}
