import { Injectable } from '@angular/core';

@Injectable()
export class CalendarScrollService {

  public scrolling = false;
  private scrollEvent     : any;
  private scrollingTimeout: any = 0;

  constructor() { }

  getWindow() {
    return window;
  }

  legacyScroll() {
    this.scrollEvent = (event: any): void => {
      if (event.target.getAttribute)
        if (event.target.getAttribute('class'))
          if (event.target.getAttribute('class').includes('calendar-background-clickout'))
            this.scroll();
    };

    this.getWindow().addEventListener('wheel', this.scrollEvent, true);
  }

  scroll() {
    this.scrolling = true;
    clearTimeout(this.scrollingTimeout);
    this.scrollingTimeout = setTimeout(() => {
      this.scrolling = false;
    }, 300);
  }

  onDestroy(): void {
    this.getWindow().removeEventListener('wheel', this.scrollEvent, true);
  }

}
