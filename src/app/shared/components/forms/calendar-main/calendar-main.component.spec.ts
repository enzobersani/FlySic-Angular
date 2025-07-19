import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CalendarMainDoubleComponentMock } from '../../../_mocks/components/calendar-main-double.component';
import { TEXTS_MODEL_MOCK } from '../../../_mocks/data/base-calendar-texts.data.mock';
import { CalendarRangeEnum } from '../base-calendar/enums/base-calendar-range.enum';
import { CalendarSourceEnum } from '../base-calendar/enums/base-calendar-source.enum';
import { CalendarDateUtilsHelper } from '../base-calendar/helpers/base-calendar-date-utils.helper';
import { CalendarRangeDateValidationModel } from '../base-calendar/models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../base-calendar/models/base-calendar-range.model';
import { CalendarIdService } from '../base-calendar/services/base-calendar-id.service';
import { CalendarScrollService } from '../base-calendar/services/base-calendar-scroll.service';
import { CalendarTextsService } from '../base-calendar/services/base-calendar-texts.service';
import { CalendarMainSelectedDateComponentMock } from './../../../_mocks/components/calendar-main-selected-date.component';
import { CalendarMainComponent } from './calendar-main.component';
import { CalendarMainDateVerificationService } from './services/date-verification/date-verification.service';
import { CalendarMainInternalFormService } from './services/internal-form/internal-form.service';

function getStoreSpy() {
  let spy = jasmine.createSpyObj<Store>(['select', 'dispatch']);
  spy.select.and.returnValue(of());
  return spy;
}

describe('CalendarMainComponent', () => {
  let component: CalendarMainComponent;
  let fixture  : ComponentFixture<CalendarMainComponent>;

  let storeSpy                   = getStoreSpy();
  let idServiceSpy               = jasmine.createSpyObj<CalendarIdService>(['get']);
  let internalFormServiceSpy     = jasmine.createSpyObj<CalendarMainInternalFormService>(['getForm', 'patchRangeDate', 'getValues']);
  let dateVerificationServiceSpy = jasmine.createSpyObj<CalendarMainDateVerificationService>(['fixDates']);
  let scrollServiceSpy           = jasmine.createSpyObj<CalendarScrollService>(['legacyScroll', 'onDestroy']);
  let textsServiceSpy            = jasmine.createSpyObj<CalendarTextsService>(['setTexts']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CalendarMainSelectedDateComponentMock,
        CalendarMainDoubleComponentMock],
    providers: [
        {
            provide: CalendarIdService,
            useValue: idServiceSpy
        },
        {
            provide: CalendarScrollService,
            useValue: scrollServiceSpy
        },
        {
            provide: CalendarMainInternalFormService,
            useValue: internalFormServiceSpy
        },
        {
            provide: CalendarMainDateVerificationService,
            useValue: dateVerificationServiceSpy
        },
        {
            provide: Store,
            useValue: storeSpy
        },
        {
            provide: CalendarTextsService,
            useValue: textsServiceSpy
        }
    ],
    imports: [FormsModule, ReactiveFormsModule, CalendarMainComponent]
}).compileComponents();
  });

  beforeEach(() => {
    fixture         = TestBed.createComponent(CalendarMainComponent);
    component       = fixture.componentInstance;
    component.texts = TEXTS_MODEL_MOCK;
    component.form = new UntypedFormGroup({});
    component.presetSelected = CalendarRangeEnum.custom;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listener range date', () => {

    // Arrange
    let fixDates        = spyOn(component, 'fixDates');
    let checkIfHasValue = spyOn(component, 'checkIfHasValue');
    storeSpy.select.and.returnValue(of({}));

    // Act
    component.listenerRangeDate();

    // Assert
    expect(fixDates).toHaveBeenCalled();
    expect(checkIfHasValue).toHaveBeenCalled();

  });

  it('should is range date model valid', () => {

    // Arrange
    let rangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();

    // Act
    let result = component.isRangeDateModelValid(rangeDateModel);

    // Assert
    expect(result).toEqual(true);

  });

  it('should get new valid range date model', () => {

    // Arrange

    // Act
    let result = component.newValidRangeDateModel();

    // Assert
    expect(result).not.toBeUndefined();

  });

  [
    {
      getReadOnlyRangeDateModel: () => {
        return new CalendarRangeDateValidationModel();
      },
      result: false
    },
    {
      getReadOnlyRangeDateModel: () => {
        let rangeDateModel = new CalendarRangeDateValidationModel();
        if (rangeDateModel.dates) {
          rangeDateModel.dates.initialDate = new Date();
          rangeDateModel.dates.finalDate   = new Date();
        }
        return rangeDateModel;
      },
      result: true
    }
  ].forEach(element => {

    it('should check if has value', () => {

      // Arrange

      // Act
      let result = component.checkIfHasValue(element.getReadOnlyRangeDateModel());

      // Assert
      expect(result).toEqual(element.result);

    });

  });

  [
    {
      source            : CalendarSourceEnum.Confirm,
      callResetRangeDate: false
    }, {
      source            : CalendarSourceEnum.All,
      callResetRangeDate: true
    }
  ].forEach(element => {

    it('should clear last select if form no has value', () => {

      // Arrange
      spyOn(component, 'getCurrentRangeDateModel').and.returnValue({ source: element.source } as CalendarRangeDateValidationModel);
      let resetRangeDate = spyOn(component, 'resetRangeDate');

      // Act
      component.clearLastSelectIfFormNoHasValue();

      // Assert
      if (element.callResetRangeDate) {
        expect(resetRangeDate).toHaveBeenCalled();
      } else {
        expect(resetRangeDate).not.toHaveBeenCalled();
      }

    });

  });

  it('should reset main form when clicks at close icon in Selected Date', () => {

    // Arrange
    let resetCalendar  = spyOn(component, 'resetCalendar').and.callThrough();
    let resetRangeDate = spyOn(component, 'resetRangeDate').and.callThrough();

    // Act
    component.resetCalendar();

    // Assert
    expect(resetCalendar).toHaveBeenCalled();
    expect(resetRangeDate).toHaveBeenCalled();
    expect(component.hasValue).toBeFalsy();
  });

  it('should not reset calendar when doesn\'t has changes', () => {

    // Arrange
    const store = jasmine.createSpyObj<Store>('store', ['dispatch']);
    const resetCalendar  = spyOn(component, 'resetCalendar').and.callThrough();
    const resetRangeDate = spyOn(component, 'resetRangeDate').and.callThrough();


    // Act
    component.setCurrentRangeDateModel(undefined);
    component.resetCalendar();
    fixture.detectChanges();

    // Assert
    expect(resetCalendar).toHaveBeenCalled();
    expect(resetRangeDate).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should press button confirm', () => {

    // Arrange
    const datesMock = CalendarRangeDateModel.createCompleteInstace(new Date(), new Date());
    const rangeMock = CalendarRangeDateValidationModel.createCompleteInstace('155', datesMock );
    let setCurrentRangeDateModel = spyOn(component, 'setCurrentRangeDateModel').and.callThrough();
    let buttonConfirm = spyOn(component, 'buttonConfirm').and.callThrough();

    // Act
    component.setCurrentRangeDateModel(rangeMock);
    component.buttonConfirm();

    // Assert
    expect(setCurrentRangeDateModel).toHaveBeenCalled();
    expect(buttonConfirm).toHaveBeenCalled();

  });

  it('should not confirm when doesn\'t has changes', () => {

    // Arrange
    const store = jasmine.createSpyObj<Store>('store', ['dispatch']);
    let setCurrentRangeDateModel = spyOn(component, 'setCurrentRangeDateModel').and.callThrough();
    let buttonConfirm = spyOn(component, 'buttonConfirm').and.callThrough();

    // Act
    component.setCurrentRangeDateModel(undefined);
    component.buttonConfirm();

    // Assert
    expect(setCurrentRangeDateModel).toHaveBeenCalled();
    expect(buttonConfirm).toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();

  });

  it('should convert internal form value to range date model', () => {

    // Arrange
    let today    = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let internalFormValue: any = {
      initialDate: today,
      finalDate  : tomorrow
    };

    // Act
    let result = component.internalFormValueToRangeDateModel(internalFormValue);

    // Assert
    expect(result.dates?.initialDate).toEqual(today);
    expect(result.dates?.finalDate).toEqual(tomorrow);

  });

  it('should set value to main form', () => {

    // Arrange
    let values: any;
    let internalFormToMainFormValues = spyOn(component, 'internalFormToMainFormValues');
    let getMainForm                  = spyOn(component, 'getMainForm');

    // Act
    component.setValueToMainForm(values);

    // Assert
    expect(internalFormToMainFormValues).toHaveBeenCalled();
    expect(getMainForm).toHaveBeenCalled();

  });

  it('should convert internal form to main form values', () => {

    // Arrange
    let today    = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let values: any = {
      initialDate: today,
      finalDate  : tomorrow
    };

    // Act
    let result = component.internalFormToMainFormValues(values);

    // Assert
    expect(today).toEqual(result[component.name].initialDate);
    expect(tomorrow).toEqual(result[component.name].finalDate);

  });

  it('should press button reset', () => {

    // Arrange
    let resetRangeDate = spyOn(component, 'resetRangeDate');

    // Act
    component.resetCalendar();

    // Assert
    expect(resetRangeDate).toHaveBeenCalled();

  });

  it('should reset range date', () => {

    // Arrange

    // Act
    component.resetRangeDate();

    // Assert
    expect(storeSpy.dispatch).toHaveBeenCalled();

  });

  it('should set and get current range date model', () => {

    // Arrange
    let rangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();
    component.setCurrentRangeDateModel(rangeDateModel);

    // Act
    let result = component.getCurrentRangeDateModel();

    // Assert
    expect(rangeDateModel == result).toBeTruthy();

  });

  it('should detect changes', () => {

    // Arrange
    const spySetTexts = spyOn(component, 'setTexts');

    // Act
    component.ngOnChanges();
    fixture.detectChanges();

    // Assert
    expect(spySetTexts).toHaveBeenCalled();

  });

  it ('should fixDates() when has value', () => {
    const rangeDate = new CalendarRangeDateModel();
    const mockRangeDate = rangeDate.getClone();
    mockRangeDate.initialDate = new Date('05/05/23');
    mockRangeDate.finalDate = new Date('08/08/23');
    
    component.limit = mockRangeDate;
    spyOn(component, 'fixDates').and.callThrough();
    const spyDateUtilsFixInitial = spyOn(CalendarDateUtilsHelper, 'fixInitialDate').and.callThrough();
    const spyDateUtilsFixFinal = spyOn(CalendarDateUtilsHelper, 'fixFinalDate').and.callThrough();

    component.fixDates();
    fixture.detectChanges();

    expect(spyDateUtilsFixInitial).toHaveBeenCalledTimes(1);
    expect(spyDateUtilsFixFinal).toHaveBeenCalledTimes(1);
  });

  it('should change Range when click on Button Confirm', () => {
    const range = new CalendarRangeDateValidationModel();
    range.dates = new CalendarRangeDateModel();
    range.dates.initialDate = new Date('1/1/23');
    range.dates.finalDate = new Date('6/6/23');
    range.source = CalendarSourceEnum.Confirm;

    component.patchRangeDateToInternalForm(range);
    fixture.detectChanges();

    const datesFormatted = {
      initialDate: '2023-01-01T00:00:00.000Z',
      finalDate: '2023-06-06T23:59:59.999Z',
    };

    expect(component.form?.get(component.name)?.value).toEqual(datesFormatted);
  });

  it('should change Range when click on Button Reset', () => {
    const range = new CalendarRangeDateValidationModel();
    range.dates = new CalendarRangeDateModel();
    range.dates.initialDate = null;
    range.dates.finalDate = null;
    range.source = CalendarSourceEnum.Reset;

    component.resetMainFormIfSourceIsReset(range);
    fixture.detectChanges();

    expect(component.getCurrentRangeDateModel()).toEqual(range);
  });

  it('should resetMainFormValue()', () => {
    component.getMainForm()?.patchValue({
      initialDate: new Date('05/05/23'),
      finalDate: new Date('08/08/23'),
    });

    component.resetMainFormValue();
    fixture.detectChanges();

    const datesNull = { initialDate: null, finalDate: null };
    expect(component.getMainForm()?.get(component.name)?.value).toEqual(datesNull);
  });

  it('should updatePreset()', () => {
    component.updatePreset(CalendarRangeEnum.year);
    fixture.detectChanges();

    expect(component.presetSelected).toBe(CalendarRangeEnum.year);
  });
});