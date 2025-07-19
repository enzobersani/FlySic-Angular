import { InternalFormListernerService }        from './../internal-form-listerner.service';
import { DateUtils }                           from './../../helper/date-utils.helper';
import { Injectable }                          from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RangeDate }                           from '../../model/range-date.model';
import { RangeDateForm, RangeDateFormValues }                       from './models/range-date-form.model';

@Injectable()
export class InternalFormService {

  private _internalForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder                 : FormBuilder,
    private internalFormListernerService: InternalFormListernerService
  ) {
    this._internalForm = this.formBuilder.group({});
    this._internalForm.addControl('initialDate', new FormControl(''));
    this._internalForm.addControl('finalDate', new FormControl(''));
    this.internalFormListernerService.listener(this._internalForm);
  }

  patchRangeDate(rangeDate?: RangeDate | null) {
    this._internalForm.patchValue(this.valuesToJson(rangeDate));
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
    return this._internalForm;
  }

  getValues(): RangeDateFormValues {
    return this._internalForm.value;
  }

}
