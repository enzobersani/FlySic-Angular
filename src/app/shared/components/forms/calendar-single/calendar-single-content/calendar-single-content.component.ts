import { RangeDateModel }                                                               from '../store/models/range-date.model';
import { filter }                                                                       from 'rxjs/operators';
import { IdService }                                                                    from '../services/id.service';
import { calendarSingleAddOrUpdateRangeDate, calendarSingleAddOrUpdateRangeFinalDate, calendarSingleAddOrUpdateRangeInitialDate } from '../store/actions/range-date.actions';
import { Store }                                                                        from '@ngrx/store';
import { CalendarSingleToggleService }                                                                from '../services/toggle.service';
import { Component, EventEmitter, Input, OnInit, Output }                               from '@angular/core';
import { RangeDate }                                                                    from '../model/range-date.model';
import { calendarSingleSelectRangeDateDatesById }                                                     from '../store/selectors/range-date.selector';
import { TextsService }                                                                 from '../services/texts.service';
import { FromToModel }                                                                  from '../model/texts/from-to.model';
import { PresetsModel }                                                                 from '../model/texts/presents.model';
import { ButtonsModel }                                                                 from '../model/texts/buttons.model';
import { TextsModel } from '../model/texts/texts.model';
import { NgClass, NgIf } from '@angular/common';
import { CalendarSingleControlComponent } from '../calendar-single-control/calendar-single-control.component';
import { BaseCalendarComponent } from '../../base-calendar/base-calendar.component';
import { CalendarStatusEnum } from '../../base-calendar/enums/base-calendar-status.enum';
import { CalendarRangeEnum } from '../../base-calendar/enums/base-calendar-range.enum';
import { CalendarRangeService } from '../../base-calendar/services/base-calendar-range.service';
import { CalendarSingleLegacyScrollDirective } from '../directives/legacy-scroll.directive';

@Component({
  selector   : 'cso-calendar-single-content',
  templateUrl: './calendar-single-content.component.html',
  styleUrls  : ['./calendar-single-content.component.scss'],
  imports: [NgClass, NgIf, CalendarSingleLegacyScrollDirective, CalendarSingleControlComponent],
  standalone: true,
})
export class CalendarSingleContentComponent extends BaseCalendarComponent implements OnInit {

  @Input () limit?          : RangeDate;
  @Input () selectedRange?  : RangeDate = new RangeDate();
  @Input () hideLeftControls: boolean = false;
  @Input () presetSelected  : CalendarRangeEnum | null = CalendarRangeEnum.custom;
  @Output() changePreset    : EventEmitter<CalendarRangeEnum> = new EventEmitter();
  @Output() changeValue     : EventEmitter<{ dates: RangeDate, source: string }> = new EventEmitter<{ dates: RangeDate, source: string }>();
  @Output() clear           : EventEmitter<void> = new EventEmitter<void>();
  @Output() confirm         : EventEmitter<void> = new EventEmitter<void>();
  public  presets?          : PresetsModel;
  public  fromTo?           : FromToModel;
  public  buttons?          : ButtonsModel;
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
    private textsService : TextsService,
    public  toggleService: CalendarSingleToggleService,
    public  idService    : IdService,
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

  setAllTexts(text: TextsModel) {
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

  setPresetsModel(presets?: PresetsModel) {
    this.presets = presets;
  }

  setButtonsModel(buttons?: ButtonsModel) {
    this.buttons = buttons;
  }

  setFromToModel(fromToModel?: FromToModel) {
    this.fromTo = fromToModel;
  }

  listenerRangeDate() {
    this.toDestroy(this.store.select(calendarSingleSelectRangeDateDatesById(this.idService.get()))
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

  setSelectedRange(rangeDate?: RangeDate) {
    this.selectedRange = rangeDate;
  }

  getSelectedRange() {
    return this.selectedRange;
  }

  custom() {
    this.setDates(RangeDate.createDateNowInstace());
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

  setDates(dates: RangeDate): void {
    this.store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: RangeDateModel.createCompleteInstace(this.idService.get(), dates.getClone()) }));
  }

  setInitialDateDate(date: Date) {
    this.store.dispatch(calendarSingleAddOrUpdateRangeInitialDate({ data: { date: date, instanceId: this.idService.get() } }));
  }

  setFinalDateDate(date: Date) {
    this.store.dispatch(calendarSingleAddOrUpdateRangeFinalDate({ data: { date: date, instanceId: this.idService.get() } }));
  }

  setRange(range: CalendarRangeEnum) {
    this.range = range;
    if (this.presetSelected !== range)
      this.changePreset.emit(this.range);
  }

}
