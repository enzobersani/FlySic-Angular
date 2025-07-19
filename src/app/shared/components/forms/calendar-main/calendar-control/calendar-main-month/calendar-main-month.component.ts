import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarTextMonthsAbbreviatedModel } from '../../../base-calendar/models/base-calendar-months-abbreviated.model';
import { CalendarRangeDateModel } from '../../../base-calendar/models/base-calendar-range.model';
import { CalendarTextsService } from '../../../base-calendar/services/base-calendar-texts.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'cso-calendar-main-month',
    templateUrl: './calendar-main-month.component.html',
    styleUrls: ['./calendar-main-month.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class CalendarMainMonthComponent implements OnInit {

  public monthsAbbreviated?: CalendarTextMonthsAbbreviatedModel;
  @Input () limit?: CalendarRangeDateModel;
  @Input () date: Date = new Date();
  @Input () currentYear: number = this.date.getFullYear();
  @Output() changeDate: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(private textsService: CalendarTextsService) { }

  ngOnInit(): void {
    this.setMonthsAbbreviatedModel(this.textsService.getText().monthsAbbreviated);
  }

  setMonthsAbbreviatedModel(monthsAbbreviated?: CalendarTextMonthsAbbreviatedModel) {
    this.monthsAbbreviated = monthsAbbreviated;
  }

  isEnable(month: number): boolean {
    if (month < 1 || month > 12)
      throw 'Invalid value entered, values must be between 1 and 12';
    
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

    if(this.currentYear > initialYear) return true
    if(this.currentYear < initialYear) return false
    
    if (month < initialMonth) return false;
    return true;
  }

  checkByFinalDate(month: number, finalDate: Date | null): boolean {
    if (!finalDate) return true;

    const finalYear = finalDate.getFullYear();
    const finalMonth = finalDate.getMonth() + 1;

    if(this.currentYear < finalYear) return true
    if(this.currentYear > finalYear) return false
    
    if (month > finalMonth) return false;
    return true;
    
  }

  getMonth(date: Date) {
    return date.getMonth() + 1;
  }

  setMonth(month: number) {
    this.date.setMonth(month - 1);
    this.changeDate.emit(this.date);
  }

}