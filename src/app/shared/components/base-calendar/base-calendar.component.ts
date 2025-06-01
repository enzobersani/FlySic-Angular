import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({ selector: 'app-base-calendar', template: '' })
export class BaseCalendarComponent implements OnDestroy {

  public objectsForDestruction: Subscription[] = [];

  constructor() { }

  toDestroy(subscription: Subscription) {
    this.objectsForDestruction.push(subscription);
  }

  ngOnDestroy(): void {
    this.objectsForDestruction.forEach(object => object.unsubscribe());
  }

}
