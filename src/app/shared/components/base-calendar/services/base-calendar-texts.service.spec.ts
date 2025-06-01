import { of } from 'rxjs';
import { CalendarTextMonthsModel } from '../models/base-calendar-months.model';
import { CalendarTextsModel } from '../models/base-calendar-texts.model';
import { CalendarIdService } from './base-calendar-id.service';
import { CalendarTextsService } from './base-calendar-texts.service';

describe('CalendarTextsService', () => {
  let service: CalendarTextsService;

  const idServiceSpy = jasmine.createSpyObj<CalendarIdService>(['get']);

  beforeEach(() => {
    service = new CalendarTextsService(idServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  [13, 0].forEach(element => {

    it('should get month by number fail', () => {

      // Arrange
      const monthNumber: number = element;

      try {
        // Act
        service.getMonthByNumber(monthNumber)
        expect(false).toBeTruthy();
      } catch (error) {
        // Assert
        expect(error).toEqual('Invalid value entered, values must be between 1 and 12');
      }

    });

  });

  it('should get month by number', () => {

    // Arrange
    const textsModel    = new CalendarTextsModel();
    const monthsModel   = new CalendarTextMonthsModel();
      monthsModel.june  = "june";
      textsModel.months = monthsModel;
    spyOn(service, 'getAsyncTexts').and.returnValue(of(textsModel));
    const monthNumber: number = 6;

    // Act
    const result = service.getMonthByNumber(monthNumber);

    // Assert
    expect("June").toEqual(result);

  });

  it('should get empty when the month is undefine', () => {
    /// Arrange

    // Act
    const result = service.setMonthNumberIfExists('');

    // Assert
    expect(result).toEqual('');
  });

  it('should getAsyncTexts()', () => {
    /// Arrange

    // Act
    const result = service.getAsyncTexts();

    // Assert
    expect(result).not.toBeUndefined();
  });

  it('should getText()', () => {
    // Arrange

    // Act
    const result = service.getText();

    // Assert
    expect(result).not.toBeUndefined();
  });

  it('should get empty when the month is undefined', () => {
    /// Arrange
    const textsModel = new CalendarTextsModel();

    // Act
    const reference = service.getText();
    const result = service.getReferenceIfTextsNotExists();

    // Assert
    expect(result).toEqual(reference);
  });

});
