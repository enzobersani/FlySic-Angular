import { ComponentFixture, TestBed, }   from '@angular/core/testing';
import { CalendarSingleMonthNumberComponent } from './calendar-single-month-number.component';
import { SimpleChanges }                from '@angular/core';
import { TextsService }                 from '../../services/texts.service';
import { of } from 'rxjs';
import { CalendarTextServiceMock } from 'projects/csonline/design-system/src/lib/_mocks/service/base-calendar-texts.service.mock';
import { TEXTS_MODEL_MOCK } from 'projects/csonline/design-system/src/lib/_mocks/data/base-calendar-texts.data.mock';

describe('CalendarSingleMonthNumberComponent', () => {
  let component: CalendarSingleMonthNumberComponent;
  let fixture  : ComponentFixture<CalendarSingleMonthNumberComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  beforeEach((() => {
    TestBed.configureTestingModule({
      providers   : [
        {
          provide : TextsService,
          useValue: textsServiceMock,
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture                  = TestBed.createComponent(CalendarSingleMonthNumberComponent);
    component                = fixture.componentInstance;
    component.paginationDate = new Date();
    textsServiceMock.asyncTexts = of(TEXTS_MODEL_MOCK);
    textsServiceMock.getAsyncTexts()
    textsServiceMock.getText()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select day', () => {

    // Arrange
    var date: Date = new Date();
    var emit       = spyOn(component.changeDate, 'emit');

    // Act
    component.selectDay(date);

    // Assert
    expect(emit).toHaveBeenCalled();

  });

  it('should update days of month on change', () => {

    // Arrange
    var changes           = {} as SimpleChanges;
    var updateDaysOfMonth = spyOn(component, 'updateDaysOfMonth');

    // Act
    component.ngOnChanges(changes);

    // Assert
    expect(updateDaysOfMonth).toHaveBeenCalled();

  });

  it('should is start date', () => {

    // Arrange
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var today: Date = new Date();
    spyOn(component, 'getStartDate').and.returnValue(tomorrow);

    // Act
    var result = component.isStartDate(today);

    // Assert
    expect(result).toBeTruthy();

  });

  it('should is end date', () => {

    // Arrange
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var today: Date = new Date();
    spyOn(component, 'getFinalDate').and.returnValue(today);

    // Act
    var result = component.isEndDate(tomorrow);

    // Assert
    expect(result).toBeTruthy();

  });

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var today: Date = new Date();

  [
    {
      date                   : today,
      getSelectedRangeInitial: tomorrow,
      getSelectedRangeFinal  : yesterday,
      return                 : false
    },
    {
      date                   : today,
      getSelectedRangeInitial: yesterday,
      getSelectedRangeFinal  : tomorrow,
      return                 : true
    }
  ].forEach(element => {

    it('should check if in range', () => {

      // Arrange
      spyOn(component, 'getSelectedRangeInitial').and.returnValue(element.getSelectedRangeInitial);
      spyOn(component, 'getSelectedRangeFinal').and.returnValue(element.getSelectedRangeFinal);

      // Act
      var result = component.inRange(element.date);

      // Assert
      expect(result).toEqual(element.return);

    });

  });

});
