import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RangeDate } from '../../model/range-date.model';
import { CalendarMonthYearTextsService } from '../../services/texts.service';
import { CalendarMonthComponent } from './calendar-month.component';
import { CalendarTextServiceMock } from 'projects/csonline/design-system/src/lib/_mocks/service/base-calendar-texts.service.mock';
import { TEXTS_MODEL_MOCK } from 'projects/csonline/design-system/src/lib/_mocks/data/base-calendar-texts.data.mock';


xdescribe('CalendarMonthComponent', () => {
  let component: CalendarMonthComponent;
  let fixture: ComponentFixture<CalendarMonthComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarMonthComponent],
      providers: [
        {
          provide: CalendarMonthYearTextsService,
          useValue: textsServiceMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthComponent);
    component = fixture.componentInstance;


    textsServiceMock.asyncTexts = of(TEXTS_MODEL_MOCK);
    textsServiceMock.getAsyncTexts()
    textsServiceMock.getText()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set month', () => {

    // Arrange
    var month: number = 1;
    var emit = spyOn(component.changeDate, 'emit');

    // Act
    component.setMonth(month);

    // Assert
    expect(emit).toHaveBeenCalled();

  });

  it('should not set month', () => {

    // Arrange
    var month: number = -1;
    var emit = spyOn(component.changeDate, 'emit');

    // Act
    component.setMonth(month);

    // Assert
    expect(emit).not.toHaveBeenCalled();

  });

  xdescribe('should isEnable()', () => {
    it('when pass a invalid month number', () => {
      const result = component.isEnable(0);

      expect(result).toBe(false);
    });

    it('when limit is undefined', () => {
      const rangeDate = new RangeDate();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.initialDate = null;
      mockRangeDate.finalDate = null;
      component.limit = mockRangeDate;
      component.date = new Date('05/05/23');

      fixture.detectChanges();

      expect(component.isEnable(2)).toBe(true);
    });

    it('when it has not passed at initial/final limit', () => {
      const rangeDate = new RangeDate();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.initialDate = new Date('05/05/23');
      mockRangeDate.finalDate = new Date('08/08/23');
      component.limit = mockRangeDate;
      component.date = new Date('05/05/23');


      fixture.detectChanges();

      expect(component.isEnable(2)).toBe(false);
      expect(component.isEnable(9)).toBe(false);
    });

    it('when it has passed at initial/final limit', () => {
      const rangeDate = new RangeDate();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.initialDate = new Date('05/05/23');
      mockRangeDate.finalDate = new Date('08/08/23');
      component.limit = mockRangeDate;

      fixture.detectChanges();

      expect(component.isEnable(6)).toBe(true);
      expect(component.isEnable(7)).toBe(true);
    });

    it('when it has passed at final with initial date null', () => {
      const rangeDate = new RangeDate();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.initialDate = null;
      mockRangeDate.finalDate = new Date('05/05/23');
      component.limit = mockRangeDate;

      fixture.detectChanges();

      expect(component.isEnable(1)).toBe(true);
    });

    it('when it has passed at initial with final date null', () => {
      const rangeDate = new RangeDate();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.finalDate = null;
      mockRangeDate.initialDate = new Date('05/05/23');
      component.limit = mockRangeDate;

      fixture.detectChanges();

      expect(component.isEnable(5)).toBe(true);
    });
  });

  xdescribe('should checkByInitialDate()', () => {
    it('when Date is null', () => {
      expect(component.checkByInitialDate(1, null)).toBe(true);
    });

    it('when Date is defined with a Future Year', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByInitialDate(2, new Date('2/5/24'))).toBe(false);
    });

    it('when Date is defined with a Past/Current Year', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByInitialDate(2, new Date('2/5/22'))).toBe(true);
      expect(component.checkByInitialDate(2, new Date('2/5/23'))).toBe(true);
    });

    it('when Date is defined with a Future Month', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByInitialDate(2, new Date('5/5/23'))).toBe(false);
    });

    it('when Date is defined with a Past/Current Month', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByInitialDate(2, new Date('1/1/23'))).toBe(true);
      expect(component.checkByInitialDate(2, new Date('2/2/23'))).toBe(true);
    });

    it('when Date is defined with a Current Year and Future Month', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByInitialDate(2, new Date('5/5/23'))).toBe(false);
    });
  });

  xdescribe('should checkByFinalDate()', () => {
    it('when Date is null', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByFinalDate(1, null)).toBe(true);
    });

    it('when Date is defined with a Future Year', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByFinalDate(2, new Date('2/5/24'))).toBe(true);
    });

    it('when Date is defined with a Past Year', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByFinalDate(2, new Date('2/5/22'))).toBe(false);
    });

    it('when Date is defined with a Future Month', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByFinalDate(2, new Date('2/5/23'))).toBe(true);
    });

    it('when Date is defined with a Past Month', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByFinalDate(2, new Date('1/1/23'))).toBe(false);
    });

    it('when Date is defined with a Current Year and Future Month', () => {
      component.date = new Date('01/01/23');
      expect(component.checkByFinalDate(7, new Date('5/5/23'))).toBe(false);
    });
  });
});
