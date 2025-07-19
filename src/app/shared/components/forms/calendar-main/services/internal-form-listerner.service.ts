import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CalendarRangeDateModel } from '../../base-calendar/models/base-calendar-range.model';
import { CalendarIdService } from '../../base-calendar/services/base-calendar-id.service';
import { resetRangeDate } from '../store/actions/range-date.actions';
import { selectRangeDateDatesById } from './../store/selectors/range-date.selector';

@Injectable()
export class CalendarMainInternalFormListernerService {

  public _storeRangeDate?: CalendarRangeDateModel = new CalendarRangeDateModel();

  constructor(
    public  idService: CalendarIdService,
    private store    : Store<any>
  ) { }

  listener(form: UntypedFormGroup) {
    this.listenerStoreRangeDate();
    form.valueChanges.subscribe(this.resetRangeDate.bind(this));
  }

  listenerStoreRangeDate() {
    this.store.select(selectRangeDateDatesById(this.idService.get())).pipe(filter(val => val !== undefined)).subscribe(this.setStoreRangeDate.bind(this));
  }

  setStoreRangeDate(rangeDate: CalendarRangeDateModel | undefined) {
    this._storeRangeDate = rangeDate;
  }

  async resetRangeDate(value: { initialDate: string, finalDate: string }) {
    if (this.dataHasBeenReset(value)) {
      if (this.componentHasData(this._storeRangeDate)) {
        this.resetDataComponent();
      }
    }
  }

  resetDataComponent() {
    this.store.dispatch(resetRangeDate({ data: { instanceId: this.idService.get() } }));
  }

  dataHasBeenReset(value: { initialDate: string | null, finalDate: string | null }) {
    return value.initialDate == null && value.finalDate == null;
  }

  componentHasData(rangeDate?: CalendarRangeDateModel) {
    return rangeDate?.initialDate != null || rangeDate?.finalDate != null;
  }

}
