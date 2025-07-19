import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { BaseComponent } from '../base/base.component';
import { CalendarMonthYearTextsService } from '../services/texts.service';
import { IdService } from './../services/id.service';
import { RangeDate } from '../model/range-date.model';

@Component({
  selector: 'cso-calendar-selected-date',
  templateUrl: './calendar-selected-date.component.html',
  styleUrls: ['./calendar-selected-date.component.scss']
})
export class CalendarSelectedDateComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Input() isOpen: boolean = false;
  @Input() fowardLimit: number | Date = 0;
  @Input() backwardLimit: number | Date = 0;
  @Input() currentDate: Date = new Date();
  @Input() limit: RangeDate = RangeDate.createCompleteInstace(null, null);

  @Output() monthChangeEmitter = new EventEmitter<Date>();

  public datesToShow: Date[] = [];

  constructor(public idService: IdService, private textService: CalendarMonthYearTextsService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate']) this.fillMonthsToShow();
  }

  ngOnInit(): void {
    this.fillMonthsToShow();
  }

  private fillMonthsToShow() {
    let startMonth = new Date(this.currentDate);
    if (this.backwardLimit instanceof Date) {
      startMonth = this.backwardLimit;
    } else {
      startMonth.setMonth(startMonth.getMonth() - 1 - this.backwardLimit);
    }

    let endMonth = new Date(this.currentDate);
    if (this.fowardLimit instanceof Date) {
      endMonth = this.fowardLimit;
    } else {
      endMonth.setMonth(endMonth.getMonth() + this.fowardLimit);
    }

    this.datesToShow = [];
    while (startMonth < endMonth) {
      startMonth.setMonth(startMonth.getMonth() + 1);
      this.datesToShow.push(new Date(startMonth));
    }
  }

  formatDate(month: number, year: number) {
    return `${this.textService.getMonthByNumber(month + 1)} | ${year}`;
  }

  changeCurrentDate(newDate: Date) {
    if (!this.isBetweenLimit(newDate)) return;

    this.currentDate = newDate;
    this.monthChangeEmitter.emit(newDate);
    this.fillMonthsToShow();
  }

  nextDate() {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    this.changeCurrentDate(newDate);
  }

  previousDate() {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    this.changeCurrentDate(newDate);
  }

  private isBetweenLimit(upcomingDate: Date): boolean {
    const initialLimit = this.limit.initialDate!;
    const finalLimit = this.limit.finalDate!;

    return upcomingDate.valueOf() >= initialLimit.valueOf() 
      && upcomingDate.valueOf() <= finalLimit.valueOf();
  }
}
