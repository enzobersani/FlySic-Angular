import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { BaseCalendarComponent } from '../../base-calendar/base-calendar.component';
import { CalendarDateUtilsHelper } from '../../base-calendar/helpers/base-calendar-date-utils.helper';
import { CalendarTextFromToModel } from '../../base-calendar/models/base-calendar-from-to.model';
import { CalendarRangeDateFormFormattedModel } from '../../base-calendar/models/base-calendar-selected-date.model';
import { CalendarIdService } from '../../base-calendar/services/base-calendar-id.service';
import { CalendarTextsService } from '../../base-calendar/services/base-calendar-texts.service';
import { CalendarMainInternalFormService } from '../services/internal-form/internal-form.service';
import { selectRangeDateById } from './../store/selectors/range-date.selector';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'cso-calendar-main-selected-date',
    templateUrl: './calendar-main-selected-date.component.html',
    styleUrls: ['./calendar-main-selected-date.component.scss'],
    standalone: true,
    imports: [NgClass, NgIf]
})
export class CalendarMainSelectedDateComponent extends BaseCalendarComponent implements OnInit {

  @Input()  isOpen      : boolean = false;
  @Input()  placeholder : string = '';
  @Output() reset       : EventEmitter<null> = new EventEmitter;
  public fromToModel?   : CalendarTextFromToModel;
  public rangeSelected? : CalendarRangeDateFormFormattedModel | null;

  constructor(
    private textsService: CalendarTextsService,
    private internalFormService: CalendarMainInternalFormService,
    public  idService   : CalendarIdService,
    private store       : Store<any>
  ) {
    super();
    this.listenerRangeSelected();
  }

  ngOnInit(): void {
    const text = this.textsService.getText();
    if (text) this.setFromToModel(text.fromTo)
    this.textsService.getAsyncTexts().subscribe(text => {
      this.setFromToModel(text.fromTo);
    })
  }

  setFromToModel(fromToModel?: CalendarTextFromToModel) {
    this.fromToModel = fromToModel;
  }

  listenerRangeSelected() {
    this.toDestroy(this.store.select(selectRangeDateById(this.idService.get()))
      .pipe(filter(val => val !== undefined))
      .subscribe(this.clearRangeSelectedIfNofSourceConfirm.bind(this)));
  }

  clearRangeSelectedIfNofSourceConfirm() {
    const { initialDate, finalDate } = this.internalFormService.getValues();
    const datesFormatted = {
      initialDate: initialDate ? this.formatToDate(initialDate) : null,
      finalDate: finalDate ? this.formatToDate(finalDate) : null
    };

    this.rangeSelected = datesFormatted;
  }

  formatDate(date?: Date | null) {
    return (!date) ? "": date.toLocaleDateString();
  }

  formatToDate(date: string) {
    return date ? CalendarDateUtilsHelper.toDate(date) : null;
  }

  hasValue(rangeSelected?: CalendarRangeDateFormFormattedModel | null) {
    return (rangeSelected?.initialDate || rangeSelected?.finalDate);
  }

  showSeparator(rangeSelected?: CalendarRangeDateFormFormattedModel | null) {
    return rangeSelected?.initialDate && rangeSelected?.finalDate;
  }

  remove() {
    this.reset.emit();
  }

}
