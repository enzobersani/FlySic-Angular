import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { of } from 'rxjs';
import { TEXTS_MODEL_MOCK } from '../../../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarTextServiceMock } from '../../../../../_mocks/service/base-calendar-texts.service.mock';
import { CalendarTextsService } from '../../../base-calendar/services/base-calendar-texts.service';
import { CalendarMainMonthNumberComponent } from './calendar-main-month-number.component';

describe('CalendarMainMonthNumberComponent', () => {
  let component: CalendarMainMonthNumberComponent;
  let fixture  : ComponentFixture<CalendarMainMonthNumberComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  beforeEach((() => {
    TestBed.configureTestingModule({
    imports: [CalendarMainMonthNumberComponent],
    providers: [
        {
            provide: CalendarTextsService,
            useValue: textsServiceMock,
        }
    ]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture                  = TestBed.createComponent(CalendarMainMonthNumberComponent);
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
    let date: Date = new Date();
    let emit       = spyOn(component.changeDate, 'emit');

    // Act
    component.selectDay(date);

    // Assert
    expect(emit).toHaveBeenCalled();

  });

  it('should update days of month on change', () => {

    // Arrange
    let changes           = {} as SimpleChanges;
    let updateDaysOfMonth = spyOn(component, 'updateDaysOfMonth');

    // Act
    component.ngOnChanges(changes);

    // Assert
    expect(updateDaysOfMonth).toHaveBeenCalled();

  });

  it('should is start date', () => {

    // Arrange
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let today: Date = new Date();
    spyOn(component, 'getStartDate').and.returnValue(tomorrow);

    // Act
    let result = component.isStartDate(today);

    // Assert
    expect(result).toBeTruthy();

  });

  it('should is end date', () => {

    // Arrange
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let today: Date = new Date();
    spyOn(component, 'getFinalDate').and.returnValue(today);

    // Act
    let result = component.isEndDate(tomorrow);

    // Assert
    expect(result).toBeTruthy();

  });

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let today: Date = new Date();

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
      let result = component.inRange(element.date);

      // Assert
      expect(result).toEqual(element.return);

    });

  });

});
