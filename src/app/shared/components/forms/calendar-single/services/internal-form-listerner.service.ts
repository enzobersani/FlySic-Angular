import { filter }                   from 'rxjs/operators';
import { calendarSingleSelectRangeDateDatesById } from './../store/selectors/range-date.selector';
import { Injectable }               from '@angular/core';
import { Store }                    from '@ngrx/store';
import { calendarSingleResetRangeDate }           from '../store/actions/range-date.actions';
import { IdService }                from './id.service';
import { FormGroup }                from '@angular/forms';
import { RangeDate }                from '../model/range-date.model';

@Injectable()
export class InternalFormListernerService {

  public _storeRangeDate?: RangeDate = new RangeDate();

  constructor(
    public  idService: IdService,
    private store    : Store<any>
  ) { }

  listener(form: FormGroup) {
    this.listenerStoreRangeDate();
    form.valueChanges.subscribe(this.calendarSingleResetRangeDate.bind(this));
  }

  listenerStoreRangeDate() {
    this.store.select(calendarSingleSelectRangeDateDatesById(this.idService.get())).pipe(filter(val => val !== undefined)).subscribe(this.setStoreRangeDate.bind(this));
  }

  setStoreRangeDate(rangeDate: RangeDate | undefined) {
    this._storeRangeDate = rangeDate;
  }

  async calendarSingleResetRangeDate(value: { initialDate: string, finalDate: string }) {
    if (this.dataHasBeenReset(value)) {
      if (this.componentHasData(this._storeRangeDate)) {
        this.resetDataComponent();
      }
    }
  }

  resetDataComponent() {
    this.store.dispatch(calendarSingleResetRangeDate({ data: { instanceId: this.idService.get() } }));
  }

  dataHasBeenReset(value: { initialDate: string | null, finalDate: string | null }) {
    return value.initialDate == null && value.finalDate == null;
  }

  componentHasData(rangeDate?: RangeDate) {
    return rangeDate?.initialDate != null || rangeDate?.finalDate != null;
  }

}
