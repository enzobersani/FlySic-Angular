import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseCalendarComponent } from '../../base-calendar/base-calendar.component';
import { CalendarStatusEnum } from '../../base-calendar/enums/base-calendar-status.enum';
import { CalendarDateUtilsHelper } from '../../base-calendar/helpers/base-calendar-date-utils.helper';
import { CalendarRangeDateModel } from '../../base-calendar/models/base-calendar-range.model';
import { CalendarTextsService } from '../../base-calendar/services/base-calendar-texts.service';
import { CalendarMainYearComponent } from './calendar-main-year/calendar-main-year.component';
import { CalendarMainMonthComponent } from './calendar-main-month/calendar-main-month.component';
import { CalendarMainMonthNumberComponent } from './calendar-main-month-number/calendar-main-month-number.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'cso-calendar-main-control',
    templateUrl: './calendar-main-control.component.html',
    styleUrls: ['./calendar-main-control.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf, CalendarMainMonthNumberComponent, CalendarMainMonthComponent, CalendarMainYearComponent]
})
export class CalendarMainControlComponent extends BaseCalendarComponent implements OnInit {

  private _selectedDate?: Date | null | undefined;

  @Input() set selectedDate(value: Date | null | undefined) {
    this.paginationDate = value ? CalendarDateUtilsHelper.clone(value) : CalendarDateUtilsHelper.clone(new Date());
    this._selectedDate  = value ? CalendarDateUtilsHelper.clone(value) : value;
  }

  get selectedDate(): Date | null | undefined {
    return this._selectedDate;
  }

  @Input () limit?        : CalendarRangeDateModel;
  @Input () text          : string = '';
  @Input () status        : CalendarStatusEnum = CalendarStatusEnum.MonthNumber;
  @Input () selectedRange?: CalendarRangeDateModel = new CalendarRangeDateModel();
  @Output() changeDate    : EventEmitter<Date> = new EventEmitter<Date>();
  public  paginationDate  : Date = new Date();
  public  pagesYear       : number = 0;

  constructor(private textsService: CalendarTextsService) {
    super();
  }

  ngOnInit(): void {
    this.toDestroy(this.changeDate.subscribe(value => {
      this.closeMonthOrYearCalendar();
    }));
  }

  closeMonthOrYearCalendar() {
    this.status = CalendarStatusEnum.MonthNumber;
  }

  getMonth(date: Date) {
    return this.textsService.getMonthByNumber(date.getMonth() + 1);
  }

  getYear(date: Date) {
    return date.getFullYear();
  }

  month() {
    this.status = CalendarStatusEnum.MonthText;
  }

  year() {
    this.status = CalendarStatusEnum.Year;
  }

  prev(date: Date) {
    if (this.status == CalendarStatusEnum.MonthNumber) {
      this.prevMonthNumber(date);
    }

    if (this.status == CalendarStatusEnum.Year) {
      this.prevYear();
    }
  }

  next(date: Date) {
    if (this.status == CalendarStatusEnum.MonthNumber) {
      this.nextMonthNumber(date);
    }

    if (this.status == CalendarStatusEnum.Year) {
      this.nextYear();
    }
  }

  prevMonthNumber(date: Date) {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    this.paginationDate = new Date(date.getTime());
  }

  nextMonthNumber(date: Date) {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    this.paginationDate = new Date(date.getTime());
  }

  prevYear() {
    this.pagesYear = this.pagesYear - 1;
  }

  nextYear() {
    this.pagesYear = this.pagesYear + 1;
  }

}
