import { TestBed } from '@angular/core/testing';
import { CalendarRangeDateValidationModel } from '../../models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../models/base-calendar-range.model';
import { CalendarValidDatesLimitService } from './base-calendar-valid-dates-limit.service';
import { CalendarValidDatesRangeService } from './base-calendar-valid-dates-range.service';
import { CalendarValidDatesService } from './base-calendar-valid-dates.service';

class ValidDatesRangeServiceMock {
  select(rangeDate: CalendarRangeDateValidationModel) {
    return rangeDate;
  }
}
class ValidDatesLimitServiceMock {
  select(rangeDate: CalendarRangeDateValidationModel) {
    return rangeDate;
  }
}

describe('CalendarValidDatesService', () => {
  let service: CalendarValidDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CalendarValidDatesRangeService,
          useClass: ValidDatesRangeServiceMock,
        },
        {
          provide: CalendarValidDatesLimitService,
          useClass: ValidDatesLimitServiceMock,
        },
        CalendarValidDatesService,
      ],
    });
    service = TestBed.inject(CalendarValidDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    // Arrange
    let rangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    let limit: CalendarRangeDateModel = new CalendarRangeDateModel();

    // Act
    let result = service.select(rangeDateModel, limit);

    // Assert
    expect(result).toEqual(rangeDateModel);
  });
});
