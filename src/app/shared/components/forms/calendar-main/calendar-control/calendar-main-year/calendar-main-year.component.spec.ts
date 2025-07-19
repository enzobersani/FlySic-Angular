import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarMainYearComponent } from './calendar-main-year.component';

describe('CalendarMainYearComponent', () => {
  let component: CalendarMainYearComponent;
  let fixture: ComponentFixture<CalendarMainYearComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [CalendarMainYearComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMainYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set year by parameter', () => {
  // Arrange
  let mockDateYear = new Date().getFullYear();
  let mockDate = new Date();

  // Act
  component.setYear(mockDateYear);

  // Assert
    expect(component.date.getFullYear).toEqual(mockDate.getFullYear);
  });

  it('should get page number', () => {
    // Arrange
    let pageNumber = 1;

    // Act
    component.page = pageNumber;

    // Assert
    expect(component.page).toEqual(1);
  });
});
