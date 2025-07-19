import { RangeDateModel }         from './../../../../store/models/range-date.model';
import { TestBed }                from '@angular/core/testing';
import { ValidDatesRangeService } from './valid-dates-range.service';
import { Source }                 from '../../../../enum/source.enum';
import { RangeDate }              from '../../../../model/range-date.model';

describe('ValidDatesRangeService', () => {
  let service: ValidDatesRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidDatesRangeService]
    });
    service = TestBed.inject(ValidDatesRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select initial', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var rangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
    if (rangeDateModel.dates) {
      rangeDateModel.dates.initialDate = tomorrow;
      rangeDateModel.dates.finalDate   = today;
    }
    rangeDateModel.source = Source.Initial;
    spyOn(service, 'hasInvalidDate').and.returnValue(false);

    // Act
    var result = service.select(rangeDateModel);

    // Assert
    expect(result?.source).toEqual(Source.Fix);
    if (result?.dates)
      expect(result.dates.initialDate).toEqual(result.dates.finalDate);

  });

  it('should select finalDate', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var rangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
    if (rangeDateModel.dates) {
      rangeDateModel.dates.initialDate = tomorrow;
      rangeDateModel.dates.finalDate   = today;
    }
    rangeDateModel.source = Source.Final;
    spyOn(service, 'hasInvalidDate').and.returnValue(false);

    // Act
    var result = service.select(rangeDateModel);

    // Assert
    expect(result?.source).toEqual(Source.Fix);
    expect(result?.dates?.initialDate).toEqual(result?.dates?.finalDate);

  });

  it('should select and not fix', () => {

    // Arrange
    var today    = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var rangeDateModel: RangeDateModel = RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace());
    if (rangeDateModel.dates) {
      rangeDateModel.dates.initialDate = today;
      rangeDateModel.dates.finalDate   = tomorrow;
    }
    rangeDateModel.source = Source.Final;
    spyOn(service, 'hasInvalidDate').and.returnValue(false);

    // Act
    var result = service.select(rangeDateModel);

    // Assert
    expect(result).toEqual(rangeDateModel);

  });

  it('should select invalid date', () => {

    // Arrange
    var rangeDateModel: RangeDateModel = new RangeDateModel();
    spyOn(service, 'hasInvalidDate').and.returnValue(true);

    // Act
    var result = service.select(rangeDateModel);

    // Assert
    expect(result).toEqual(rangeDateModel);

  });

  it('should has invalid date 1', () => {

    // Arrange
    var rangeDateModel: RangeDateModel = new RangeDateModel();

    // Act
    var result = service.hasInvalidDate(rangeDateModel);

    // Assert
    expect(result).toBeTruthy();

  });

  it('should has invalid date 2', () => {

    // Arrange
    var rangeDateModel: RangeDateModel = new RangeDateModel();
    if (rangeDateModel.dates)
      rangeDateModel.dates.initialDate = new Date();

    // Act
    var result = service.hasInvalidDate(rangeDateModel);

    // Assert
    expect(result).toBeTruthy();

  });

  it('should fixed the date if null or empty', () => {

    // Arrange

    // Act
    var result = service.fixedDateIfNullOrEmpty(null);

    // Assert
    expect(result).toEqual(0);

  });

});
