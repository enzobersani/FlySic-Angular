import { DateUtils }      from './../../../../helper/date-utils.helper';
import { RangeDateModel } from './../../../../store/models/range-date.model';
import { Injectable }     from '@angular/core';
import { Source }         from './../../../../enum/source.enum';
import { RangeDate }      from '../../../../model/range-date.model';

@Injectable()
export class ValidDatesLimitService {

  constructor() { }

  select(rangeDateModel?: RangeDateModel | null, limit?: RangeDate): RangeDateModel | null | undefined {
    if (limit) {
      rangeDateModel = this.selectInitial(rangeDateModel, limit);
      rangeDateModel = this.selectFinal(rangeDateModel, limit);
    }
    return rangeDateModel;
  }

  selectInitial(rangeDateModel?: RangeDateModel | null, limit?: RangeDate) {
    if (rangeDateModel?.dates?.initialDate) {
      if (limit?.initialDate) {
        if (rangeDateModel.dates.initialDate <= limit.initialDate) {
          rangeDateModel.source            = Source.Fix;
          rangeDateModel.dates.initialDate = this.getNextDay(limit.initialDate);
        }
      }
      if (limit?.finalDate) {
        if (rangeDateModel.dates.initialDate > limit.finalDate) {
          rangeDateModel.source            = Source.Fix;
          rangeDateModel.dates.initialDate = limit.finalDate;
        }
      }
    }
    return rangeDateModel;
  }

  selectFinal(rangeDateModel?: RangeDateModel | null, limit?: RangeDate) {
    if (rangeDateModel?.dates?.finalDate) {
      if (limit?.initialDate) {
        if (rangeDateModel.dates.finalDate <= limit.initialDate) {
          rangeDateModel.source          = Source.Fix;
          rangeDateModel.dates.finalDate = this.getNextDay(limit.initialDate);
        }
      }
      if (limit?.finalDate) {
        if (rangeDateModel.dates.finalDate > limit.finalDate) {
          rangeDateModel.source          = Source.Fix;
          rangeDateModel.dates.finalDate = limit.finalDate;
        }
      }
    }
    return rangeDateModel;
  }

  getNextDay(date: Date) {
    var copiedDate = DateUtils.clone(date);
    copiedDate.setDate(copiedDate.getDate() + 1);
    return copiedDate;
  }

}
