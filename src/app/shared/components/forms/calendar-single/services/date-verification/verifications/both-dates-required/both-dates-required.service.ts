import { DateCompare }    from './../../../../helper/date-compare.helper';
import { RangeDate }      from './../../../../model/range-date.model';
import { RangeDateModel } from './../../../../store/models/range-date.model';
import { Injectable }     from '@angular/core';
import { Source }         from '../../../../enum/source.enum';

@Injectable()
export class BothDatesRequiredService {

  public previousDates?: RangeDate = new RangeDate();

  constructor() { }

  select(rangeDate?: RangeDateModel | null, bothRequired?: boolean): RangeDateModel | null | undefined {
    if (bothRequired) {
      return this.bothDatesRequired(rangeDate);
    } else {
      return this.noRequired(rangeDate);
    }
  }

  bothDatesRequired(rangeDate?: RangeDateModel | null): RangeDateModel | null | undefined {
    if (rangeDate?.dates?.initialDate && !rangeDate.dates.finalDate) {
      rangeDate.dates.finalDate = rangeDate.dates.initialDate;
      rangeDate.source          = Source.Fix;
    }
    if (!rangeDate?.dates?.initialDate && rangeDate?.dates?.finalDate) {
      rangeDate.dates.initialDate = rangeDate.dates.finalDate;
      rangeDate.source            = Source.Fix;
    }
    return rangeDate;
  }

  noRequired(rangeDate?: RangeDateModel | null): RangeDateModel | null | undefined {
    var previousDates = rangeDate?.dates?.getClone();

    if (rangeDate?.source == Source.Initial)
      if (rangeDate?.dates?.initialDate) {
        if (DateCompare.isEqual(this.previousDates?.initialDate, rangeDate.dates.initialDate)) {
          rangeDate.dates.initialDate = null;
          rangeDate.source            = Source.Fix;
        }
      }

    if (rangeDate?.source == Source.Final)
      if (rangeDate?.dates?.finalDate) {
        if (DateCompare.isEqual(this.previousDates?.finalDate, rangeDate.dates.finalDate)) {
          rangeDate.dates.finalDate = null;
          rangeDate.source          = Source.Fix;
        }
      }

    this.previousDates = previousDates;

    return rangeDate;
  }

}
