import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export class CalendarService implements OnDestroy {

  public objectsForDestruction: Subscription[] = [];

  constructor() { }

  toDestroy(subscription: Subscription) {
    this.objectsForDestruction.push(subscription);
  }

  ngOnDestroy(): void {
    this.objectsForDestruction.forEach(object => object.unsubscribe());
  }

}
