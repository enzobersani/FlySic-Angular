import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { BaseCalendarComponent } from '../base-calendar/base-calendar.component';
import { CalendarSourceEnum } from '../base-calendar/enums/base-calendar-source.enum';
import { CalendarDateUtilsHelper } from '../base-calendar/helpers/base-calendar-date-utils.helper';
import { CalendarRangeDateValidationModel } from '../base-calendar/models/base-calendar-range-validation.model';
import { CalendarTextsModel } from '../base-calendar/models/base-calendar-texts.model';
import { CalendarIdService } from '../base-calendar/services/base-calendar-id.service';
import { CalendarRangeService } from '../base-calendar/services/base-calendar-range.service';
import { CalendarScrollService } from '../base-calendar/services/base-calendar-scroll.service';
import { CalendarTextsService } from '../base-calendar/services/base-calendar-texts.service';
import { CalendarBothDatesRequiredService } from '../base-calendar/services/validation/base-calendar-both-dates-required.service';
import { CalendarValidDatesLimitService } from '../base-calendar/services/validation/base-calendar-valid-dates-limit.service';
import { CalendarValidDatesRangeService } from '../base-calendar/services/validation/base-calendar-valid-dates-range.service';
import { CalendarValidDatesService } from '../base-calendar/services/validation/base-calendar-valid-dates.service';
import { CalendarRangeEnum } from './../base-calendar/enums/base-calendar-range.enum';
import { CalendarRangeDateModel } from './../base-calendar/models/base-calendar-range.model';
import { CalendarMainDateVerificationService } from './services/date-verification/date-verification.service';
import { CalendarMainInternalFormListernerService } from './services/internal-form-listerner.service';
import { CalendarMainInternalFormService } from './services/internal-form/internal-form.service';
import { addOrUpdateRangeDate, resetRangeDate } from './store/actions/range-date.actions';
import { selectRangeDateById } from './store/selectors/range-date.selector';
import { CalendarMainDoubleComponent } from './calendar-main-double/calendar-main-double.component';
import { CalendarMainSelectedDateComponent } from './calendar-main-selected-date/calendar-main-selected-date.component';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-calendar-main',
    templateUrl: './calendar-main.component.html',
    styleUrls: ['./calendar-main.component.scss'],
    providers: [
        CalendarRangeService,
        CalendarScrollService,
        CalendarIdService,
        CalendarValidDatesService,
        CalendarValidDatesRangeService,
        CalendarValidDatesLimitService,
        CalendarBothDatesRequiredService,
        CalendarMainDateVerificationService,
        CalendarMainInternalFormListernerService,
        CalendarMainInternalFormService,
        CalendarTextsService
    ],
    standalone: true,
    imports: [NgIf, NgClass, CalendarMainSelectedDateComponent, CalendarMainDoubleComponent]
})
export class CalendarMainComponent extends BaseCalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Input () form?                : UntypedFormGroup;
  @Input () name                 : string = "";
  @Input () placeholder          : string = '';
  @Input () limit                : CalendarRangeDateModel = CalendarRangeDateModel.createCompleteInstace(null, null);
  @Input () hideLeftControls     : boolean = false;
  @Input () bothDatesRequired    : boolean = true;
  @Input () texts?               : CalendarTextsModel;
  @Output() submit               : EventEmitter<any>  = new EventEmitter<any>();
  public  hasValue               : boolean = false;
  public  presetSelected         : CalendarRangeEnum | null = CalendarRangeEnum.custom;
  private _currentRangeDateModel?: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
  componentID: string = '';
  isOpen: boolean = false;

  constructor(
    public  idService              : CalendarIdService,
    public  scrollService          : CalendarScrollService,
    private internalFormService    : CalendarMainInternalFormService,
    private dateVerificationService: CalendarMainDateVerificationService,
    private textsService           : CalendarTextsService,
    private store                  : Store<any>
  ) {
    super();
    this.listenerRangeDate();
  }

  ngOnInit(): void {
    this.scrollService.legacyScroll();
    this.createControlOnMainForm();
    this.setTexts(this.texts);
    this.componentID = this.idService.get();
  }

  ngOnChanges(): void {
    this.setTexts(this.texts);
    if (this.isOpen) this.clearLastSelectIfFormNoHasValue();
    if (!this.isOpen) this.shouldResetSelectedRange();
  }

  toggleCalendar() {
    this.isOpen = !this.isOpen;
  }

  closeCalendar() {
    this.isOpen = false;
  }

  getMainForm() {
    return this.form;
  }

  createControlOnMainForm() {
    this.getMainForm()?.addControl(this.name, this.internalFormService.getForm());
  }

  clearLastSelectIfFormNoHasValue() {
    if (this.getCurrentRangeDateModel()?.source != CalendarSourceEnum.Confirm) {
      this.resetRangeDate();
    }
  }

  setTexts(texts?: CalendarTextsModel) {
    this.textsService.setTexts(texts);
  }

  listenerRangeDate() {
    this.toDestroy(this.store.select(selectRangeDateById(this.idService.get()))
      .pipe(filter(val => val !== undefined)).subscribe(readOnlyRangeDateModel => {
        this.fixDates(readOnlyRangeDateModel);
        this.loadIfHasValue(readOnlyRangeDateModel);
        this.patchRangeDateToInternalForm(readOnlyRangeDateModel);
        this.resetMainFormIfSourceIsReset(readOnlyRangeDateModel);
        this.setCurrentRangeDateModel(readOnlyRangeDateModel);
      }));
  }

  fixDates(readOnlyRangeDateModel?: CalendarRangeDateValidationModel): void {
    this.dateVerificationService.fixDates(readOnlyRangeDateModel, {
      limit: CalendarRangeDateModel.createCompleteInstace(
        this.limit.initialDate ? CalendarDateUtilsHelper.fixInitialDate(this.limit.initialDate) : this.limit.initialDate,
        this.limit.finalDate ? CalendarDateUtilsHelper.fixFinalDate(this.limit.finalDate) : this.limit.finalDate,
      ),
      bothDatesRequired: this.bothDatesRequired
    });
  }

  loadIfHasValue(readOnlyRangeDateModel?: CalendarRangeDateValidationModel): void {
    this.hasValue = this.checkIfHasValue(readOnlyRangeDateModel);
  }

  patchRangeDateToInternalForm(readOnlyRangeDateModel?: CalendarRangeDateValidationModel): void {
    if (readOnlyRangeDateModel?.source === CalendarSourceEnum.Confirm)
      this.internalFormService.patchRangeDate(readOnlyRangeDateModel?.dates);
  }

  resetMainFormIfSourceIsReset(readOnlyRangeDateModel?: CalendarRangeDateValidationModel): void {
    if (readOnlyRangeDateModel?.source === CalendarSourceEnum.Reset) {
      this._currentRangeDateModel = readOnlyRangeDateModel
    }
  }

  isRangeDateModelValid(rangeDateModel: CalendarRangeDateValidationModel) {
    return !!rangeDateModel;
  }

  newValidRangeDateModel() {
    let rangeDateModel = new CalendarRangeDateValidationModel();
    return rangeDateModel;
  }

  checkIfHasValue(readOnlyRangeDateModel?: CalendarRangeDateValidationModel): boolean {
    return !!readOnlyRangeDateModel?.dates?.initialDate || !!readOnlyRangeDateModel?.dates?.finalDate;
  }

  internalFormValueToRangeDateModel(internalFormValue: any): CalendarRangeDateValidationModel {
    let rangeDate             = new CalendarRangeDateModel();
        rangeDate.initialDate = CalendarDateUtilsHelper.convetToDate(internalFormValue.initialDate);
        rangeDate.finalDate   = CalendarDateUtilsHelper.convetToDate(internalFormValue.finalDate);
    return CalendarRangeDateValidationModel.createCompleteInstace(this.idService.get(), rangeDate);
  }

  setValueToMainForm(values: any) {
    let mainFormValues = this.internalFormToMainFormValues(values);
    this.getMainForm()?.patchValue(mainFormValues);
  }

  internalFormToMainFormValues(values: any) {
    let obj: any   = {};
    obj[this.name] = values;
    return obj;
  }

  resetMainFormValue() {
    this.getMainForm()?.get(this.name)?.patchValue({ initialDate: null, finalDate: null });
  }

  resetRangeDate() {
    this.presetSelected = CalendarRangeEnum.custom;
    this.store.dispatch(resetRangeDate({ data: { instanceId: this.idService.get() } }));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.scrollService.onDestroy();
  }

  getCurrentRangeDateModel() {
    return this._currentRangeDateModel;
  }

  setCurrentRangeDateModel(currentRangeDateModel?: CalendarRangeDateValidationModel) {
    this._currentRangeDateModel = currentRangeDateModel;
  }

  updatePreset(preset: CalendarRangeEnum) {
    this.presetSelected = preset;
  }

  shouldResetSelectedRange() {
    const currentDateModel = this._currentRangeDateModel?.getClone()

    if (!currentDateModel || currentDateModel.source !== CalendarSourceEnum.Confirm)
      this.resetCalendar();
  }

  resetCalendar() {
    this.resetRangeDate();
    const currentDateModel = this._currentRangeDateModel?.getClone();
    
    if (!currentDateModel) return;
    
    currentDateModel.source = CalendarSourceEnum.Confirm;
    this.store.dispatch(addOrUpdateRangeDate({ data: currentDateModel }));
    this.closeCalendar();
  }

  buttonConfirm() {
    const currentDateModel = this._currentRangeDateModel?.getClone()
    
    if (!currentDateModel) return;

    currentDateModel.source = CalendarSourceEnum.Confirm
    this.store.dispatch(addOrUpdateRangeDate({ data: currentDateModel }));
    this.submit.emit(this.form?.value);
    this.closeCalendar();
  }
}
