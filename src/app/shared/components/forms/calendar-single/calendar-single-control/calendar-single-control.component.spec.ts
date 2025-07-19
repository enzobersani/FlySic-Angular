import { CalendarTextServiceMock } from './../../../../_mocks/service/base-calendar-texts.service.mock';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TextsService }                               from '../services/texts.service';
import { of } from 'rxjs';
import { CalendarSingleControlComponent } from './calendar-single-control.component';
import { CalendarSingleMonthComponent } from './calendar-single-month/calendar-single-month.component';
import { CalendarSingleMonthNumberComponent } from './calendar-single-month-number/calendar-single-month-number.component';
import { CalendarSingleYearComponent } from './calendar-single-year/calendar-single-year.component';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarStatusEnum } from '../../base-calendar/enums/base-calendar-status.enum';


describe('CalendarSingleControlComponent', () => {

  let component: CalendarSingleControlComponent;
  let fixture  : ComponentFixture<CalendarSingleControlComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalendarSingleMonthComponent,
        CalendarSingleMonthNumberComponent,
        CalendarSingleYearComponent
      ],
      providers   : [
        {
          provide : TextsService,
          useValue: textsServiceMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(CalendarSingleControlComponent);
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
      var prevMonthNumber  = spyOn(component, 'prevMonthNumber');
      var prevYear         = spyOn(component, 'prevYear');

      // Act
      component.prev(new Date());

      // Assert
      expect(prevMonthNumber).toHaveBeenCalled();
      expect(prevYear).not.toHaveBeenCalled();

    });

    it('year', () => {

      // Arrange
          component.status = CalendarStatusEnum.Year;
      var prevMonthNumber  = spyOn(component, 'prevMonthNumber');
      var prevYear         = spyOn(component, 'prevYear');

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
      var nextMonthNumber  = spyOn(component, 'nextMonthNumber');
      var nextYear         = spyOn(component, 'nextYear');

      // Act
      component.next(new Date());

      // Assert
      expect(nextMonthNumber).toHaveBeenCalled();
      expect(nextYear).not.toHaveBeenCalled();

    });

    it('year', () => {

      // Arrange
          component.status = CalendarStatusEnum.Year;
      var nextMonthNumber  = spyOn(component, 'nextMonthNumber');
      var nextYear         = spyOn(component, 'nextYear');

      // Act
      component.next(new Date());

      // Assert
      expect(nextMonthNumber).not.toHaveBeenCalled();
      expect(nextYear).toHaveBeenCalled();

    });

  });

  it('should prev month', () => {

    // Arrange
    var year       = 2020;
    var month      = 2;
    var day        = 1;
    var date: Date = new Date(year, month, day);

    // Act
    component.prevMonthNumber(date);

    // Assert
    expect(component.paginationDate.getMonth()).toEqual(month - 1);

  });

  it('should next month', () => {

    // Arrange
    var year       = 2020;
    var month      = 2;
    var day        = 1;
    var date: Date = new Date(year, month, day);

    // Act
    component.nextMonthNumber(date);

    // Assert
    expect(component.paginationDate.getMonth()).toEqual(month + 1);

  });

  it('should prev year', () => {

    // Arrange
    var original = component.pagesYear;

    // Act
    component.prevYear();

    // Assert
    expect(component.pagesYear).toEqual(original - 1);

  });

  it('should next year', () => {

    // Arrange
    var original = component.pagesYear;

    // Act
    component.nextYear();

    // Assert
    expect(component.pagesYear).toEqual(original + 1);

  });

  it('should start close month or year calendar in change date event', fakeAsync(() => {

    // Arrange
    var closeMonthOrYearCalendar = spyOn(component, 'closeMonthOrYearCalendar');
    var today                    = new Date();
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
    var today = new Date();

    // Act
    component.selectedDate = today;

    // Assert
    expect(today).toEqual(component.selectedDate);

  });

  it('should set null selected date', () => {

    // Arrange
    var today = null;

    // Act
    component.selectedDate = today;

    // Assert
    expect(today).toEqual(component.selectedDate);

  });

});
