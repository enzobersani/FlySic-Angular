/* tslint:disable:no-unused-variable */
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CalendarSingleComponent } from './calendar-single.component';
import { CalendarSingleToggleDirective } from './directives/toggle.directive';
import { CalendarSingleToggleService } from './services/toggle.service';
import { Source } from './enum/source.enum';
import { DateUtils } from './helper/date-utils.helper';
import { RangeDate } from './model/range-date.model';
import { ButtonsModel } from './model/texts/buttons.model';
import { TextsModel } from './model/texts/texts.model';
import { DateVerificationService } from './services/date-verification/date-verification.service';
import { IdService } from './services/id.service';
import { InternalFormService } from './services/internal-form/internal-form.service';
import { ScrollService } from './services/scroll.service';
import { TextsService } from './services/texts.service';
import { RangeDateModel } from './store/models/range-date.model';

function getStoreSpy() {
  var spy = jasmine.createSpyObj<Store>(['select', 'dispatch']);
  spy.select.and.returnValue(of());
  return spy;
}

@Component({ selector: 'cso-calendar-selected-date', template: '' })
class CalendarSelectedDateComponentMock {
  @Input() isOpen: boolean = false;
  @Input() placeholder: string = '';
}

describe('CalendarSingleComponent', () => {
  let component: CalendarSingleComponent;
  let fixture: ComponentFixture<CalendarSingleComponent>;

  var storeSpy = getStoreSpy();
  var idServiceSpy = jasmine.createSpyObj<IdService>(['get']);
  var toggleServiceSpy = jasmine.createSpyObj<CalendarSingleToggleService>([
    'toggle',
    'listener',
    'close',
  ]);
  var internalFormServiceSpy = jasmine.createSpyObj<InternalFormService>([
    'getForm',
    'patchRangeDate',
    'getValues',
  ]);
  var dateVerificationServiceSpy =
    jasmine.createSpyObj<DateVerificationService>(['fixDates']);
  var scrollServiceSpy = jasmine.createSpyObj<ScrollService>([
    'legacyScroll',
    'onDestroy',
  ]);
  var textsServiceSpy = jasmine.createSpyObj<TextsService>(['setTexts']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarSelectedDateComponentMock,
      ],
      providers: [
        {
          provide: IdService,
          useValue: idServiceSpy,
        },
        {
          provide: ScrollService,
          useValue: scrollServiceSpy,
        },
        {
          provide: CalendarSingleToggleService,
          useValue: toggleServiceSpy,
        },
        {
          provide: InternalFormService,
          useValue: internalFormServiceSpy,
        },
        {
          provide: DateVerificationService,
          useValue: dateVerificationServiceSpy,
        },
        {
          provide: Store,
          useValue: storeSpy,
        },
        {
          provide: TextsService,
          useValue: textsServiceSpy,
        },
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSingleComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      formName: new FormControl(RangeDate.createCompleteInstace(new Date(), null))
    });
    component.name = 'formName';
    component.buttons = {} as ButtonsModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add control to form onInit', () => {
    let formControl = component.form?.get(component.name);
    expect(formControl).toBeTruthy();
  });

  it('should set buttons texts synchronously', () => {
    component.buttons = {};
    let textModel = {
      buttons: {
        clear: 'Clears',
        confirm: 'Confirms',
      } as ButtonsModel,
    } as TextsModel;

    spyOn(component['textsService'], 'getText').and.returnValue(textModel);

    component.setButtonsText();

    expect(component.buttons?.clear).toBe(textModel.buttons?.clear);
    expect(component.buttons?.confirm).toBe(textModel.buttons?.confirm);
  });

  it('should set buttons texts asynchronously', () => {
    component.buttons = {};
    let textModel = {
      buttons: {
        clear: 'Clears',
        confirm: 'Confirm',
      } as ButtonsModel,
    } as TextsModel;

    spyOn(component['textsService'], 'getText').and.returnValue({});
    spyOn(component['textsService'], 'getAsyncTexts').and.returnValue(
      of(textModel)
    );

    component.setButtonsText();

    expect(component.buttons?.clear).toBe(textModel.buttons?.clear);
    expect(component.buttons?.confirm).toBe(textModel.buttons?.confirm);
  });

  it('should call fix dates', () => {
    let rangeDateModel = {
      dates: {
        initialDate: new Date(2000, 3, 3),
        finalDate: null,
      } as RangeDate,
      getClone() { },
    } as RangeDateModel;

    spyOn(component['dateVerificationService'], 'fixDates').and.callFake(() => { });
    component.fixDates(rangeDateModel);

    expect(component['dateVerificationService'].fixDates).toHaveBeenCalled();
  });


  it('should call fix dates when limit is passed', () => {
    let rangeDateModel = {
      dates: {
        initialDate: new Date(2000, 3, 3, 1, 1, 1),
        finalDate: new Date(2000, 3, 3, 1, 1, 1),
      } as RangeDate,
      getClone() { },
    } as RangeDateModel;

    component.limit = {
      initialDate: new Date(2000, 3, 1, 1, 1, 1),
      finalDate: new Date(2000, 3, 5, 1, 1, 1)
    } as RangeDate

    spyOn(DateUtils, 'fixInitialDate')
    spyOn(DateUtils, 'fixFinalDate')

    component.fixDates(rangeDateModel);

    expect(DateUtils.fixInitialDate).toHaveBeenCalled();
    expect(DateUtils.fixFinalDate).toHaveBeenCalled();
  });

  it('should change hasValue flag to true if input has value', () => {
    const rangeDateModel = {
      dates: {
        initialDate: new Date(2000, 3, 3),
        finalDate: null,
      } as RangeDate,
      getClone() { },
    } as RangeDateModel;

    component.loadIfHasValue(rangeDateModel);

    expect(component.hasValue).toBeTrue();
  });

  it('should change hasValue flag to false if input has no value', () => {
    const rangeDateModel = {
      dates: {
        initialDate: null,
        finalDate: null,
      } as RangeDate,
      getClone() { },
    } as RangeDateModel;

    component.loadIfHasValue(rangeDateModel);

    expect(component.hasValue).toBeFalse();
  });

  it('should close toggle when currentDate is not null onConfirm', () => {
    const rangeDateModel = {
      dates: {
        initialDate: new Date(2000, 3, 3),
        finalDate: null,
      } as RangeDate,
      getClone() { },
    } as RangeDateModel;

    spyOn(component.toggleService, 'close').and.callFake(() => { })
    spyOn(component['_currentRangeDateModel']!, 'getClone').and.returnValue(rangeDateModel)

    component.buttonConfirm();

    expect(component.toggleService.close).toHaveBeenCalled();
  });

  it('should emit submit event when currentDate is not null onConfirm', () => {
    const rangeDateModel = {
      dates: {
        initialDate: new Date(2000, 3, 3),
        finalDate: null,
      } as RangeDate,
      getClone() { },
    } as RangeDateModel;

    spyOn(component.submit, 'emit').and.callFake(() => { })
    spyOn(component['_currentRangeDateModel']!, 'getClone').and.returnValue(rangeDateModel)

    component.buttonConfirm();

    expect(component.submit.emit).toHaveBeenCalled();
  });

  it('should change Range when click on Button Confirm', () => {
    const range = new RangeDateModel();
    range.dates = RangeDate.createCompleteInstace(new Date('1/1/23'), null);
    range.source = Source.Confirm;

    component.setCurrentRangeDateModel(range);
    fixture.detectChanges();

    const datesMock = RangeDate.createCompleteInstace(new Date('1/1/23'), null);

    expect(component.form?.get(component.name)?.value).toEqual(datesMock);
  });

  it('should detect date change', () => {
    const range = new RangeDateModel();
    range.dates = RangeDate.createCompleteInstace(new Date('1/1/23'), new Date('6/6/23'));
    range.source = Source.Confirm;

    component.patchRangeDateToInternalForm(range);
    fixture.detectChanges();

    const mockDate = new Date('1/2/23');
    component.changeDate(mockDate);

    fixture.detectChanges();

    expect(component.getCurrentRangeDateModel?.dates?.initialDate).toEqual(mockDate);
  });

  it('should set and get current range date model', () => {
    var rangeDateModel: RangeDateModel = new RangeDateModel();
    component.setCurrentRangeDateModel(rangeDateModel);

    var result = component.getCurrentRangeDateModel;

    expect(rangeDateModel == result).toBeTruthy();
  });

  it('should change Range when click on Button Reset', () => {
    const range = new RangeDateModel();
    range.dates = new RangeDate();
    range.dates.initialDate = null;
    range.dates.finalDate = null;
    range.source = Source.Reset;

    component.resetMainFormIfSourceIsReset(range);
    fixture.detectChanges();

    expect(component.getCurrentRangeDateModel).toEqual(range);
  });

  it('should reset main form when clicks at close icon in Selected Date', () => {

    // Arrange
    var resetCalendar = spyOn(component, 'resetCalendar').and.callThrough();
    var calendarSingleResetRangeDate = spyOn(component, 'calendarSingleResetRangeDate').and.callThrough();

    // Act
    component.resetCalendar();

    // Assert
    expect(resetCalendar).toHaveBeenCalled();
    expect(calendarSingleResetRangeDate).toHaveBeenCalled();
    expect(component.hasValue).toBeFalsy();
  });

  it('should listen To Value Changes', () => {

    // Arrange
    var fixDates = spyOn(component, 'fixDates');
    var checkIfHasValue = spyOn(component, 'loadIfHasValue');
    storeSpy.select.and.returnValue(of({}));

    // Act
    component.listenToValueChanges();

    // Assert
    expect(fixDates).toHaveBeenCalled();
    expect(checkIfHasValue).toHaveBeenCalled();

  });

  it('should send text if textModel has value', () => {
    var sendText = spyOn(component['textsService'], 'sendText');

    component.textModel = new TextsModel();

    component.setButtonsText();

    expect(sendText).toHaveBeenCalled();
  });
});
