import { Injectable } from '@angular/core';
import { CalendarSourceEnum } from '../../enums/base-calendar-source.enum';
import { CalendarRangeDateValidationModel } from '../../models/base-calendar-range-validation.model';

@Injectable()
export class CalendarValidDatesRangeService {

  constructor() { }

  select(rangeDate?: CalendarRangeDateValidationModel | null): CalendarRangeDateValidationModel | null | undefined {
    if (this.hasInvalidDate(rangeDate)) return rangeDate;
    if (this.fixedDateIfNullOrEmpty(rangeDate?.dates?.initialDate) > this.fixedDateIfNullOrEmpty(rangeDate?.dates?.finalDate)) {
      if (rangeDate?.source == CalendarSourceEnum.Initial) {
        if (rangeDate?.dates)
          rangeDate.dates.finalDate = rangeDate?.dates.initialDate;

        rangeDate.source = CalendarSourceEnum.Fix;
      }
      if (rangeDate?.source == CalendarSourceEnum.Final) {
        if (rangeDate.dates)
          rangeDate.dates.initialDate = rangeDate.dates.finalDate;

        rangeDate.source = CalendarSourceEnum.Fix;
      }
    }
    return rangeDate;
  }

  fixedDateIfNullOrEmpty(initialDate?: Date | null) {
    return initialDate ?? 0;
  }

  hasInvalidDate(rangeDate?: CalendarRangeDateValidationModel | null) {
    return !rangeDate?.dates?.initialDate || !rangeDate?.dates?.finalDate;
  }

}
