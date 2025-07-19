import { DateUtils }                                      from './../helper/date-utils.helper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeDate }                                      from '../model/range-date.model';
import { TextsService }                                   from '../services/texts.service';
import { NgClass, NgIf } from '@angular/common';
import { CalendarSingleMonthComponent } from './calendar-single-month/calendar-single-month.component';
import { CalendarSingleMonthNumberComponent } from './calendar-single-month-number/calendar-single-month-number.component';
import { CalendarSingleYearComponent } from './calendar-single-year/calendar-single-year.component';
import { BaseCalendarComponent } from '../../base-calendar/base-calendar.component';
import { CalendarStatusEnum } from '../../base-calendar/enums/base-calendar-status.enum';

@Component({
  selector   : 'cso-calendar-single-control',
  templateUrl: './calendar-single-control.component.html',
  styleUrls  : ['./calendar-single-control.component.scss'],
  imports: [
    NgClass,
    NgIf,
    CalendarSingleMonthComponent,
    CalendarSingleMonthNumberComponent,
    CalendarSingleYearComponent,
  ],
  standalone: true,
})
export class CalendarSingleControlComponent extends BaseCalendarComponent implements OnInit {

  private _selectedDate?: Date | null | undefined;

  @Input() set selectedDate(value: Date | null | undefined) {
    this.paginationDate = value ? DateUtils.clone(value) : DateUtils.clone(new Date());
    this._selectedDate  = value ? DateUtils.clone(value) : value;
  }

  get selectedDate(): Date | null | undefined {
    return this._selectedDate;
  }

  @Input () limit?        : RangeDate;
  @Input () text          : string = '';
  @Input () status        : CalendarStatusEnum = CalendarStatusEnum.MonthNumber;
  @Input () selectedRange?: RangeDate = new RangeDate();
  @Output() changeDate    : EventEmitter<Date> = new EventEmitter<Date>();
  public  paginationDate  : Date = new Date();
  public  pagesYear       : number = 0;

  constructor(private textsService: TextsService) {
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
