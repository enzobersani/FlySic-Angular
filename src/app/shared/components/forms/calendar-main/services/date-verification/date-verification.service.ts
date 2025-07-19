import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarSourceEnum } from '../../../base-calendar/enums/base-calendar-source.enum';
import { CalendarFixDatesConfigs } from '../../../base-calendar/models/base-calendar-fix-dates-configs.model';
import { CalendarRangeDateValidationModel } from '../../../base-calendar/models/base-calendar-range-validation.model';
import { CalendarIdService } from '../../../base-calendar/services/base-calendar-id.service';
import { CalendarBothDatesRequiredService } from '../../../base-calendar/services/validation/base-calendar-both-dates-required.service';
import { CalendarValidDatesService } from '../../../base-calendar/services/validation/base-calendar-valid-dates.service';
import { addOrUpdateRangeDate } from './../../store/actions/range-date.actions';

@Injectable()
export class CalendarMainDateVerificationService {

  constructor(
    public  idService               : CalendarIdService,
    private validDatesService       : CalendarValidDatesService,
    private bothDatesRequiredService: CalendarBothDatesRequiredService,
    private store                   : Store<any>
  ) { }

  fixDates(readOnlyRangeDateModel?: CalendarRangeDateValidationModel, configs?: CalendarFixDatesConfigs) {
    let rangeDateClone = readOnlyRangeDateModel?.getClone() as CalendarRangeDateValidationModel | undefined | null;
        rangeDateClone = this.validDatesService.select(rangeDateClone, configs?.limit);
        rangeDateClone = this.bothDatesRequiredService.select(rangeDateClone, configs?.bothDatesRequired);

    if (rangeDateClone?.source == CalendarSourceEnum.Fix) {
      this.store.dispatch(addOrUpdateRangeDate({ data: CalendarRangeDateValidationModel.createCompleteInstace(this.idService.get(), rangeDateClone.dates) }));
    }
  }

}
