import { Injectable } from '@angular/core';
import { RangeDate } from '../model/range-date.model';

@Injectable()
export class RangeService {

  constructor() { }

  getToday(): Date {
    return new Date();
  }

  month() {
    return this.setMonth(this.getToday());
  }

  lastMonth() {
    var lastDate = this.getToday();
    lastDate.setDate(1);
    lastDate.setMonth(lastDate.getMonth() - 1);
    return this.setMonth(lastDate);
  }

  setMonth(date: Date) {
    var initialDate = new Date(date.getFullYear(), date.getMonth(), 1);
    var finalDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return RangeDate.createCompleteInstace(initialDate, finalDate);
  }

  lastTwoMonth() {
    return this.setLastMonths(2);
  }

  lastSemester() {
    return this.setLastMonths(6);
  }

  setLastMonths(quantity: number): RangeDate {
    var today = this.getToday();
    var quarter = Math.floor((today.getMonth() / quantity));

    var initialDate = new Date(today.getFullYear(), quarter * quantity, 1);
    var finalDate = new Date(initialDate.getFullYear(), initialDate.getMonth() + quantity, 0);
    return RangeDate.createCompleteInstace(initialDate, finalDate);
  }

  year(): RangeDate {
    var today = this.getToday();

    var initialDate = new Date(today.getFullYear(), 0, 1);
    var finalDate = new Date(today.getFullYear(), 11, 31);

    return RangeDate.createCompleteInstace(initialDate, finalDate);
  }

  lastYear(): RangeDate {
    var today = this.getToday();

    var initialDate = new Date(today.getFullYear() - 1, 0, 1);
    var finalDate = new Date(today.getFullYear() - 1, 11, 31);

    return RangeDate.createCompleteInstace(initialDate, finalDate);
  }

}
