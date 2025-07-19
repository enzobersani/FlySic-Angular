import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RangeDate } from '../../model/range-date.model';
import { MonthsAbbreviatedModel } from '../../model/texts/months-abbreviated.model';
import { CalendarMonthYearTextsService } from '../../services/texts.service';

@Component({
  selector: 'cso-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {

  public monthsAbbreviated?: MonthsAbbreviatedModel;
  @Input() limit?: RangeDate;
  @Input() date: Date = new Date();
  @Input() currentYear: number = this.date.getFullYear();
  @Output() changeDate: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(private textsService: CalendarMonthYearTextsService) { }

  ngOnInit(): void {
    this.setMonthsAbbreviatedModel(this.textsService.getText().monthsAbbreviated);
  }

  setMonthsAbbreviatedModel(monthsAbbreviated?: MonthsAbbreviatedModel) {
    this.monthsAbbreviated = monthsAbbreviated;
  }

  isEnable(month: number): boolean {
    if (month < 1 || month > 12)
      return false;

    if (this.limit) {
      const { initialDate, finalDate } = this.limit;

      const isEnableByInitial = initialDate ? this.checkByInitialDate(month, initialDate) : true;
      const isEnableByFinal = finalDate ? this.checkByFinalDate(month, finalDate) : true;

      if (initialDate && finalDate) return isEnableByInitial && isEnableByFinal;
      if (initialDate) return isEnableByInitial;
      if (finalDate) return isEnableByFinal;
    }

    return true;
  }

  checkByInitialDate(month: number, initialDate: Date | null): boolean {
    if (!initialDate) return true;

    const initialYear = initialDate.getFullYear();
    const initialMonth = initialDate.getMonth() + 1;

    if (this.currentYear > initialYear) return true
    if (this.currentYear < initialYear) return false

    if (month < initialMonth) return false;
    return true;
  }

  checkByFinalDate(month: number, finalDate: Date | null): boolean {
    if (!finalDate) return true;

    const finalYear = finalDate.getFullYear();
    const finalMonth = finalDate.getMonth() + 1;

    if (this.currentYear < finalYear) return true
    if (this.currentYear > finalYear) return false

    if (month > finalMonth) return false;
    return true;

  }

  getMonth(date: Date) {
    return date.getMonth() + 1;
  }

  setMonth(month: any) {
    if (!this.isEnable(month)) return;

    this.date.setMonth(month - 1);
    this.changeDate.emit(this.date);
  }

}