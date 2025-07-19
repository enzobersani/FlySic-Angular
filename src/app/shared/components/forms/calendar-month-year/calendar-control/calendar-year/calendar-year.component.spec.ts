import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarYearComponent } from './calendar-year.component';
import { RangeDate } from '../../model/range-date.model';

describe('CalendarYearComponent', () => {
  let component: CalendarYearComponent;
  let fixture: ComponentFixture<CalendarYearComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarYearComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set year by parameter', () => {
    // Arrange
    var mockDateYear = new Date().getFullYear();
    var mockDate = new Date();

    // Act
    component.setYear(mockDateYear);

    // Assert
    expect(component.date.getFullYear).toEqual(mockDate.getFullYear);
  });

  it('should get page number', () => {
    // Arrange
    var pageNumber = 1;

    // Act
    component.page = pageNumber;

    // Assert
    expect(component.page).toEqual(1);
  });

  it('should not set a year bigger then limit', () => {
    // Arrange    
    component.limit = RangeDate.createCompleteInstace(new Date(), new Date());
    var year = 2094;
    var emit = spyOn(component.changeDate, 'emit');

    // Act
    component.setYear(year);

    // Assert
    expect(emit).not.toHaveBeenCalled();
  });

  it('should not set a year smaller then limit', () => {
    // Arrange
    component.limit = RangeDate.createCompleteInstace(new Date(), new Date());
    var year = 1998;
    var emit = spyOn(component.changeDate, 'emit');

    // Act
    component.setYear(year);

    // Assert
    expect(emit).not.toHaveBeenCalled();
  });

  it('should fix invalid month if bigger then final month', () => {
    // Arrange
    component.date = new Date('2023-8-1');
    component.limit = RangeDate.createCompleteInstace(new Date('2023-9-1'), new Date());

    // Act
    component['fixInvalidMonths']();

    // Assert
    expect(component.date).not.toBeNull();
  });

  it('should fix invalid month if bigger then final month', () => {
    // Arrange
    component.date = new Date('2023-10-1');
    component.limit = RangeDate.createCompleteInstace(new Date(), new Date('2023-8-1'));

    // Act
    component['fixInvalidMonths']();

    // Assert
    expect(component.date).not.toBeNull();
  });

  it('should create a new range date instance', () => {
    // Arrange    
    const rangeDate = RangeDate.createDateNowInstace();

    // Act
    const result = rangeDate.toString();

    // Assert
    expect(result).not.toBeNull();
  });

  it('should create a new range date instance with null date', () => {
    // Arrange    
    const rangeDate = RangeDate.createCompleteInstace();

    // Act
    const result = rangeDate.toString();

    // Assert
    expect(result).not.toBeNull();
  });

});
