import { ValidDatesLimitService } from './valid-dates-limit.service';
import { ValidDatesRangeService } from './valid-dates-range.service';
import { RangeDateModel }         from './../../../../store/models/range-date.model';
import { Injectable }             from '@angular/core';
import { RangeDate }              from './../../../../model/range-date.model';

@Injectable()
export class ValidDatesService {

  constructor(
    private validDatesRangeService: ValidDatesRangeService,
    private validDatesLimitService: ValidDatesLimitService
  ) { }

  select(rangeDateModel?: RangeDateModel | null, limit?: RangeDate): RangeDateModel | undefined | null {
    rangeDateModel = this.validDatesRangeService?.select(rangeDateModel);
    rangeDateModel = this.validDatesLimitService.select(rangeDateModel, limit);
    return rangeDateModel;
  }

}
