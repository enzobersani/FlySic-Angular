import { BothDatesRequiredService } from './verifications/both-dates-required/both-dates-required.service';
import { ValidDatesService }        from './verifications/valid-dates/valid-dates.service';
import { IdService }                from './../id.service';
import { calendarSingleAddOrUpdateRangeDate }     from './../../store/actions/range-date.actions';
import { Source }                   from './../../enum/source.enum';
import { RangeDateModel }           from './../../store/models/range-date.model';
import { Injectable }               from '@angular/core';
import { Store }                    from '@ngrx/store';
import { FixDatesConfigs }          from './models/fix-dates.configs';

@Injectable()
export class DateVerificationService {

  constructor(
    public  idService               : IdService,
    private validDatesService       : ValidDatesService,
    private bothDatesRequiredService: BothDatesRequiredService,
    private store                   : Store<any>
  ) { }

  fixDates(readOnlyRangeDateModel?: RangeDateModel, configs?: FixDatesConfigs) {
    var rangeDateClone = readOnlyRangeDateModel?.getClone() as RangeDateModel | undefined | null;
        rangeDateClone = this.validDatesService.select(rangeDateClone, configs?.limit);
        rangeDateClone = this.bothDatesRequiredService.select(rangeDateClone, configs?.bothDatesRequired);

    if (rangeDateClone?.source == Source.Fix) {
      this.store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: RangeDateModel.createCompleteInstace(this.idService.get(), rangeDateClone.dates) }));
    }
  }

}
