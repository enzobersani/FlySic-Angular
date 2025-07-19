import { ValidDatesLimitService } from './valid-dates-limit.service';
import { ValidDatesRangeService } from './valid-dates-range.service';
import { TestBed }                from '@angular/core/testing';
import { ValidDatesService }      from './valid-dates.service';
import { RangeDateModel }         from '../../../../store/models/range-date.model';
import { RangeDate }              from '../../../../model/range-date.model';

class ValidDatesRangeServiceMock {
  select(rangeDate: RangeDateModel) {
    return rangeDate;
  }
}
class ValidDatesLimitServiceMock {
  select(rangeDate: RangeDateModel) {
    return rangeDate;
  }
}

describe('ValidDatesService', () => {
  let service: ValidDatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide : ValidDatesRangeService,
          useClass: ValidDatesRangeServiceMock
        }, {
          provide : ValidDatesLimitService,
          useClass: ValidDatesLimitServiceMock
        },
        ValidDatesService
      ]
    });
    service = TestBed.inject(ValidDatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {

    // Arrange
    var rangeDateModel: RangeDateModel = new RangeDateModel();
    var limit: RangeDate               = new RangeDate();

    // Act
    var result = service.select(rangeDateModel, limit);

    // Assert
    expect(result).toEqual(rangeDateModel);

  });

});
