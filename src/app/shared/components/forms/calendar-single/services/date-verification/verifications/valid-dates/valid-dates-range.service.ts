import { RangeDateModel } from './../../../../store/models/range-date.model';
import { Injectable }     from '@angular/core';
import { Source }         from './../../../../enum/source.enum';

@Injectable()
export class ValidDatesRangeService {

  constructor() { }

  select(rangeDate?: RangeDateModel | null): RangeDateModel | null | undefined {
    if (this.hasInvalidDate(rangeDate)) return rangeDate;
    if (this.fixedDateIfNullOrEmpty(rangeDate?.dates?.initialDate) > this.fixedDateIfNullOrEmpty(rangeDate?.dates?.finalDate)) {
      if (rangeDate?.source == Source.Initial) {
        if (rangeDate?.dates)
          rangeDate.dates.finalDate = rangeDate?.dates.initialDate;

        rangeDate.source = Source.Fix;
      }
      if (rangeDate?.source == Source.Final) {
        if (rangeDate.dates)
          rangeDate.dates.initialDate = rangeDate.dates.finalDate;

        rangeDate.source = Source.Fix;
      }
    }
    return rangeDate;
  }

  fixedDateIfNullOrEmpty(initialDate?: Date | null) {
    return initialDate ?? 0;
  }

  hasInvalidDate(rangeDate?: RangeDateModel | null) {
    return !rangeDate?.dates?.initialDate || !rangeDate?.dates?.finalDate;
  }

}
