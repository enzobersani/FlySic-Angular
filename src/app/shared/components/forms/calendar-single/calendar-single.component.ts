import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CalendarSingleToggleService } from './services/toggle.service';
import { RangeEnum } from './enum/range.enum';
import { Source } from './enum/source.enum';
import { DateUtils } from './helper/date-utils.helper';
import { RangeDate } from './model/range-date.model';
import { ButtonsModel } from './model/texts/buttons.model';
import { RangeService } from './service/range.service';
import { DateVerificationService } from './services/date-verification/date-verification.service';
import { BothDatesRequiredService } from './services/date-verification/verifications/both-dates-required/both-dates-required.service';
import { ValidDatesLimitService } from './services/date-verification/verifications/valid-dates/valid-dates-limit.service';
import { ValidDatesRangeService } from './services/date-verification/verifications/valid-dates/valid-dates-range.service';
import { ValidDatesService } from './services/date-verification/verifications/valid-dates/valid-dates.service';
import { IdService } from './services/id.service';
import { InternalFormListernerService } from './services/internal-form-listerner.service';
import { InternalFormService } from './services/internal-form/internal-form.service';
import { ScrollService } from './services/scroll.service';
import { TextsService } from './services/texts.service';
import { calendarSingleAddOrUpdateRangeDate, calendarSingleResetRangeDate } from './store/actions/range-date.actions';
import { RangeDateModel } from './store/models/range-date.model';
import { calendarSingleSelectRangeDateById } from './store/selectors/range-date.selector';
import { TextsModel } from './model/texts/texts.model';
import { BaseCalendarComponent } from '../base-calendar/base-calendar.component';
import { NgClass, NgIf } from '@angular/common';
import { CalendarSingleSelectedDateComponent } from './calendar-single-selected-date/calendar-single-selected-date.component';
import { CalendarSingleControlComponent } from './calendar-single-control/calendar-single-control.component';
import { CalendarSingleToggleDirective } from './directives/toggle.directive';

@Component({
  selector: 'app-calendar-single',
  templateUrl: './calendar-single.component.html',
  styleUrls: ['./calendar-single.component.scss'],
  providers: [
    CalendarSingleToggleService,
    InternalFormService,
    RangeService,
    ScrollService,
    IdService,
    ValidDatesService,
    ValidDatesRangeService,
    ValidDatesLimitService,
    BothDatesRequiredService,
    DateVerificationService,
    InternalFormListernerService,
    TextsService
  ],
  imports: [NgClass, NgIf, CalendarSingleToggleDirective, CalendarSingleSelectedDateComponent, CalendarSingleControlComponent],
  standalone: true,
})
export class CalendarSingleComponent extends BaseCalendarComponent implements OnInit {
  @Input() form?: FormGroup;
  @Input() name: string = "";
  @Input() placeHolder: string = '';
  @Input() limit: RangeDate = RangeDate.createCompleteInstace(null, null);
  @Input() textModel?: TextsModel | null;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  public buttons?: ButtonsModel;
  public range: RangeEnum | null = RangeEnum.custom;
  public hasValue: boolean = false;

  get getCurrentRangeDateModel() {
    return this._currentRangeDateModel;
  }

  private _currentRangeDateModel?: RangeDateModel = new RangeDateModel();

  constructor(
    public idService: IdService,
    public scrollService: ScrollService,
    public toggleService: CalendarSingleToggleService,
    private internalFormService: InternalFormService,
    private dateVerificationService: DateVerificationService,
    private textsService: TextsService,
    private store: Store<any>
  ) {
    super();
    this.listenToValueChanges();
  }

  ngOnInit(): void {
    if (this.form?.get(this.name)?.value) {
      const rangeDate = this.form?.get(this.name)?.value as RangeDate;

      var rangeDateModel = RangeDateModel.createCompleteInstace(this.idService.get(), rangeDate);
      rangeDateModel.source = Source.Confirm;

      this.store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));
    }

    this.form?.addControl(this.name, this.internalFormService.getForm());
    this.setButtonsText();
  }

  setButtonsText() {
    if (this.textModel) {
      this.textsService.sendText(this.textModel);
    }

    const text = this.textsService.getText();
    if (text) this.buttons = text.buttons;

    this.textsService.getAsyncTexts().subscribe({
      next: (text) => {
        this.buttons = text.buttons;
      }
    });
  }

  listenToValueChanges() {
    this.toDestroy(this.store.select(calendarSingleSelectRangeDateById(this.idService.get()))
      .pipe(filter(val => val !== undefined))
      .subscribe(readOnlyRangeDateModel => {
        this.fixDates(readOnlyRangeDateModel);
        this.loadIfHasValue(readOnlyRangeDateModel);
        this.patchRangeDateToInternalForm(readOnlyRangeDateModel);
        this.resetMainFormIfSourceIsReset(readOnlyRangeDateModel);
        this.setCurrentRangeDateModel(readOnlyRangeDateModel);
      }));
  }

  fixDates(readOnlyRangeDateModel?: RangeDateModel): void {
    this.dateVerificationService.fixDates(readOnlyRangeDateModel, {
      limit: RangeDate.createCompleteInstace(
        this.limit.initialDate ? DateUtils.fixInitialDate(this.limit.initialDate) : this.limit.initialDate,
        this.limit.finalDate ? DateUtils.fixFinalDate(this.limit.finalDate) : this.limit.finalDate,
      ),
      bothDatesRequired: false
    });
  }

  loadIfHasValue(readOnlyRangeDateModel?: RangeDateModel): void {
    this.hasValue = !!readOnlyRangeDateModel?.dates?.initialDate || !!readOnlyRangeDateModel?.dates?.finalDate;
  }

  buttonConfirm() {
    const currentDateModel = this._currentRangeDateModel?.getClone()!

    currentDateModel.source = Source.Confirm
    this.store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: currentDateModel }));
    this.submit.emit(this.form?.value);
    this.toggleService.close();
  }

  patchRangeDateToInternalForm(readOnlyRangeDateModel?: RangeDateModel): void {
    if (readOnlyRangeDateModel?.source === Source.Confirm)
      this.internalFormService.patchRangeDate(readOnlyRangeDateModel?.dates);
  }

  changeDate(date: Date | null) {
    this.setCurrentRangeDateModel(RangeDateModel.createCompleteInstace(this.idService.get(), RangeDate.createCompleteInstace(date, null)))
    this.range = RangeEnum.custom;
  }

  setCurrentRangeDateModel(currentRangeDateModel?: RangeDateModel) {
    this._currentRangeDateModel = currentRangeDateModel;
    this.form?.get(this.name)?.patchValue(this._currentRangeDateModel?.dates);
  }

  resetMainFormIfSourceIsReset(readOnlyRangeDateModel?: RangeDateModel): void {
    if (readOnlyRangeDateModel?.source === Source.Reset) {
      this._currentRangeDateModel = readOnlyRangeDateModel
    }
  }

  calendarSingleResetRangeDate() {
    this.changeDate(null);
    this.store.dispatch(calendarSingleResetRangeDate({ data: { instanceId: this.idService.get() } }));
    this.submit.emit(null);
  }

  resetCalendar() {
    this.calendarSingleResetRangeDate();
    const currentDateModel = this._currentRangeDateModel?.getClone()!;
    currentDateModel.source = Source.Confirm;
    this.store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: currentDateModel }));
  }
}
