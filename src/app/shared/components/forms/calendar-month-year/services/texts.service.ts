import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { MonthsModel } from '../model/texts/months.model';
import { CalendarMonthYearTextsModel } from '../model/texts/texts.model';

@Injectable()
export class CalendarMonthYearTextsService {

  private _text: Subject<CalendarMonthYearTextsModel> = new Subject();

  private _reference: CalendarMonthYearTextsModel = {
    "weekdays": {
      "monday"   : "Monday",
      "tuesday"  : "Tuesday",
      "wednesday": "Wednesday",
      "thursday" : "Thursday",
      "friday"   : "Friday",
      "saturday" : "Saturday",
      "sunday"   : "Sunday"
    },
    "weekdaysLetter": {
      "monday"   : "M",
      "tuesday"  : "T",
      "wednesday": "W",
      "thursday" : "T",
      "friday"   : "F",
      "saturday" : "S",
      "sunday"   : "S"
    },
    "months": {
      "january"  : "January",
      "february" : "February",
      "march"    : "March",
      "april"    : "April",
      "may"      : "May",
      "june"     : "June",
      "july"     : "July",
      "august"   : "August",
      "september": "September",
      "october"  : "October",
      "november" : "November",
      "december" : "December"
    },
    "monthsAbbreviated": {
      "january"  : "Jan",
      "february" : "Feb",
      "march"    : "Mar",
      "april"    : "Apr",
      "may"      : "May",
      "june"     : "Jun",
      "july"     : "Jul",
      "august"   : "Aug",
      "september": "Sep",
      "october"  : "Oct",
      "november" : "Nov",
      "december" : "Dec"
    },
    "presets": {
      "custom"      : "Custom",
      "thisWeek"    : "This Week",
      "thisMonth"   : "This Month",
      "lastMonth"   : "Last Month",
      "lastTwoMonth": "Last Two Month",
      "lastSemester": "Last Semester",
      "thisYear"    : "This Year",
      "lastYear"    : "Last Year"
    },
    "fromTo": {
      "from": "From",
      "to"  : "To"
    },
    "buttons": {
      "clear"  : "Clear",
      "confirm": "Confirm"
    }
  }

  private monthOrder: { [key: number]: string } = {
    1 : 'january',
    2 : 'february',
    3 : 'march',
    4 : 'april',
    5 : 'may',
    6 : 'june',
    7 : 'july',
    8 : 'august',
    9 : 'september',
    10: 'october',
    11: 'november',
    12: 'december'
  };

  constructor() {}

  getMonthByNumber(monthNumber: number): string {
    if (monthNumber > 12 || monthNumber < 1) throw "Invalid value entered, values must be between 1 and 12";
    const property = this.monthOrder[monthNumber];
    return this.setMonthNumberIfExists(property);
  }

  setMonthNumberIfExists(property: string): string {
    return this._reference.months![property as keyof MonthsModel] ?? '';
  }

  public getAsyncTexts(): Observable<CalendarMonthYearTextsModel> {
    return this._text.asObservable();
  }

  public sendText(texts: CalendarMonthYearTextsModel) {
    this._text.next(texts);
    this._reference = texts;
  }

  public getText(): CalendarMonthYearTextsModel {
    return this._reference;
  }

  public setTexts(texts?: CalendarMonthYearTextsModel): void {
    this.sendText(this.getReferenceIfTextsNotExists(texts));
  }

  public getReferenceIfTextsNotExists(texts?: CalendarMonthYearTextsModel): CalendarMonthYearTextsModel {
    return texts ? texts : this._reference;
  }
}
