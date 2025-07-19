import { TestBed }                from '@angular/core/testing';
import { Source }                 from '../../../../enum/source.enum';
import { RangeDate }              from '../../../../model/range-date.model';
import { RangeDateModel }         from '../../../../store/models/range-date.model';
import { ValidDatesLimitService } from './valid-dates-limit.service';

describe('ValidDatesLimitService', () => {
  let service: ValidDatesLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidDatesLimitService]
    });
    service = TestBed.inject(ValidDatesLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should valid initial and final', () => {

    // Arrange
    var selectInitial                  = spyOn(service, 'selectInitial');
    var selectFinal                    = spyOn(service, 'selectFinal');
    var rangeDateModel: RangeDateModel = new RangeDateModel();
    var limit: RangeDate               = new RangeDate();

    // Act
    service.select(rangeDateModel, limit);

    // Assert
    expect(selectInitial).toHaveBeenCalled();
    expect(selectFinal).toHaveBeenCalled();

  });

  it('should select initial limit initial', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var rangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
    var limit: RangeDate               = RangeDate.createCompleteInstace();
    if (rangeDateModel.dates)
      rangeDateModel.dates.initialDate = today;
      limit.initialDate                = tomorrow;
    spyOn(service, 'getNextDay').and.callFake(value => value);

    // Act
    var result = service.selectInitial(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(Source.Fix);
    expect(limit.initialDate == result?.dates?.initialDate).toBeTruthy();

  });

  it('should select initial limit final', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var rangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
    var limit: RangeDate               = RangeDate.createCompleteInstace();
    if (rangeDateModel.dates)
      rangeDateModel.dates.initialDate = tomorrow;
      limit.finalDate                  = today;

    // Act
    var result = service.selectInitial(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(Source.Fix);
    expect(limit.finalDate == result?.dates?.initialDate).toBeTruthy();

  });

  it('should select final limit initial', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var rangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
    var limit: RangeDate               = RangeDate.createCompleteInstace();
    if (rangeDateModel.dates)
      rangeDateModel.dates.finalDate = today;
      limit.initialDate              = tomorrow;
    spyOn(service, 'getNextDay').and.callFake(value => value);

    // Act
    var result = service.selectFinal(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(Source.Fix);
    expect(limit.initialDate == result?.dates?.finalDate).toBeTruthy();

  });

  it('should select final limit final', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var rangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
    var limit: RangeDate               = RangeDate.createCompleteInstace();
    if (rangeDateModel.dates)
      rangeDateModel.dates.finalDate = tomorrow;
      limit.finalDate                = today;

    // Act
    var result = service.selectFinal(rangeDateModel, limit);

    // Assert
    expect(result?.source).toEqual(Source.Fix);
    expect(limit.finalDate == result?.dates?.finalDate).toBeTruthy();

  });

  it('should get next day', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Act
    var result = service.getNextDay(today);

    // Assert
    expect(tomorrow).toEqual(result);

  });

});
