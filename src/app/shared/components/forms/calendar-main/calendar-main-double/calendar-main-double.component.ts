import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { BaseCalendarComponent } from '../../base-calendar/base-calendar.component';
import { CalendarRangeEnum } from '../../base-calendar/enums/base-calendar-range.enum';
import { CalendarStatusEnum } from '../../base-calendar/enums/base-calendar-status.enum';
import { CalendarTextButtonsModel } from '../../base-calendar/models/base-calendar-buttons.model';
import { CalendarTextFromToModel } from '../../base-calendar/models/base-calendar-from-to.model';
import { CalendarTextPresetsModel } from '../../base-calendar/models/base-calendar-presets.model';
import { CalendarRangeDateValidationModel } from '../../base-calendar/models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../base-calendar/models/base-calendar-range.model';
import { CalendarTextsModel } from '../../base-calendar/models/base-calendar-texts.model';
import { CalendarIdService } from '../../base-calendar/services/base-calendar-id.service';
import { CalendarRangeService } from '../../base-calendar/services/base-calendar-range.service';
import { CalendarTextsService } from '../../base-calendar/services/base-calendar-texts.service';
import { selectRangeDateDatesById } from '../store/selectors/range-date.selector';
import { addOrUpdateRangeDate, addOrUpdateRangeFinalDate, addOrUpdateRangeInitialDate } from './../store/actions/range-date.actions';
import { CalendarMainControlComponent } from '../calendar-control/calendar-main-control.component';
import { NgClass, NgIf } from '@angular/common';
import { LegacyScrollDirective } from './directive/scroll/legacy-scroll.directive';

@Component({
    selector: 'cso-calendar-main-double',
    templateUrl: './calendar-main-double.component.html',
    styleUrls: ['./calendar-main-double.component.scss'],
    standalone: true,
    imports: [
        LegacyScrollDirective,
        NgClass,
        NgIf,
        CalendarMainControlComponent,
    ],
})
export class CalendarMainDoubleComponent extends BaseCalendarComponent implements OnInit {

  @Input () limit?          : CalendarRangeDateModel;
  @Input () selectedRange?  : CalendarRangeDateModel = new CalendarRangeDateModel();
  @Input () hideLeftControls: boolean = false;
  @Input () presetSelected  : CalendarRangeEnum | null = CalendarRangeEnum.custom;
  @Output() changePreset    : EventEmitter<CalendarRangeEnum> = new EventEmitter();
  @Output() changeValue     : EventEmitter<{ dates: CalendarRangeDateModel, source: string }> = new EventEmitter<{ dates: CalendarRangeDateModel, source: string }>();
  @Output() clear           : EventEmitter<void> = new EventEmitter<void>();
  @Output() confirm         : EventEmitter<void> = new EventEmitter<void>();
  @Output() close           : EventEmitter<void> = new EventEmitter<void>();
  public  presets?          : CalendarTextPresetsModel;
  public  fromTo?           : CalendarTextFromToModel;
  public  buttons?          : CalendarTextButtonsModel;
  public  range             : CalendarRangeEnum | null = CalendarRangeEnum.custom;

  public status: CalendarStatusEnum = CalendarStatusEnum.MonthNumber;
  public showOption         = [
    CalendarRangeEnum.custom,
    CalendarRangeEnum.week,
    CalendarRangeEnum.month,
    CalendarRangeEnum.lastMonth,
    CalendarRangeEnum.year,
    CalendarRangeEnum.lastYear
  ];

  constructor(
    private rangeService : CalendarRangeService,
    private textsService : CalendarTextsService,
    public  idService    : CalendarIdService,
    private store        : Store<any>
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenerRangeDate();
    this.setPreselectedRange();
    this.setTexts();
  }

  ngOnChanges(): void {
    this.setPreselectedRange();
  }

  setTexts() {
    const text = this.textsService.getText();
    if (text) this.setAllTexts(text);
    
    this.textsService.getAsyncTexts().subscribe({ next: (text) => {
      this.setAllTexts(text);
    }});
  }

  setAllTexts(text: CalendarTextsModel) {
    this.setFromToModel(text.fromTo);
    this.setPresetsModel(text.presets);
    this.setButtonsModel(text.buttons);
  }

  setPreselectedRange() {
    if (!this.presetSelected) return;
    
    if(this.presetSelected !== this.range) {
      this.setRange(this.presetSelected);
      this.setPresetByRangeType(this.presetSelected)
    }
  }

  setPresetByRangeType(range: CalendarRangeEnum) {
    switch (range) {
      case CalendarRangeEnum.week:
        this.week();
        break;
      case CalendarRangeEnum.month:
        this.month();
        break;
      case CalendarRangeEnum.lastMonth:
        this.lastMonth();
        break;
      case CalendarRangeEnum.year:
        this.year();
        break;
      case CalendarRangeEnum.lastYear:
        this.lastYear();
        break;
    }
  }

  setPresetsModel(presets?: CalendarTextPresetsModel) {
    this.presets = presets;
  }

  setButtonsModel(buttons?: CalendarTextButtonsModel) {
    this.buttons = buttons;
  }

  setFromToModel(fromToModel?: CalendarTextFromToModel) {
    this.fromTo = fromToModel;
  }

  listenerRangeDate() {
    this.toDestroy(this.store.select(selectRangeDateDatesById(this.idService.get()))
      .pipe(filter(val => val !== undefined))
      .subscribe(value => {
        this.setSelectedRange(value);
      }));
  }

  getStartDate() {
    return this.limit?.initialDate;
  }

  getEndDate() {
    return this.limit?.finalDate;
  }

  setSelectedRange(rangeDate?: CalendarRangeDateModel) {
    this.selectedRange = rangeDate;
  }

  getSelectedRange() {
    return this.selectedRange;
  }

  custom() {
    this.setDates(CalendarRangeDateModel.createDateNowInstace());
    this.setRange(CalendarRangeEnum.custom);
  }

  week() {
    this.setDates(this.rangeService.week());
    this.setRange(CalendarRangeEnum.week);
  }

  month() {
    this.setDates(this.rangeService.month());
    this.setRange(CalendarRangeEnum.month);
  }

  lastMonth() {
    this.setDates(this.rangeService.lastMonth());
    this.setRange(CalendarRangeEnum.lastMonth);
  }

  lastTwoMonth() {
    this.setDates(this.rangeService.lastTwoMonth());
    this.setRange(CalendarRangeEnum.lastTwoMonth);
  }

  lastSemester() {
    this.setDates(this.rangeService.lastSemester());
    this.setRange(CalendarRangeEnum.lastSemester);
  }

  year() {
    this.setDates(this.rangeService.year());
    this.setRange(CalendarRangeEnum.year);
  }

  lastYear() {
    this.setDates(this.rangeService.lastYear());
    this.setRange(CalendarRangeEnum.lastYear);
  }

  changeInitialDate(date: Date) {
    this.setInitialDateDate(date);
    this.range = CalendarRangeEnum.custom;
  }

  changeFinalDate(date: Date) {
    this.setFinalDateDate(date);
    this.range = CalendarRangeEnum.custom;
  }

  setDates(dates: CalendarRangeDateModel): void {
    this.store.dispatch(addOrUpdateRangeDate({ data: CalendarRangeDateValidationModel.createCompleteInstace(this.idService.get(), dates.getClone()) }));
  }

  setInitialDateDate(date: Date) {
    this.store.dispatch(addOrUpdateRangeInitialDate({ data: { date: date, instanceId: this.idService.get() } }));
  }

  setFinalDateDate(date: Date) {
    this.store.dispatch(addOrUpdateRangeFinalDate({ data: { date: date, instanceId: this.idService.get() } }));
  }

  setRange(range: CalendarRangeEnum) {
    this.range = range;
    if (this.presetSelected !== range)
      this.changePreset.emit(this.range);
  }

}
