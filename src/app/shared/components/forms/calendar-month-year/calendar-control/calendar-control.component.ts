import { DateUtils } from './../helper/date-utils.helper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusEnum } from './enum/status.enum';
import { RangeDate } from '../model/range-date.model';
import { BaseComponent } from '../base/base.component';
import { CalendarMonthYearTextsService } from '../services/texts.service';

@Component({
  selector: 'cso-calendar-control',
  templateUrl: './calendar-control.component.html',
  styleUrls: ['./calendar-control.component.scss']
})
export class CalendarControlComponent extends BaseComponent implements OnInit {
  private _selectedDate?: Date | null | undefined;

  get selectedDate(): Date | null | undefined {
    return this._selectedDate;
  }

  @Input() set selectedDate(value: Date | null | undefined) {
    this.paginationDate = value
      ? DateUtils.clone(value)
      : DateUtils.clone(new Date());
    this._selectedDate = value ? DateUtils.clone(value) : value;
  }

  @Input() limit?: RangeDate;
  @Input() text: string = '';
  @Output() changeDate: EventEmitter<Date> = new EventEmitter<Date>();

  public paginationDate: Date = new Date();
  public pagesYear: number = 0;
  public status: StatusEnum = StatusEnum.MonthText;

  constructor(private textsService: CalendarMonthYearTextsService) {
    super();
  }

  ngOnInit(): void {
    this.toDestroy(
      this.changeDate.subscribe((value) => {
        this.closeMonthOrYearCalendar();
      })
    );
  }

  closeMonthOrYearCalendar() {
    this.status = StatusEnum.MonthText;
  }

  getMonth(date: Date) {
    return this.textsService.getMonthByNumber(date.getMonth() + 1);
  }

  getYear(date: Date) {
    return date.getFullYear();
  }

  month() {
    this.status = StatusEnum.MonthText;
  }

  year() {
    this.status = StatusEnum.Year;
  }

  prev() {
    if (this.status !== StatusEnum.Year) return;
    this.prevYear();
  }

  next() {
    if (this.status != StatusEnum.Year) return;
    this.nextYear();
  }

  prevYear() {
    this.pagesYear = this.pagesYear - 1;
  }

  nextYear() {
    this.pagesYear = this.pagesYear + 1;
  }
}
