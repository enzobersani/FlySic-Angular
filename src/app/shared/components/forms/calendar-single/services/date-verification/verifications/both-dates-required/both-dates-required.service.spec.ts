import { RangeDateModel }           from './../../../../store/models/range-date.model';
import { TestBed }                  from '@angular/core/testing';
import { BothDatesRequiredService } from './both-dates-required.service';
import { Source }                   from '../../../../enum/source.enum';

describe('BothDatesRequiredService', () => {
  let service: BothDatesRequiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BothDatesRequiredService]
    });
    service = TestBed.inject(BothDatesRequiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select both', () => {

    // Arrange
    var rangeDate: RangeDateModel = new RangeDateModel();
    var bothRequired: boolean     = true;
    var bothDatesRequired         = spyOn(service, 'bothDatesRequired');
    var noRequired                = spyOn(service, 'noRequired');

    // Act
    service.select(rangeDate, bothRequired);

    // Assert
    expect(bothDatesRequired).toHaveBeenCalled();
    expect(noRequired).not.toHaveBeenCalled();

  });

  it('should select no required', () => {

    // Arrange
    var rangeDate: RangeDateModel = new RangeDateModel();
    var bothRequired: boolean     = false;
    var bothDatesRequired         = spyOn(service, 'bothDatesRequired');
    var noRequired                = spyOn(service, 'noRequired');

    // Act
    service.select(rangeDate, bothRequired);

    // Assert
    expect(bothDatesRequired).not.toHaveBeenCalled();
    expect(noRequired).toHaveBeenCalled();

  });

  it('should return fix date initial', () => {

    // Arrange
    var today                     = new Date();
    var rangeDate: RangeDateModel = new RangeDateModel();
    if (rangeDate.dates)
      rangeDate.dates.initialDate = today;

    // Act
    var result = service.bothDatesRequired(rangeDate);

    // Assert
    expect(today == result?.dates?.initialDate).toBeTruthy();
    expect(today == result?.dates?.finalDate).toBeTruthy();
    expect(Source.Fix == result?.source).toBeTruthy();

  });

  it('should return fix date final', () => {

    // Arrange
    var today                     = new Date();
    var rangeDate: RangeDateModel = new RangeDateModel();
    if (rangeDate.dates)
      rangeDate.dates.finalDate = today;

    // Act
    var result = service.bothDatesRequired(rangeDate);

    // Assert
    expect(today == result?.dates?.initialDate).toBeTruthy();
    expect(today == result?.dates?.finalDate).toBeTruthy();
    expect(Source.Fix == result?.source).toBeTruthy();

  });

  it('should not return fix date final', () => {

    // Arrange
    var rangeDate: RangeDateModel = new RangeDateModel();

    // Act
    var result = service.bothDatesRequired(rangeDate);

    // Assert
    expect(result?.dates?.initialDate).toBeNull();
    expect(result?.dates?.finalDate).toBeNull();
    expect(Source.All == result?.source).toBeTruthy();

  });

  it('should return no required initial', () => {

    // Arrange
    var today                     = new Date();
    var rangeDate: RangeDateModel = new RangeDateModel();
        rangeDate.source          = Source.Initial;
    if (rangeDate.dates)
      rangeDate.dates.initialDate = today;
    if (service.previousDates)
      service.previousDates.initialDate = today;

    // Act
    var result = service.noRequired(rangeDate);

    // Assert
    expect(result?.dates?.initialDate).toBeNull();
    expect(Source.Fix == result?.source).toBeTruthy();

  });

  it('should return no required final', () => {

    // Arrange
    var today                     = new Date();
    var rangeDate: RangeDateModel = new RangeDateModel();
        rangeDate.source          = Source.Final;
    if (rangeDate.dates) {
      rangeDate.dates.finalDate = today;
    }
    if (service.previousDates) {
      service.previousDates.finalDate = today;
    }

    // Act
    var result = service.noRequired(rangeDate);

    // Assert
    expect(result?.dates?.finalDate).toBeNull();
    expect(Source.Fix == result?.source).toBeTruthy();

  });

});
