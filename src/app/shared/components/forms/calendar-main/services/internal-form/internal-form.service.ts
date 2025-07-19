import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CalendarDateUtilsHelper } from '../../../base-calendar/helpers/base-calendar-date-utils.helper';
import { CalendarRangeDateFormValuesModel } from '../../../base-calendar/models/base-calendar-range-date-form-values.model';
import { CalendarRangeDateFormModel } from '../../../base-calendar/models/base-calendar-range-date-form.model';
import { CalendarRangeDateModel } from '../../../base-calendar/models/base-calendar-range.model';
import { CalendarMainInternalFormListernerService } from './../internal-form-listerner.service';

@Injectable()
export class CalendarMainInternalFormService {

  private _internalForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private formBuilder                 : UntypedFormBuilder,
    private internalFormListernerService: CalendarMainInternalFormListernerService
  ) {
    this._internalForm = this.formBuilder.group({});
    this._internalForm.addControl('initialDate', new UntypedFormControl(''));
    this._internalForm.addControl('finalDate', new UntypedFormControl(''));
    this.internalFormListernerService.listener(this._internalForm);
  }

  patchRangeDate(rangeDate?: CalendarRangeDateModel | null) {
    this._internalForm.patchValue(this.valuesToJson(rangeDate));
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
    return this._internalForm;
  }

  getValues(): CalendarRangeDateFormValuesModel {
    return this._internalForm.value;
  }

}
