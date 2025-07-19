import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RangeDate } from '../../model/range-date.model';

@Component({
  selector: 'cso-calendar-year',
  templateUrl: './calendar-year.component.html',
  styleUrls: ['./calendar-year.component.scss'],
})
export class CalendarYearComponent implements OnInit {
  private _page?: number | undefined;

  get page(): number | undefined {
    return this._page;
  }

  @Input() set page(value: number | undefined) {
    this._page = value;
    this.getYears();
  }

  @Input() date: Date = new Date();
  @Input() limit?: RangeDate;
  @Output() changeDate: EventEmitter<Date> = new EventEmitter<Date>();

  public years: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getYears();
  }

  getYears() {
    this.years = Array.from({ length: 20 }, (v, k) => k + 1).map(
      (y) => y + this.date.getFullYear() + (this?.page ?? 0) * 20 - 1
    );
  }

  setYear(year: number) {
    if (this.isInvalidYear(year)) return

    this.fixInvalidMonths();
    this.date.setFullYear(year);
    this.changeDate.emit(this.date);
  }

  private fixInvalidMonths() {
    const initialMonthLimit = this.limit?.initialDate?.getMonth() ?? 0;
    const finalMonthLimit = this.limit?.finalDate?.getMonth() ?? 11;

    if (this.date.getMonth() < initialMonthLimit) {
      this.date.setMonth(initialMonthLimit);
    } else if (this.date.getMonth() > finalMonthLimit) {
      this.date.setMonth(finalMonthLimit);
    }
  }

  isInvalidYear(year: number): boolean {
    if (!this.limit) return false;

    const yearCeilLimit = !!this.limit.finalDate && year > this.limit.finalDate.getFullYear();
    const yearFloorLimit = !!this.limit.initialDate && year < this.limit.initialDate.getFullYear();

    return yearCeilLimit || yearFloorLimit;
  }
}
