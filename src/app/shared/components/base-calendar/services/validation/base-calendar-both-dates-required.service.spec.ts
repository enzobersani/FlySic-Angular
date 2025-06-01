import { TestBed } from '@angular/core/testing';
import { CalendarRangeDateValidationModel, CalendarSourceEnum } from '../../public-api';
import { CalendarBothDatesRequiredService } from './base-calendar-both-dates-required.service';

describe('CalendarBothDatesRequiredService', () => {
  let service: CalendarBothDatesRequiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarBothDatesRequiredService]
    });
    service = TestBed.inject(CalendarBothDatesRequiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select both', () => {

    // Arrange
    let rangeDate: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    let bothRequired: boolean     = true;
    let bothDatesRequired         = spyOn(service, 'bothDatesRequired');
    let noRequired                = spyOn(service, 'noRequired');

    // Act
    service.select(rangeDate, bothRequired);

    // Assert
    expect(bothDatesRequired).toHaveBeenCalled();
    expect(noRequired).not.toHaveBeenCalled();

  });

  it('should select no required', () => {

    // Arrange
    let rangeDate: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    let bothRequired: boolean     = false;
    let bothDatesRequired         = spyOn(service, 'bothDatesRequired');
    let noRequired                = spyOn(service, 'noRequired');

    // Act
    service.select(rangeDate, bothRequired);

    // Assert
    expect(bothDatesRequired).not.toHaveBeenCalled();
    expect(noRequired).toHaveBeenCalled();

  });

  it('should return fix date initial', () => {

    // Arrange
    let today                     = new Date();
    let rangeDate: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    if (rangeDate.dates)
      rangeDate.dates.initialDate = today;

    // Act
    let result = service.bothDatesRequired(rangeDate);

    // Assert
    expect(today == result?.dates?.initialDate).toBeTruthy();
    expect(today == result?.dates?.finalDate).toBeTruthy();
    expect(CalendarSourceEnum.Fix == result?.source).toBeTruthy();

  });

  it('should return fix date final', () => {

    // Arrange
    let today                     = new Date();
    let rangeDate: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    if (rangeDate.dates)
      rangeDate.dates.finalDate = today;

    // Act
    let result = service.bothDatesRequired(rangeDate);

    // Assert
    expect(today == result?.dates?.initialDate).toBeTruthy();
    expect(today == result?.dates?.finalDate).toBeTruthy();
    expect(CalendarSourceEnum.Fix == result?.source).toBeTruthy();

  });

  it('should not return fix date final', () => {

    // Arrange
    let rangeDate: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();

    // Act
    let result = service.bothDatesRequired(rangeDate);

    // Assert
    expect(result?.dates?.initialDate).toBeNull();
    expect(result?.dates?.finalDate).toBeNull();
    expect(CalendarSourceEnum.All == result?.source).toBeTruthy();

  });

  it('should return no required initial', () => {

    // Arrange
    let today                     = new Date();
    let rangeDate: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
        rangeDate.source          = CalendarSourceEnum.Initial;
    if (rangeDate.dates)
      rangeDate.dates.initialDate = today;
    if (service.previousDates)
      service.previousDates.initialDate = today;

    // Act
    let result = service.noRequired(rangeDate);

    // Assert
    expect(result?.dates?.initialDate).toBeNull();
    expect(CalendarSourceEnum.Fix == result?.source).toBeTruthy();

  });

  it('should return no required final', () => {

    // Arrange
    let today                     = new Date();
    let rangeDate: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
        rangeDate.source          = CalendarSourceEnum.Final;
    if (rangeDate.dates) {
      rangeDate.dates.finalDate = today;
    }
    if (service.previousDates) {
      service.previousDates.finalDate = today;
    }

    // Act
    let result = service.noRequired(rangeDate);

    // Assert
    expect(result?.dates?.finalDate).toBeNull();
    expect(CalendarSourceEnum.Fix == result?.source).toBeTruthy();

  });

});
