import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TEXTS_MODEL_MOCK } from '../../../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarTextServiceMock } from '../../../../../_mocks/service/base-calendar-texts.service.mock';
import { CalendarRangeDateModel } from '../../../base-calendar/models/base-calendar-range.model';
import { CalendarTextsService } from './../../../base-calendar/services/base-calendar-texts.service';
import { CalendarMainMonthComponent } from './calendar-main-month.component';

xdescribe('CalendarMainMonthComponent', () => {
  let component: CalendarMainMonthComponent;
  let fixture  : ComponentFixture<CalendarMainMonthComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CalendarMainMonthComponent],
    providers: [
        {
            provide: CalendarTextsService,
            useValue: textsServiceMock
        }
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(CalendarMainMonthComponent);
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
    let month: number = 1;
    let emit          = spyOn(component.changeDate, 'emit');

    // Act
    component.setMonth(month);

    // Assert
    expect(emit).toHaveBeenCalled();

  });

  xdescribe('should isEnable()', () => {
    it('when pass a invalid month number', () => {
      const errorMessage = 'Invalid value entered, values must be between 1 and 12';
      try {
        // Act
        component.isEnable(0)
      } catch (error) {
        // Assert
        expect(error).toEqual(errorMessage);
      }
      try {
        // Act
        component.isEnable(13)
      } catch (error) {
        // Assert
        expect(error).toEqual(errorMessage);
      }
    });

    it('when limit is undefined', () => {
      const rangeDate = new CalendarRangeDateModel();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.initialDate = null;
      mockRangeDate.finalDate = null;
      component.limit = mockRangeDate;
      component.date = new Date('05/05/23');

      fixture.detectChanges();

      expect(component.isEnable(2)).toBe(true);
    });

    it('when it has not passed at initial/final limit', () => {
      const rangeDate = new CalendarRangeDateModel();
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
      const rangeDate = new CalendarRangeDateModel();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.initialDate = new Date('05/05/23');
      mockRangeDate.finalDate = new Date('08/08/23');
      component.limit = mockRangeDate;      

      fixture.detectChanges();

      expect(component.isEnable(6)).toBe(true);
      expect(component.isEnable(7)).toBe(true);
    });

    it('when it has passed at final with initial date null', () => {
      const rangeDate = new CalendarRangeDateModel();
      const mockRangeDate = rangeDate.getClone();
      mockRangeDate.initialDate = null;
      mockRangeDate.finalDate = new Date('05/05/23');
      component.limit = mockRangeDate;

      fixture.detectChanges();

      expect(component.isEnable(1)).toBe(true);
    });

    it('when it has passed at initial with final date null', () => {
      const rangeDate = new CalendarRangeDateModel();
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
