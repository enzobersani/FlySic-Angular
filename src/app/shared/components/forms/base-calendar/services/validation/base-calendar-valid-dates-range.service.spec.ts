import { TestBed } from '@angular/core/testing';
import { CalendarSourceEnum } from '../../enums/base-calendar-source.enum';
import { CalendarRangeDateValidationModel } from '../../models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../models/base-calendar-range.model';
import { CalendarValidDatesRangeService } from './base-calendar-valid-dates-range.service';

describe('CalendarValidDatesRangeService', () => {
  let service: CalendarValidDatesRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarValidDatesRangeService]
    });
    service = TestBed.inject(CalendarValidDatesRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select initial', () => {

    // Arrange
    let today    = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let rangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    if (rangeDateModel.dates) {
      rangeDateModel.dates.initialDate = tomorrow;
      rangeDateModel.dates.finalDate   = today;
    }
    rangeDateModel.source = CalendarSourceEnum.Initial;
    spyOn(service, 'hasInvalidDate').and.returnValue(false);

    // Act
    let result = service.select(rangeDateModel);

    // Assert
    expect(result?.source).toEqual(CalendarSourceEnum.Fix);
    if (result?.dates)
      expect(result.dates.initialDate).toEqual(result.dates.finalDate);

  });

  it('should select finalDate', () => {

    // Arrange
    let today    = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let rangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    if (rangeDateModel.dates) {
      rangeDateModel.dates.initialDate = tomorrow;
      rangeDateModel.dates.finalDate   = today;
    }
    rangeDateModel.source = CalendarSourceEnum.Final;
    spyOn(service, 'hasInvalidDate').and.returnValue(false);

    // Act
    let result = service.select(rangeDateModel);

    // Assert
    expect(result?.source).toEqual(CalendarSourceEnum.Fix);
    expect(result?.dates?.initialDate).toEqual(result?.dates?.finalDate);

  });

  it('should select and not fix', () => {

    // Arrange
    let today    = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let rangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    if (rangeDateModel.dates) {
      rangeDateModel.dates.initialDate = today;
      rangeDateModel.dates.finalDate   = tomorrow;
    }
    rangeDateModel.source = CalendarSourceEnum.Final;
    spyOn(service, 'hasInvalidDate').and.returnValue(false);

    // Act
    let result = service.select(rangeDateModel);

    // Assert
    expect(result).toEqual(rangeDateModel);

  });

  it('should select invalid date', () => {

    // Arrange
    let rangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    spyOn(service, 'hasInvalidDate').and.returnValue(true);

    // Act
    let result = service.select(rangeDateModel);

    // Assert
    expect(result).toEqual(rangeDateModel);

  });

  it('should has invalid date 1', () => {

    // Arrange
    let rangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();

    // Act
    let result = service.hasInvalidDate(rangeDateModel);

    // Assert
    expect(result).toBeTruthy();

  });

  it('should has invalid date 2', () => {

    // Arrange
    let rangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    if (rangeDateModel.dates)
      rangeDateModel.dates.initialDate = new Date();

    // Act
    let result = service.hasInvalidDate(rangeDateModel);

    // Assert
    expect(result).toBeTruthy();

  });

  it('should fixed the date if null or empty', () => {

    // Arrange

    // Act
    let result = service.fixedDateIfNullOrEmpty(null);

    // Assert
    expect(result).toEqual(0);

  });

});
