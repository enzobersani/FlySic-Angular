import { CalendarRangeService } from '../../base-calendar/services/base-calendar-range.service';
import { CalendarStatusEnum } from '../../base-calendar/enums/base-calendar-status.enum';
import { RangeDate }                                         from '../model/range-date.model';
import { Store }                                             from '@ngrx/store';
import { of }                                                from 'rxjs';
import { CalendarSingleToggleService }                       from '../services/toggle.service';
import { ComponentFixture, fakeAsync, TestBed, tick }        from '@angular/core/testing';
import { IdService }                                         from '../services/id.service';
import { Component, Directive, EventEmitter, Input, Output } from '@angular/core';
import { TextsService }                                      from '../services/texts.service';
import { CalendarTextServiceMock } from '../../../../_mocks/service/base-calendar-texts.service.mock';
import { CalendarSingleContentComponent } from './calendar-single-content.component';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarRangeEnum } from '../../base-calendar/enums/base-calendar-range.enum';

class ToggleServiceResultMock { }

class RangeServiceMock {
  lastYear() { return new RangeDate(); }
  lastSemester() { return new RangeDate(); }
  week() { return new RangeDate(); }
  lastTwoMonth() { return new RangeDate(); }
  lastMonth() { return new RangeDate(); }
  month() { return new RangeDate(); }
  year() { return new RangeDate(); }
}

class IdServiceMock {
  get() {
    return '1234';
  }
}

@Directive({
  selector: '[CalendarSingleLegacyScroll]'
})
class LegacyScrollMock { @Input() fixedPoint: any; }

@Component({ selector: 'cso-calendar-single-control', template: '' })
class CalendarSingleControlComponentMock {
  @Input () selectedDate? : Date;
  @Input () limit?        : RangeDate;
  @Input () text          : string = '';
  @Input () status        : CalendarStatusEnum = CalendarStatusEnum.MonthNumber;
  @Input () selectedRange?: RangeDate = new RangeDate();
  @Output() changeDate    : EventEmitter<Date> = new EventEmitter<Date>();
}

describe('CalendarSingleContentComponent', () => {
  let component: CalendarSingleContentComponent;
  let fixture  : ComponentFixture<CalendarSingleContentComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  var mockStore = jasmine.createSpyObj(['select', 'dispatch']);
  mockStore.select.and.returnValue(of());
  mockStore.dispatch.and.returnValue();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarSingleControlComponentMock, LegacyScrollMock],
      providers   : [
        {
          provide : CalendarSingleToggleService,
          useClass: ToggleServiceResultMock
        },
        {
          provide : CalendarRangeService,
          useClass: RangeServiceMock
        },
        {
          provide : IdService,
          useClass: IdServiceMock
        },
        {
          provide : Store,
          useValue: mockStore
        },
        {
          provide : TextsService,
          useValue: textsServiceMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(CalendarSingleContentComponent);
    component = fixture.componentInstance;
    textsServiceMock.asyncTexts = of(TEXTS_MODEL_MOCK);
    textsServiceMock.getAsyncTexts()
    textsServiceMock.getText()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect changes', () => {

    // Arrange
    const spySetPreselectedRange = spyOn(component, 'setPreselectedRange');

    // Act
    component.ngOnChanges();
    fixture.detectChanges();

    // Assert
    expect(spySetPreselectedRange).toHaveBeenCalled();

  });

  describe('should setPreselectedRange()', () => {
    it('when is undefined', () => {
      component.presetSelected = null;

      spyOn(component, 'setPreselectedRange').and.callThrough();
      const spySetRange = spyOn(component, 'setRange');
      const spySetPresetByRangeType = spyOn(component, 'setPresetByRangeType');

      component.setPreselectedRange();
      fixture.detectChanges();

      expect(spySetRange).not.toHaveBeenCalled();
      expect(spySetPresetByRangeType).not.toHaveBeenCalled();
    });

    it('when is defined and selected Week', () => {
      component.range = CalendarRangeEnum.week;
      component.presetSelected = CalendarRangeEnum.week;
      spyOn(component, 'setPreselectedRange').and.callThrough();
      const spySetRange = spyOn(component, 'setRange');
      const spySetPresetByRangeType = spyOn(component, 'setPresetByRangeType');

      component.setPreselectedRange();
      fixture.detectChanges();

      expect(spySetRange).not.toHaveBeenCalled();
      expect(spySetPresetByRangeType).not.toHaveBeenCalled();
    });

    it('when is defined and selected Custom', () => {
      component.range = CalendarRangeEnum.custom;
      component.presetSelected = CalendarRangeEnum.week;
      spyOn(component, 'setPreselectedRange').and.callThrough();
      const spySetRange = spyOn(component, 'setRange');
      const spySetPresetByRangeType = spyOn(component, 'setPresetByRangeType');

      component.setPreselectedRange();
      fixture.detectChanges();

      expect(spySetRange).toHaveBeenCalled();
      expect(spySetPresetByRangeType).toHaveBeenCalled();
    });
  });

  describe('should setPresetByRangeType()', () => {
    it('when is week', () => {
      const spyWeek = spyOn(component, 'week');
      component.setPresetByRangeType(CalendarRangeEnum.week);

      expect(spyWeek).toHaveBeenCalled();
    });

    it('when is month', () => {
      const spyMonth = spyOn(component, 'month');
      component.setPresetByRangeType(CalendarRangeEnum.month);

      expect(spyMonth).toHaveBeenCalled();
    });

    it('when is last month', () => {
      const spyLastMonth = spyOn(component, 'lastMonth');
      component.setPresetByRangeType(CalendarRangeEnum.lastMonth);

      expect(spyLastMonth).toHaveBeenCalled();
    });

    it('when is year', () => {
      const spyYear = spyOn(component, 'year');
      component.setPresetByRangeType(CalendarRangeEnum.year);

      expect(spyYear).toHaveBeenCalled();
    });

    it('when is last year', () => {
      const spyLastYear = spyOn(component, 'lastYear');
      component.setPresetByRangeType(CalendarRangeEnum.lastYear);

      expect(spyLastYear).toHaveBeenCalled();
    });
  });

  describe('should change menu', () => {

    it('custom', () => {

      // Arrange

      // Act
      component.custom();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

    it('week', () => {

      // Arrange

      // Act
      component.week();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.week);

    });

    it('month', () => {

      // Arrange

      // Act
      component.month();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.month);

    });

    it('lastMonth', () => {

      // Arrange

      // Act
      component.lastMonth();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.lastMonth);

    });

    it('lastTwoMonth', () => {

      // Arrange

      // Act
      component.lastTwoMonth();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.lastTwoMonth);

    });

    it('lastSemester', () => {

      // Arrange

      // Act
      component.lastSemester();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.lastSemester);

    });

    it('year', () => {

      // Arrange

      // Act
      component.year();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.year);

    });

    it('lastYear', () => {

      // Arrange

      // Act
      component.lastYear();

      // Assert

      expect(component.range).toEqual(CalendarRangeEnum.lastYear);

    });

  });

  describe('should change initial date', () => {

    it('not set final date too', () => {

      // Arrange
      var finalDate: Date   = new Date(2020, 3, 3);
      var initialDate: Date = new Date(2020, 1, 1);

      // Act
      component.changeFinalDate(finalDate);
      component.changeInitialDate(initialDate);

      // Assert
      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

    it('set final date too', () => {

      // Arrange
      var initialDate: Date = new Date(2020, 4, 4);
      var finalDate: Date   = new Date(2020, 3, 3);

      // Act
      component.changeFinalDate(finalDate);
      component.changeInitialDate(initialDate);

      // Assert
      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

  });

  describe('should change final date', () => {

    it('not set initial date too', () => {

      // Arrange
      var initialDate: Date = new Date(2020, 3, 3);
      var finalDate: Date   = new Date(2020, 4, 4);

      // Act
      component.changeInitialDate(initialDate);
      component.changeFinalDate(finalDate);

      // Assert
      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

    it('set initial date too', () => {

      // Arrange
      var initialDate: Date = new Date(2020, 4, 4);
      var finalDate: Date   = new Date(2020, 3, 3);

      // Act
      component.changeInitialDate(initialDate);
      component.changeFinalDate(finalDate);

      // Assert
      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

  });

  it('should set limit start and end', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var initialDate: Date = today;
    var finalDate: Date   = tomorrow;
        component.limit   = RangeDate.createCompleteInstace(initialDate, finalDate);

    // Act
    var startDate = component.getStartDate();
    var endDate   = component.getEndDate();

    // Assert
    expect(today == startDate).toBeTruthy();
    expect(tomorrow == endDate).toBeTruthy();

  });

  it('should get selected range', () => {

    // Arrange

    // Act
    var selectedRange = component.getSelectedRange();

    // Assert
    expect(selectedRange).not.toBeUndefined();
    expect(selectedRange).not.toBeNull();

  });

  it('should listener range date', fakeAsync(() => {

    // Arrange
    var setSelectedRange = spyOn(component, 'setSelectedRange');
    mockStore.select.and.returnValue(of({}));

    // Act
    component.listenerRangeDate();
    tick();

    // Assert
    expect(setSelectedRange).toHaveBeenCalled();

  }));

  it('should set selected range', () => {

    // Arrange
    var rangeDate: RangeDate = new RangeDate();

    // Act
    component.setSelectedRange(rangeDate);

    // Assert
    expect(rangeDate == component.selectedRange).toBeTruthy();

  });

});
