import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { CalendarMainMonthNumberComponentMock } from '../../../../_mocks/components/calendar-main-month-number.component.mock';
import { CalendarMainMonthComponentMock } from '../../../../_mocks/components/calendar-main-month.component.mock';
import { CalendarMainYearComponentMock } from '../../../../_mocks/components/calendar-main-year.component.mock';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarTextServiceMock } from '../../../../_mocks/service/base-calendar-texts.service.mock';
import { CalendarStatusEnum } from '../../base-calendar/enums/base-calendar-status.enum';
import { CalendarTextsService } from '../../base-calendar/services/base-calendar-texts.service';
import { CalendarMainControlComponent } from './calendar-main-control.component';

describe('CalendarMainControlComponent', () => {

  let component: CalendarMainControlComponent;
  let fixture  : ComponentFixture<CalendarMainControlComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [CalendarMainControlComponent],
    declarations: [CalendarMainMonthNumberComponentMock,
        CalendarMainYearComponentMock,
        CalendarMainMonthComponentMock,],
    providers: [
        {
            provide: CalendarTextsService,
            useValue: textsServiceMock
        }
    ]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(CalendarMainControlComponent);
    component = fixture.componentInstance;
    textsServiceMock.asyncTexts = of(TEXTS_MODEL_MOCK);
    textsServiceMock.getAsyncTexts()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should change status', () => {

    it('month', () => {

      // Arrange

      // Act
      component.month();

      // Assert
      expect(component.status).toEqual(CalendarStatusEnum.MonthText);
    });

    it('year', () => {

      // Arrange

      // Act
      component.year();

      // Assert
      expect(component.status).toEqual(CalendarStatusEnum.Year);
    });

  });

  describe('should prev', () => {

    it('month number', () => {

      // Arrange
          component.status = CalendarStatusEnum.MonthNumber;
      let prevMonthNumber  = spyOn(component, 'prevMonthNumber');
      let prevYear         = spyOn(component, 'prevYear');

      // Act
      component.prev(new Date());

      // Assert
      expect(prevMonthNumber).toHaveBeenCalled();
      expect(prevYear).not.toHaveBeenCalled();

    });

    it('year', () => {

      // Arrange
          component.status = CalendarStatusEnum.Year;
      let prevMonthNumber  = spyOn(component, 'prevMonthNumber');
      let prevYear         = spyOn(component, 'prevYear');

      // Act
      component.prev(new Date());

      // Assert
      expect(prevMonthNumber).not.toHaveBeenCalled();
      expect(prevYear).toHaveBeenCalled();

    });

  });

  describe('should next', () => {

    it('month number', () => {

      // Arrange
          component.status = CalendarStatusEnum.MonthNumber;
      let nextMonthNumber  = spyOn(component, 'nextMonthNumber');
      let nextYear         = spyOn(component, 'nextYear');

      // Act
      component.next(new Date());

      // Assert
      expect(nextMonthNumber).toHaveBeenCalled();
      expect(nextYear).not.toHaveBeenCalled();

    });

    it('year', () => {

      // Arrange
          component.status = CalendarStatusEnum.Year;
      let nextMonthNumber  = spyOn(component, 'nextMonthNumber');
      let nextYear         = spyOn(component, 'nextYear');

      // Act
      component.next(new Date());

      // Assert
      expect(nextMonthNumber).not.toHaveBeenCalled();
      expect(nextYear).toHaveBeenCalled();

    });

  });

  it('should prev month', () => {

    // Arrange
    let year       = 2020;
    let month      = 2;
    let day        = 1;
    let date: Date = new Date(year, month, day);

    // Act
    component.prevMonthNumber(date);

    // Assert
    expect(component.paginationDate.getMonth()).toEqual(month - 1);

  });

  it('should next month', () => {

    // Arrange
    let year       = 2020;
    let month      = 2;
    let day        = 1;
    let date: Date = new Date(year, month, day);

    // Act
    component.nextMonthNumber(date);

    // Assert
    expect(component.paginationDate.getMonth()).toEqual(month + 1);

  });

  it('should prev year', () => {

    // Arrange
    let original = component.pagesYear;

    // Act
    component.prevYear();

    // Assert
    expect(component.pagesYear).toEqual(original - 1);

  });

  it('should next year', () => {

    // Arrange
    let original = component.pagesYear;

    // Act
    component.nextYear();

    // Assert
    expect(component.pagesYear).toEqual(original + 1);

  });

  it('should start close month or year calendar in change date event', fakeAsync(() => {

    // Arrange
    let closeMonthOrYearCalendar = spyOn(component, 'closeMonthOrYearCalendar');
    let today                    = new Date();
    component.changeDate.emit(today);
    tick();

    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(closeMonthOrYearCalendar).toHaveBeenCalled();

  }));

  it('should close month or year calendar in change date event', () => {

    // Arrange
    component.status = CalendarStatusEnum.Year;

    // Act
    component.closeMonthOrYearCalendar();

    // Assert
    expect(CalendarStatusEnum.MonthNumber).toEqual(component.status);

  });

  it('should set selected date', () => {

    // Arrange
    let today = new Date();

    // Act
    component.selectedDate = today;

    // Assert
    expect(today).toEqual(component.selectedDate);

  });

  it('should set null selected date', () => {

    // Arrange
    let today = null;

    // Act
    component.selectedDate = today;

    // Assert
    expect(today).toEqual(component.selectedDate);

  });

});
