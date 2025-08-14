import { filter } from 'rxjs/operators';
import { IdService } from './../services/id.service';
import { calendarSingleSelectRangeDateById } from './../store/selectors/range-date.selector';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FromToModel } from '../model/texts/from-to.model';
import { TextsService } from '../services/texts.service';
import { InternalFormService } from '../services/internal-form/internal-form.service';
import { RangeDateFormFormatted } from './models/calendar-selected-date.model';
import { DateUtils } from '../helper/date-utils.helper';
import { BaseCalendarComponent } from '../../base-calendar/base-calendar.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'cso-calendar-single-selected-date',
  templateUrl: './calendar-single-selected-date.component.html',
  styleUrls: ['./calendar-single-selected-date.component.scss'],
  imports: [NgClass, NgIf],
  standalone: true,
})
export class CalendarSingleSelectedDateComponent extends BaseCalendarComponent implements OnInit {

  @Input()  isOpen: boolean = false;
  @Input()  placeholder: string = '';
  @Output() reset: EventEmitter<null> = new EventEmitter;

  public fromToModel?: FromToModel;
  public rangeSelected?: RangeDateFormFormatted | null;

  constructor(
    private textsService: TextsService,
    private internalFormService: InternalFormService,
    public  idService: IdService,
    private store: Store<any>
  ) {
    super();
    this.listenerRangeSelected();
  }

  ngOnInit(): void {
    const text = this.textsService.getText();
    if (text) this.setFromToModel(text.fromTo);
    this.textsService.getAsyncTexts().subscribe(text => {
      this.setFromToModel(text.fromTo);
    });
  }

  setFromToModel(fromToModel?: FromToModel) {
    this.fromToModel = fromToModel;
  }

  listenerRangeSelected() {
    this.toDestroy(
      this.store.select(calendarSingleSelectRangeDateById(this.idService.get()))
        .pipe(filter(val => val !== undefined))
        .subscribe(this.updateSelectedFromInternalForm.bind(this))
    );
  }

  private updateSelectedFromInternalForm() {
    const { initialDate, finalDate } = this.internalFormService.getValues();
    const datesFormatted: RangeDateFormFormatted = {
      initialDate: initialDate ? this.formatToDate(initialDate) : null,
      finalDate  : finalDate   ? this.formatToDate(finalDate)   : null
    };
    this.rangeSelected = datesFormatted;
  }

  formatDate(date?: Date | null) {
    return (!date) ? "" : date.toLocaleDateString();
  }

  formatToDate(date?: string | Date | null) {
    if (!date) return null;
    if (typeof date === 'string') return DateUtils.toDate(date);
    if (date instanceof Date)     return date;
    return null;
  }

  // ====== AJUSTES DE EXIBIÇÃO ======

  /** true se existir pelo menos a data inicial */
  hasValue(rangeSelected?: RangeDateFormFormatted | null) {
    return !!rangeSelected?.initialDate;
  }

  /** true somente quando há intervalo real (dias diferentes) */
  showSeparator(rangeSelected?: RangeDateFormFormatted | null) {
    if (!rangeSelected?.initialDate || !rangeSelected?.finalDate) return false;
    return !this.isSameDay(rangeSelected.initialDate, rangeSelected.finalDate);
  }

  /** compara apenas ano/mês/dia */
  private isSameDay(a?: Date | null, b?: Date | null): boolean {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear()
        && a.getMonth()    === b.getMonth()
        && a.getDate()     === b.getDate();
  }

  remove() {
    this.reset.emit();
  }
}
