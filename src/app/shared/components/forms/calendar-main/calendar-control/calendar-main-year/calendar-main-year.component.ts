import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'cso-calendar-main-year',
    templateUrl: './calendar-main-year.component.html',
    styleUrls: ['./calendar-main-year.component.scss'],
    standalone: true,
    imports: [NgFor, NgClass]
})
export class CalendarMainYearComponent implements OnInit {

  private _page?: number | undefined;

  @Input() set page(value: number | undefined) {
    this._page = value;
    this.getYears();
  }

  get page(): number | undefined {
    return this._page;
  }

  @Input () date: Date                     = new Date();
  @Output() changeDate: EventEmitter<Date> = new EventEmitter<Date>();
  public  years: number[]                  = [];

  constructor() { }

  ngOnInit(): void {
    this.getYears();
  }

  getYears() {
    const currentYear = new Date().getFullYear();
    const totalYears = 20;
    const currentYearposition = 20;

    const startYear = currentYear - currentYearposition + 1;

    this.years = Array.from({ length: totalYears }, (_, k) => startYear + k + (this?.page ?? 0) * totalYears);
  }

  setYear(year: number) {
    this.date.setFullYear(year);
    this.changeDate.emit(this.date);
  }

  isFutureYear(year: number): boolean {
    return year > new Date().getFullYear();
  }

}
