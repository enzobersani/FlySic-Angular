import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DayCalendarHelper }                                                        from '../../helper/day-calendar.helper';
import { DateCompare }                                                              from '../../helper/date-compare.helper';
import { RangeDate }                                                                from '../../model/range-date.model';
import { TextsService }                                                             from '../../services/texts.service';
import { WeekdaysLetterModel }                                                      from '../../model/texts/week-days-letter.model';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector   : 'cso-calendar-single-month-number',
  templateUrl: './calendar-single-month-number.component.html',
  styleUrls  : ['./calendar-single-month-number.component.scss'],
  imports: [NgClass, NgFor],
  standalone: true,
})
export class CalendarSingleMonthNumberComponent implements OnInit, OnChanges {

  @Input () paginationDate?   : Date;
  @Input () active?           : Date | null;
  @Input () limit?            : RangeDate;
  @Input () selectedRange?    : RangeDate = new RangeDate();
  @Output() changeDate        : EventEmitter<Date> = new EventEmitter<Date>();
  public  weekdaysLetterModel?: WeekdaysLetterModel;
  public  daysOfMonth         : Date[] = [];
  public  daysStart           : Date[] = [];

  constructor(private textsService: TextsService) { }

  ngOnInit(): void {
    this.updateDaysOfMonth();
    const text = this.textsService.getText();
    if (text) this.setWeekdaysLetterModel(text.weekdaysLetter)
    this.textsService.getAsyncTexts().subscribe(text => {
      this.setWeekdaysLetterModel(text.weekdaysLetter);
    })
  }

  setWeekdaysLetterModel(weekdaysLetterModel?: WeekdaysLetterModel) {
    this.weekdaysLetterModel = weekdaysLetterModel;
  }

  updateDaysOfMonth() {
    this.daysOfMonth = new DayCalendarHelper(this.paginationDate).getDaysOfMonth();
  }

  isActiveDate(data: Date) {
    return DateCompare.dateIsEqual(this.active, data);
  }

  inRange(data: Date) {
    var initialDate = this.getSelectedRangeInitial();
    var finalDate   = this.getSelectedRangeFinal();
    return (initialDate && finalDate) ? (data >= initialDate && data <= finalDate) : false;
  }

  getSelectedRangeInitial() {
    return this.selectedRange?.initialDate;
  }

  getSelectedRangeFinal() {
    return this.selectedRange?.finalDate;
  }

  isToday(data: Date) {
    return DateCompare.dateIsEqual(new Date(), data);
  }

  getDay(date: Date) {
    return date.getDate();
  }

  isDateCurrentMonth(date: Date) {
    return date.getMonth() === this.paginationDate?.getMonth();
  }

  isStartDate(date: Date) {
    var startDate = this.getStartDate();
    if (startDate) {
      return date.getTime() < startDate.getTime();
    }
    return false;
  }

  isEndDate(date: Date) {
    var finalDate = this.getFinalDate();
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
