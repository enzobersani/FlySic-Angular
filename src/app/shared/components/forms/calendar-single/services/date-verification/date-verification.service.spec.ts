import { Source }                   from './../../enum/source.enum';
import { BothDatesRequiredService } from './verifications/both-dates-required/both-dates-required.service';
import { ValidDatesService }        from './verifications/valid-dates/valid-dates.service';
import { IdService }                from './../id.service';
import { Store }                    from '@ngrx/store';
import { of }                       from 'rxjs';
import { TestBed }                  from '@angular/core/testing';
import { DateVerificationService }  from './date-verification.service';
import { RangeDateModel }           from '../../store/models/range-date.model';
import { FixDatesConfigs }          from './models/fix-dates.configs';
import { RangeDate }                from '../../model/range-date.model';

class IdServiceMock { get() { } }
class ValidDatesServiceMock { select(rangeDateModel: RangeDateModel) { return rangeDateModel } }
class BothDatesRequiredServiceMock { select(rangeDateModel: RangeDateModel) { return rangeDateModel } }

describe('DateVerificationService', () => {
  let service: DateVerificationService;

  var mockStore = jasmine.createSpyObj(['select', 'dispatch']);
  mockStore.select.and.returnValue(of());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide : Store,
          useValue: mockStore
        },
        {
          provide : IdService,
          useClass: IdServiceMock
        },
        {
          provide : ValidDatesService,
          useClass: ValidDatesServiceMock
        },
        {
          provide : BothDatesRequiredService,
          useClass: BothDatesRequiredServiceMock
        },
        DateVerificationService
      ]
    });
    service = TestBed.inject(DateVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fix', () => {

    // Arrange
    var readOnlyRangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
        readOnlyRangeDateModel.source          = Source.Fix;
    var configs: FixDatesConfigs               = new FixDatesConfigs();
        configs.limit                          = RangeDate.createCompleteInstace();

    // Act
    service.fixDates(readOnlyRangeDateModel, configs);

    // Assert
    expect(mockStore.dispatch).toHaveBeenCalled();

  });

});
