import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector   : 'cso-calendar-single-year',
  templateUrl: './calendar-single-year.component.html',
  styleUrls  : ['./calendar-single-year.component.scss'],
  imports: [NgClass, NgFor],
  standalone: true,
})
export class CalendarSingleYearComponent implements OnInit {

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
    this.years = Array.from({ length: 20 }, (v, k) => k + 1).map(y => y + this.date.getFullYear() + ((this?.page ?? 0) * 20) - 1);
  }

  setYear(year: number) {
    this.date.setFullYear(year);
    this.changeDate.emit(this.date);
  }

}
