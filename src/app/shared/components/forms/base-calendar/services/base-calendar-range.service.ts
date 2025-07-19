import { Injectable } from '@angular/core';
import { CalendarRangeDateModel } from '../models/base-calendar-range.model';

@Injectable()
export class CalendarRangeService {

  constructor() { }

  getToday(): Date {
    return new Date();
  }

  week(): CalendarRangeDateModel {
    let today = this.getToday();
    let first = today.getDate() - today.getDay();
    let last  = first + 6;

    let initialDate = new Date(this.getToday().setDate(first));
    let finalDate   = new Date(this.getToday().setDate(last));
    return CalendarRangeDateModel.createCompleteInstace(initialDate, finalDate);
  }

  month() {
    return this.setMonth(this.getToday());
  }

  lastMonth() {
    let lastDate = this.getToday();
    lastDate.setDate(1);
    lastDate.setMonth(lastDate.getMonth() - 1);
    return this.setMonth(lastDate);
  }

  setMonth(date: Date) {
    let initialDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let finalDate   = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return CalendarRangeDateModel.createCompleteInstace(initialDate, finalDate);
  }

  lastTwoMonth() {
    return this.setLastMonths(2);
  }

  lastSemester() {
    return this.setLastMonths(6);
  }

  setLastMonths(quantity: number): CalendarRangeDateModel {
    let today   = this.getToday();
    let quarter = Math.floor((today.getMonth() / quantity));

    let initialDate = new Date(today.getFullYear(), quarter * quantity, 1);
    let finalDate   = new Date(initialDate.getFullYear(), initialDate.getMonth() + quantity, 0);
    return CalendarRangeDateModel.createCompleteInstace(initialDate, finalDate);
  }

  year(): CalendarRangeDateModel {
    let today = this.getToday();

    let initialDate = new Date(today.getFullYear(), 0, 1);
    let finalDate   = new Date(today.getFullYear(), 11, 31);

    return CalendarRangeDateModel.createCompleteInstace(initialDate, finalDate);
  }

  lastYear(): CalendarRangeDateModel {
    let today = this.getToday();

    let initialDate = new Date(today.getFullYear() - 1, 0, 1);
    let finalDate   = new Date(today.getFullYear() - 1, 11, 31);

    return CalendarRangeDateModel.createCompleteInstace(initialDate, finalDate);
  }

}
