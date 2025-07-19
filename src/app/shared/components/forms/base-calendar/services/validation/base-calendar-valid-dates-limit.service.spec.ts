import { TestBed } from '@angular/core/testing';
import { CalendarSourceEnum } from '../../enums/base-calendar-source.enum';
import { CalendarRangeDateValidationModel } from '../../models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../models/base-calendar-range.model';
import { CalendarValidDatesLimitService } from './base-calendar-valid-dates-limit.service';

describe('CalendarValidDatesLimitService', () => {
  let service: CalendarValidDatesLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarValidDatesLimitService],
    });
    service = TestBed.inject(CalendarValidDatesLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should valid initial and final', () => {
    // Arrange
    let selectInitial = spyOn(service, 'selectInitial');
    let selectFinal = spyOn(service, 'selectFinal');
    let rangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    let limit: CalendarRangeDateModel = new CalendarRangeDateModel();

    // Act
    service.select(rangeDateModel, limit);

    // Assert
    expect(selectInitial).toHaveBeenCalled();
    expect(selectFinal).toHaveBeenCalled();
  });

  it('should select initial limit initial', () => {
    // Arrange
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let rangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    let limit: CalendarRangeDateModel = CalendarRangeDateModel.createCompleteInstace();

    if (rangeDateModel.dates) rangeDateModel.dates.initialDate = today;
    limit.initialDate = tomorrow;
    spyOn(service, 'getNextDay').and.callFake((value) => value);

    // Act
    let result = service.selectInitial(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(CalendarSourceEnum.Fix);
    expect(limit.initialDate == result?.dates?.initialDate).toBeTruthy();
  });

  it('should select initial limit final', () => {
    // Arrange
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let rangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    let limit: CalendarRangeDateModel = CalendarRangeDateModel.createCompleteInstace();
    if (rangeDateModel.dates) rangeDateModel.dates.initialDate = tomorrow;
    limit.finalDate = today;

    // Act
    let result = service.selectInitial(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(CalendarSourceEnum.Fix);
    expect(limit.finalDate == result?.dates?.initialDate).toBeTruthy();
  });

  it('should select final limit initial', () => {
    // Arrange
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let rangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    let limit: CalendarRangeDateModel = CalendarRangeDateModel.createCompleteInstace();
    if (rangeDateModel.dates) rangeDateModel.dates.finalDate = today;
    limit.initialDate = tomorrow;
    spyOn(service, 'getNextDay').and.callFake((value) => value);

    // Act
    let result = service.selectFinal(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(CalendarSourceEnum.Fix);
    expect(limit.initialDate == result?.dates?.finalDate).toBeTruthy();
  });

  it('should select final limit final', () => {
    // Arrange
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let rangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    let limit: CalendarRangeDateModel = CalendarRangeDateModel.createCompleteInstace();
    if (rangeDateModel.dates) rangeDateModel.dates.finalDate = tomorrow;
    limit.finalDate = today;

    // Act
    let result = service.selectFinal(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(CalendarSourceEnum.Fix);
    expect(limit.finalDate == result?.dates?.finalDate).toBeTruthy();
  });

  it('should get next day', () => {
    // Arrange
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Act
    let result = service.getNextDay(today);

    // Assert
    expect(tomorrow).toEqual(result);
  });
});
