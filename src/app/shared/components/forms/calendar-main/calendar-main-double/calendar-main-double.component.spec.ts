import { Directive, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CalendarMainControlComponentMock } from '../../../../_mocks/components/calendar-main-control.component.mock';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarTextServiceMock } from '../../../../_mocks/service/base-calendar-texts.service.mock';
import { CalendarRangeEnum } from '../../base-calendar/enums/base-calendar-range.enum';
import { CalendarRangeDateModel } from '../../base-calendar/models/base-calendar-range.model';
import { CalendarIdService } from '../../base-calendar/services/base-calendar-id.service';
import { CalendarRangeService } from '../../base-calendar/services/base-calendar-range.service';
import { CalendarTextsService } from '../../base-calendar/services/base-calendar-texts.service';
import { CalendarMainDoubleComponent } from './calendar-main-double.component';

class RangeServiceMock {
  lastYear() { return new CalendarRangeDateModel(); }
  lastSemester() { return new CalendarRangeDateModel(); }
  week() { return new CalendarRangeDateModel(); }
  lastTwoMonth() { return new CalendarRangeDateModel(); }
  lastMonth() { return new CalendarRangeDateModel(); }
  month() { return new CalendarRangeDateModel(); }
  year() { return new CalendarRangeDateModel(); }
}

class IdServiceMock {
  get() {
    return '1234';
  }
}

@Directive({
    selector: '[csoCalendarMainLegacyScroll]',
    standalone: true
})
class LegacyScrollMock { @Input() fixedPoint: any; }

describe('CalendarMainDoubleComponent', () => {
  let component: CalendarMainDoubleComponent;
  let fixture  : ComponentFixture<CalendarMainDoubleComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  let mockStore = jasmine.createSpyObj(['select', 'dispatch']);
  mockStore.select.and.returnValue(of());
  mockStore.dispatch.and.returnValue();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CalendarMainDoubleComponent, LegacyScrollMock],
    declarations: [CalendarMainControlComponentMock],
    providers: [
        {
            provide: CalendarRangeService,
            useClass: RangeServiceMock
        },
        {
            provide: CalendarIdService,
            useClass: IdServiceMock
        },
        {
            provide: Store,
            useValue: mockStore
        },
        {
            provide: CalendarTextsService,
            useValue: textsServiceMock
        }
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(CalendarMainDoubleComponent);
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
      let finalDate: Date   = new Date(2020, 3, 3);
      let initialDate: Date = new Date(2020, 1, 1);

      // Act
      component.changeFinalDate(finalDate);
      component.changeInitialDate(initialDate);

      // Assert
      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

    it('set final date too', () => {

      // Arrange
      let initialDate: Date = new Date(2020, 4, 4);
      let finalDate: Date   = new Date(2020, 3, 3);

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
      let initialDate: Date = new Date(2020, 3, 3);
      let finalDate: Date   = new Date(2020, 4, 4);

      // Act
      component.changeInitialDate(initialDate);
      component.changeFinalDate(finalDate);

      // Assert
      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

    it('set initial date too', () => {

      // Arrange
      let initialDate: Date = new Date(2020, 4, 4);
      let finalDate: Date   = new Date(2020, 3, 3);

      // Act
      component.changeInitialDate(initialDate);
      component.changeFinalDate(finalDate);

      // Assert
      expect(component.range).toEqual(CalendarRangeEnum.custom);

    });

  });

  it('should set limit start and end', () => {

    // Arrange
    let today    = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let initialDate: Date = today;
    let finalDate: Date   = tomorrow;
        component.limit   = CalendarRangeDateModel.createCompleteInstace(initialDate, finalDate);

    // Act
    let startDate = component.getStartDate();
    let endDate   = component.getEndDate();

    // Assert
    expect(today == startDate).toBeTruthy();
    expect(tomorrow == endDate).toBeTruthy();

  });

  it('should get selected range', () => {

    // Arrange

    // Act
    let selectedRange = component.getSelectedRange();

    // Assert
    expect(selectedRange).not.toBeUndefined();
    expect(selectedRange).not.toBeNull();

  });

  it('should listener range date', fakeAsync(() => {

    // Arrange
    let setSelectedRange = spyOn(component, 'setSelectedRange');
    mockStore.select.and.returnValue(of({}));

    // Act
    component.listenerRangeDate();
    tick();

    // Assert
    expect(setSelectedRange).toHaveBeenCalled();

  }));

  it('should set selected range', () => {

    // Arrange
    let rangeDate: CalendarRangeDateModel = new CalendarRangeDateModel();

    // Act
    component.setSelectedRange(rangeDate);

    // Assert
    expect(rangeDate == component.selectedRange).toBeTruthy();

  });

});