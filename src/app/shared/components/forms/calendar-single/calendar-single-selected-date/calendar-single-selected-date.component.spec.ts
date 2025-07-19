import { IdService }                     from './../services/id.service';
import { Store }                         from '@ngrx/store';
import { of }                            from 'rxjs';
import { ComponentFixture, TestBed }     from '@angular/core/testing';
import { CalendarSingleSelectedDateComponent } from './calendar-single-selected-date.component';
import { RangeDate }                     from '../model/range-date.model';
import { TextsService }                  from '../services/texts.service';
import { Source }                        from '../enum/source.enum';
import { RangeDateFormFormatted } from './models/calendar-selected-date.model';
import { InternalFormService } from '../services/internal-form/internal-form.service';
import { FormGroup } from '@angular/forms';
import { RangeDateForm, RangeDateFormValues } from '../services/internal-form/models/range-date-form.model';
import { DateUtils } from '../helper/date-utils.helper';
import { CalendarTextServiceMock } from '../../../../_mocks/service/base-calendar-texts.service.mock';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';

export class InternalFormServiceMock {

  internalForm: FormGroup = new FormGroup({});
  internalFormValue: RangeDateFormValues = new RangeDateFormValues();

  patchRangeDate(rangeDate?: RangeDate | null) {
    this.internalForm.patchValue(this.valuesToJson(rangeDate));
  }

  valuesToJson(rangeDate?: RangeDate | null): RangeDateForm {
    var rangeDateForm             = new RangeDateForm();
        rangeDateForm.initialDate = DateUtils.toJson(rangeDate?.initialDate);
        rangeDateForm.finalDate   = this.finalValuesToJson(rangeDate?.finalDate);
    return rangeDateForm;
  }

  finalValuesToJson(datetime?: Date | null): string | null {
    if (!datetime) return null;
    var datetimeJson = DateUtils.toJson(datetime);
    var date         = datetimeJson?.split('T')[0];
    return `${date}T23:59:59.999Z`;
  }

  getForm() {
    return this.internalForm;
  }

  getValues(): RangeDateFormValues {
    return this.internalFormValue;
  }
}
class IdServiceMock {
  get() {
    return '1234';
  }
}

describe('CalendarSingleSelectedDateComponent', () => {
  let component: CalendarSingleSelectedDateComponent;
  let fixture  : ComponentFixture<CalendarSingleSelectedDateComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();
  const internalFormServiceMock: InternalFormServiceMock = new InternalFormServiceMock();

  var mockStore = jasmine.createSpyObj(['select', 'dispatch']);
  mockStore.select.and.returnValue(of());


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers   : [
        {
          provide : Store,
          useValue: mockStore
        },
        {
          provide : IdService,
          useClass: IdServiceMock
        },
        {
          provide : InternalFormService,
          useValue: internalFormServiceMock
        },
        {
          provide : TextsService,
          useValue: textsServiceMock
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(CalendarSingleSelectedDateComponent);
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
    var date: Date = new Date();

    // Act
    var result = component.formatDate(date);

    // Assert
    expect(result).toEqual(date.toLocaleDateString());

  });

  it('should format invalid date', () => {

    // Arrange

    // Act
    var result = component.formatDate(undefined);

    // Assert
    expect(result).toEqual("");

  });

  var today = new Date();

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
      var rangeDate: RangeDateFormFormatted = element.rangeDate as RangeDateFormFormatted;

      // Act
      var result = component.showSeparator(rangeDate);

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
      expect(component.formatToDate(dateStr)).toEqual(DateUtils.toDate(dateStr));
    });
  });

  describe('should clearRangeSelectedIfNofSourceConfirm()', () => {
    it('when date is undefined', () => {
      internalFormServiceMock.internalFormValue = new RangeDateFormValues();
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
      internalFormServiceMock.internalFormValue = new RangeDateFormValues();
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
    internalFormServiceMock.internalFormValue = new RangeDateFormValues();
    internalFormServiceMock.internalFormValue.initialDate = null;
    internalFormServiceMock.internalFormValue.finalDate = null;
    var rangeDate = new RangeDate();
    mockStore.select.and.returnValue(of({ source: Source.Confirm, dates: rangeDate }));

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
    internalFormServiceMock.internalFormValue = new RangeDateFormValues();
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
