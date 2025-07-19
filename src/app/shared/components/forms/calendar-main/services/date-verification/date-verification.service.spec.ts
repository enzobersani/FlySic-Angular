import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CalendarSourceEnum } from '../../../base-calendar/enums/base-calendar-source.enum';
import { CalendarFixDatesConfigs } from '../../../base-calendar/models/base-calendar-fix-dates-configs.model';
import { CalendarRangeDateValidationModel } from '../../../base-calendar/models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../../base-calendar/models/base-calendar-range.model';
import { CalendarIdService } from '../../../base-calendar/services/base-calendar-id.service';
import { CalendarBothDatesRequiredService } from '../../../base-calendar/services/validation/base-calendar-both-dates-required.service';
import { CalendarValidDatesService } from '../../../base-calendar/services/validation/base-calendar-valid-dates.service';
import { CalendarMainDateVerificationService } from './date-verification.service';

class IdServiceMock {
  get() {}
}
class ValidDatesServiceMock {
  select(rangeDateModel: CalendarRangeDateValidationModel) {
    return rangeDateModel;
  }
}
class BothDatesRequiredServiceMock {
  select(rangeDateModel: CalendarRangeDateValidationModel) {
    return rangeDateModel;
  }
}

describe('CalendarMainDateVerificationService', () => {
  let service: CalendarMainDateVerificationService;

  let mockStore = jasmine.createSpyObj(['select', 'dispatch']);
  mockStore.select.and.returnValue(of());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: mockStore,
        },
        {
          provide: CalendarIdService,
          useClass: IdServiceMock,
        },
        {
          provide: CalendarValidDatesService,
          useClass: ValidDatesServiceMock,
        },
        {
          provide: CalendarBothDatesRequiredService,
          useClass: BothDatesRequiredServiceMock,
        },
        CalendarMainDateVerificationService,
      ],
    });
    service = TestBed.inject(CalendarMainDateVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fix', () => {
    // Arrange
    let readOnlyRangeDateModel: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace());
    readOnlyRangeDateModel.source = CalendarSourceEnum.Fix;
    let configs: CalendarFixDatesConfigs = new CalendarFixDatesConfigs();
    configs.limit = CalendarRangeDateModel.createCompleteInstace();

    // Act
    service.fixDates(readOnlyRangeDateModel, configs);

    // Assert
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
