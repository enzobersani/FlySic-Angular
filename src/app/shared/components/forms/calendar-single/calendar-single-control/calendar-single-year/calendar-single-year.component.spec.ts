import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSingleYearComponent } from './calendar-single-year.component';

describe('CalendarSingleYearComponent', () => {
  let component: CalendarSingleYearComponent;
  let fixture: ComponentFixture<CalendarSingleYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSingleYearComponent);
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
});
