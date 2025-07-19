import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CalendarRangeDateValidationModel } from '../base-calendar/public-api';
import { CalendarIdService } from '../base-calendar/services/base-calendar-id.service';
import { CalendarScrollService } from '../base-calendar/services/base-calendar-scroll.service';
import { CalendarTextsService } from '../base-calendar/services/base-calendar-texts.service';
import { CalendarMainComponent } from './calendar-main.component';
import { CalendarMainDateVerificationService } from './services/date-verification/date-verification.service';
import { CalendarMainInternalFormService } from './services/internal-form/internal-form.service';

function getStoreSpy() {
  let spy = jasmine.createSpyObj<Store>(['select', 'dispatch']);
  spy.select.and.returnValue(of());
  return spy;
}

describe('CalendarMainComponent Instance', () => {
  let component: CalendarMainComponent;

  let storeSpy                   = getStoreSpy();
  let idServiceSpy               = jasmine.createSpyObj<CalendarIdService>(['get']);
  let internalFormServiceSpy     = jasmine.createSpyObj<CalendarMainInternalFormService>(['getForm', 'patchRangeDate']);
  let dateVerificationServiceSpy = jasmine.createSpyObj<CalendarMainDateVerificationService>(['fixDates']);
  let textsServiceSpy            = jasmine.createSpyObj<CalendarTextsService>(['setTexts']);
  let scrollServiceSpy           = jasmine.createSpyObj<CalendarScrollService>(['legacyScroll', 'onDestroy']);

  beforeEach(() => {
    component = new CalendarMainComponent(idServiceSpy, scrollServiceSpy, internalFormServiceSpy, dateVerificationServiceSpy, textsServiceSpy, storeSpy);
  });

  it('should patch range date to form', () => {

    // Arrange
    let readOnlyRangeDateModel: CalendarRangeDateValidationModel = new CalendarRangeDateValidationModel();

    // Act
    component.fixDates(readOnlyRangeDateModel);

    // Assert
    expect(dateVerificationServiceSpy.fixDates.calls.count()).toBe(1);

  });

});