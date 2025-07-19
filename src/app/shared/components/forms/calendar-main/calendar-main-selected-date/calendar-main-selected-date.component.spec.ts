import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarTextServiceMock } from '../../../../_mocks/service/base-calendar-texts.service.mock';
import { CalendarSourceEnum } from '../../base-calendar/enums/base-calendar-source.enum';
import { CalendarRangeDateFormValuesModel } from '../../base-calendar/models/base-calendar-range-date-form-values.model';
import { CalendarRangeDateFormModel } from '../../base-calendar/models/base-calendar-range-date-form.model';
import { CalendarRangeDateModel } from '../../base-calendar/models/base-calendar-range.model';
import { CalendarRangeDateFormFormattedModel } from '../../base-calendar/models/base-calendar-selected-date.model';
import { CalendarIdService } from '../../base-calendar/services/base-calendar-id.service';
import { CalendarTextsService } from '../../base-calendar/services/base-calendar-texts.service';
import { CalendarMainInternalFormService } from '../services/internal-form/internal-form.service';
import { CalendarDateUtilsHelper } from './../../base-calendar/helpers/base-calendar-date-utils.helper';
import { CalendarMainSelectedDateComponent } from './calendar-main-selected-date.component';

export class InternalFormServiceMock {

  internalForm: UntypedFormGroup = new UntypedFormGroup({});
  internalFormValue: CalendarRangeDateFormValuesModel = new CalendarRangeDateFormValuesModel();

  patchRangeDate(rangeDate?: CalendarRangeDateModel | null) {
    this.internalForm.patchValue(this.valuesToJson(rangeDate));
  }

  valuesToJson(rangeDate?: CalendarRangeDateModel | null): CalendarRangeDateFormModel {
    let rangeDateForm             = new CalendarRangeDateFormModel();
        rangeDateForm.initialDate = CalendarDateUtilsHelper.toJson(rangeDate?.initialDate);
        rangeDateForm.finalDate   = this.finalValuesToJson(rangeDate?.finalDate);
    return rangeDateForm;
  }

  finalValuesToJson(datetime?: Date | null): string | null {
    if (!datetime) return null;
    let datetimeJson = CalendarDateUtilsHelper.toJson(datetime);
    let date         = datetimeJson?.split('T')[0];
    return `${date}T23:59:59.999Z`;
  }

  getForm() {
    return this.internalForm;
  }

  getValues(): CalendarRangeDateFormValuesModel {
    return this.internalFormValue;
  }
}
class IdServiceMock {
  get() {
    return '1234';
  }
}

describe('CalendarMainSelectedDateComponent', () => {
  let component: CalendarMainSelectedDateComponent;
  let fixture  : ComponentFixture<CalendarMainSelectedDateComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();
  const internalFormServiceMock: InternalFormServiceMock = new InternalFormServiceMock();

  let mockStore = jasmine.createSpyObj(['select', 'dispatch']);
  mockStore.select.and.returnValue(of());


  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [CalendarMainSelectedDateComponent],
    providers: [
        {
            provide: Store,
            useValue: mockStore
        },
        {
            provide: CalendarIdService,
            useClass: IdServiceMock
        },
        {
            provide: CalendarMainInternalFormService,
            useValue: internalFormServiceMock
        },
        {
            provide: CalendarTextsService,
            useValue: textsServiceMock
        }
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(CalendarMainSelectedDateComponent);
    component = fixture.componentInstance;
    textsServiceMock.asyncTexts = of(TEXTS_MODEL_MOCK);
    textsServiceMock.getAsyncTexts();
    textsServiceMock.getText();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date', () => {

    // Arrange
    let date: Date = new Date();

    // Act
    let result = component.formatDate(date);

    // Assert
    expect(result).toEqual(date.toLocaleDateString());

  });

  it('should format invalid date', () => {

    // Arrange

    // Act
    let result = component.formatDate(undefined);

    // Assert
    expect(result).toEqual("");

  });

  let today = new Date();

  [
    {
      rangeDate: {
        initialDate: today,
        finalDate  : today
      },
      result: today
    }, {
      rangeDate: {
        initialDate: null,
        finalDate  : today
      },
      result: null
    }, {
      rangeDate: {
        initialDate: today,
        finalDate  : null
      },
      result: null
    }, {
      rangeDate: {
        initialDate: null,
        finalDate  : null
      },
      result: null
    }
  ].forEach(element => {
    it('should show separator', () => {

      // Arrange
      let rangeDate: CalendarRangeDateFormFormattedModel = element.rangeDate as CalendarRangeDateFormFormattedModel;

      // Act
      let result = component.showSeparator(rangeDate);

      // Assert
      expect(result).toEqual(element.result);

    });
  });

  describe('should formatDate()', () => {
    it('when date is undefined', () => {
      expect(component.formatDate(null)).toEqual('');
    });

    it('when date is defined', () => {
      const date = new Date('5/5/23');
      expect(component.formatDate(date)).toEqual(date.toLocaleDateString());
    });
  });

  describe('should formatToDate()', () => {
    it('when date is undefined', () => {
      expect(component.formatToDate('')).toBeNull();
    });

    it('when date is defined', () => {
      const dateStr = '2023-05-05T08:42:06.259Z';
      expect(component.formatToDate(dateStr)).toEqual(CalendarDateUtilsHelper.toDate(dateStr));
    });
  });

  describe('should clearRangeSelectedIfNofSourceConfirm()', () => {
    it('when date is undefined', () => {
      internalFormServiceMock.internalFormValue = new CalendarRangeDateFormValuesModel();
      internalFormServiceMock.internalFormValue.initialDate = null;
      internalFormServiceMock.internalFormValue.finalDate = null;

      const datesNull = {
        initialDate: null,
        finalDate: null,
      };

      component.clearRangeSelectedIfNofSourceConfirm();
      fixture.detectChanges();
      
      expect(component.rangeSelected).toEqual(datesNull);
    });

    it('when date is defined', () => {
      internalFormServiceMock.internalFormValue = new CalendarRangeDateFormValuesModel();
      internalFormServiceMock.internalFormValue.initialDate = '2023-05-05T08:42:06.259Z';
      internalFormServiceMock.internalFormValue.finalDate = '2023-08-05T08:42:06.259Z';

      spyOn(component, 'clearRangeSelectedIfNofSourceConfirm').and.callThrough();
      const spyFormatToDate = spyOn(component, 'formatToDate');

      component.clearRangeSelectedIfNofSourceConfirm();
      fixture.detectChanges();
      
      expect(spyFormatToDate).toHaveBeenCalledTimes(2);
    });
  });

  it('should remove', () => {

    // Arrange
    spyOn(component.reset, 'emit');


    // Act
    component.remove();

    // Assert
    expect(component.reset.emit).toHaveBeenCalledWith();

  });

  it('should listener range selected', () => {
    // Arrange
    internalFormServiceMock.internalFormValue = new CalendarRangeDateFormValuesModel();
    internalFormServiceMock.internalFormValue.initialDate = null;
    internalFormServiceMock.internalFormValue.finalDate = null;
    let rangeDate = new CalendarRangeDateModel();
    mockStore.select.and.returnValue(of({ source: CalendarSourceEnum.Confirm, dates: rangeDate }));

    // Act
    component.listenerRangeSelected();
    component.clearRangeSelectedIfNofSourceConfirm();

    const rangeDateFormatted = {
      initialDate: null,
      finalDate: null
    }

    // Assert
    expect(component.rangeSelected).toEqual(rangeDateFormatted);

  });

  it('should clear range selected if not source confirm', () => {
    internalFormServiceMock.internalFormValue = new CalendarRangeDateFormValuesModel();
    internalFormServiceMock.internalFormValue.initialDate = null;
    internalFormServiceMock.internalFormValue.finalDate = null;

    // Arrange
    const rangeDateFormatted = {
      initialDate: null,
      finalDate: null
    }

    // Act
    component.clearRangeSelectedIfNofSourceConfirm();

    // Assert
    expect(component.rangeSelected).toEqual(rangeDateFormatted);

  });

});