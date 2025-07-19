import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarDateCompareHelper } from '../../../base-calendar/helpers/base-calendar-date-compare.helper';
import { CalendarDayHelper } from '../../../base-calendar/helpers/base-calendar-day-calendar.helper';
import { CalendarRangeDateModel } from '../../../base-calendar/models/base-calendar-range.model';
import { CalendarTextWeekdaysLetterModel } from '../../../base-calendar/models/base-calendar-week-days-letter.model';
import { CalendarTextsService } from '../../../base-calendar/services/base-calendar-texts.service';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'cso-calendar-main-month-number',
    templateUrl: './calendar-main-month-number.component.html',
    styleUrls: ['./calendar-main-month-number.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass],
})
export class CalendarMainMonthNumberComponent implements OnInit, OnChanges {

  @Input () paginationDate?   : Date;
  @Input () active?           : Date | null;
  @Input () limit?            : CalendarRangeDateModel;
  @Input () selectedRange?    : CalendarRangeDateModel = new CalendarRangeDateModel();
  @Output() changeDate        : EventEmitter<Date> = new EventEmitter<Date>();
  public  weekdaysLetterModel?: CalendarTextWeekdaysLetterModel;
  public  daysOfMonth         : Date[] = [];
  public  daysStart           : Date[] = [];

  constructor(private textsService: CalendarTextsService) { }

  ngOnInit(): void {
    this.updateDaysOfMonth();
    const text = this.textsService.getText();
    if (text) this.setWeekdaysLetterModelModel(text.weekdaysLetter)
    this.textsService.getAsyncTexts().subscribe(text => {
      this.setWeekdaysLetterModelModel(text.weekdaysLetter);
    })
  }

  setWeekdaysLetterModelModel(weekdaysLetterModel?: CalendarTextWeekdaysLetterModel) {
    this.weekdaysLetterModel = weekdaysLetterModel;
  }

  updateDaysOfMonth() {
    this.daysOfMonth = new CalendarDayHelper(this.paginationDate).getDaysOfMonth();
  }

  isActiveDate(data: Date) {
    return CalendarDateCompareHelper.dateIsEqual(this.active, data);
  }

  inRange(data: Date) {
    let initialDate = this.getSelectedRangeInitial();
    let finalDate   = this.getSelectedRangeFinal();
    return (initialDate && finalDate) ? (data >= initialDate && data <= finalDate) : false;
  }

  getSelectedRangeInitial() {
    return this.selectedRange?.initialDate;
  }

  getSelectedRangeFinal() {
    return this.selectedRange?.finalDate;
  }

  isToday(data: Date) {
    return CalendarDateCompareHelper.dateIsEqual(new Date(), data);
  }

  getDay(date: Date) {
    return date.getDate();
  }

  isDateCurrentMonth(date: Date) {
    return date.getMonth() === this.paginationDate?.getMonth();
  }

  isStartDate(date: Date) {
    let startDate = this.getStartDate();
    if (startDate) {
      return date.getTime() < startDate.getTime();
    }
    return false;
  }

  isEndDate(date: Date) {
    let finalDate = this.getFinalDate();
    if (finalDate) {
      return date.getTime() > finalDate.getTime();
    }
    return false;
  }

  getStartDate() {
    return this.limit?.initialDate;
  }

  getFinalDate() {
    return this.limit?.finalDate;
  }

  selectDay(date: Date) {
    this.active = date;
    this.changeDate.emit(date);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateDaysOfMonth();
  }

}
