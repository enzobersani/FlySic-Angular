import { TestBed }      from '@angular/core/testing';
import { RangeService } from './range.service';

describe('RangeService', () => {
  let service: RangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RangeService] });
    service = TestBed.inject(RangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToday should return today Date', () => {
    var today = new Date();

    var result = service.getToday();

    expect(today.getDate()).toEqual(result.getDate());
    expect(today.getMonth()).toEqual(result.getMonth());
    expect(today.getFullYear()).toEqual(result.getFullYear());
  });

  for (let i = 1; i <= 30; i++) {
    it('should get month', () => {

      // Arrange
      spyOn(service, 'getToday').and.returnValue(new Date(2022, 9 - 1, i));

      // Act
      var result = service.month();

      // Assert
      expect(1 == result?.initialDate?.getDate()).toBeTruthy();
      expect(30 == result?.finalDate?.getDate()).toBeTruthy();

    });
  }

  for (let i = 1; i <= 30; i++) {

    it('should get last month', () => {

      // Arrange
      spyOn(service, 'getToday').and.returnValue(new Date(2022, 9 - 1, i));

      // Act
      var result = service.lastMonth();

      // Assert
      expect(1 == result?.initialDate?.getDate()).toBeTruthy();
      expect(31 == result?.finalDate?.getDate()).toBeTruthy();
      expect(8 - 1 == result?.initialDate?.getMonth()).toBeTruthy();
      expect(8 - 1 == result?.finalDate?.getMonth()).toBeTruthy();

    });

    it('should get last two month', () => {

      // Arrange
      spyOn(service, 'getToday').and.returnValue(new Date(2022, 9 - 1, i));

      // Act
      var result = service.lastTwoMonth();

      // Assert
      expect(1 == result?.initialDate?.getDate()).toBeTruthy();
      expect(31 == result?.finalDate?.getDate()).toBeTruthy();
      expect(9 - 1 == result?.initialDate?.getMonth()).toBeTruthy();
      expect(10 - 1 == result?.finalDate?.getMonth()).toBeTruthy();

    });

    it('should get last semester', () => {

      // Arrange
      spyOn(service, 'getToday').and.returnValue(new Date(2022, 9 - 1, i));

      // Act
      var result = service.lastSemester();

      // Assert
      expect(1 == result?.initialDate?.getDate()).toBeTruthy();
      expect(31 == result?.finalDate?.getDate()).toBeTruthy();
      expect(7 - 1 == result?.initialDate?.getMonth()).toBeTruthy();
      expect(12 - 1 == result?.finalDate?.getMonth()).toBeTruthy();

    });

  }

  it('should get year', () => {

    // Arrange
    spyOn(service, 'getToday').and.returnValue(new Date(2022, 9 - 1, 1));

    // Act
    var result = service.year();

    // Assert
    expect(1 == result?.initialDate?.getDate()).toBeTruthy();
    expect(31 == result?.finalDate?.getDate()).toBeTruthy();
    expect(1 - 1 == result?.initialDate?.getMonth()).toBeTruthy();
    expect(12 - 1 == result?.finalDate?.getMonth()).toBeTruthy();
    expect(2022 == result?.initialDate?.getFullYear()).toBeTruthy();
    expect(2022 == result?.finalDate?.getFullYear()).toBeTruthy();

  });

  it('should get last year', () => {

    // Arrange
    spyOn(service, 'getToday').and.returnValue(new Date(2022, 9 - 1, 1));

    // Act
    var result = service.lastYear();

    // Assert
    expect(1 == result?.initialDate?.getDate()).toBeTruthy();
    expect(31 == result?.finalDate?.getDate()).toBeTruthy();
    expect(1 - 1 == result?.initialDate?.getMonth()).toBeTruthy();
    expect(12 - 1 == result?.finalDate?.getMonth()).toBeTruthy();
    expect(2021 == result?.initialDate?.getFullYear()).toBeTruthy();
    expect(2021 == result?.finalDate?.getFullYear()).toBeTruthy();

  });

});
