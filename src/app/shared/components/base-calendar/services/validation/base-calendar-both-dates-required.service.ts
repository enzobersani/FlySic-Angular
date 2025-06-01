import { Injectable } from '@angular/core';
import { CalendarSourceEnum } from '../../enums/base-calendar-source.enum';
import { CalendarDateCompareHelper } from '../../helpers/base-calendar-date-compare.helper';
import { CalendarRangeDateValidationModel } from '../../models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../models/base-calendar-range.model';

@Injectable()
export class CalendarBothDatesRequiredService {

  public previousDates?: CalendarRangeDateModel = new CalendarRangeDateModel();

  constructor() { }

  select(rangeDate?: CalendarRangeDateValidationModel | null, bothRequired?: boolean): CalendarRangeDateValidationModel | null | undefined {
    if (bothRequired) {
      return this.bothDatesRequired(rangeDate);
    } else {
      return this.noRequired(rangeDate);
    }
  }

  bothDatesRequired(rangeDate?: CalendarRangeDateValidationModel | null): CalendarRangeDateValidationModel | null | undefined {
    if (rangeDate?.dates?.initialDate && !rangeDate.dates.finalDate) {
      rangeDate.dates.finalDate = rangeDate.dates.initialDate;
      rangeDate.source          = CalendarSourceEnum.Fix;
    }
    if (!rangeDate?.dates?.initialDate && rangeDate?.dates?.finalDate) {
      rangeDate.dates.initialDate = rangeDate.dates.finalDate;
      rangeDate.source            = CalendarSourceEnum.Fix;
    }
    return rangeDate;
  }

  noRequired(rangeDate?: CalendarRangeDateValidationModel | null): CalendarRangeDateValidationModel | null | undefined {
    let previousDates = rangeDate?.dates?.getClone();

    if (rangeDate?.source == CalendarSourceEnum.Initial)
      if (rangeDate?.dates?.initialDate) {
        if (CalendarDateCompareHelper.isEqual(this.previousDates?.initialDate, rangeDate.dates.initialDate)) {
          rangeDate.dates.initialDate = null;
          rangeDate.source            = CalendarSourceEnum.Fix;
        }
      }

    if (rangeDate?.source == CalendarSourceEnum.Final)
      if (rangeDate?.dates?.finalDate) {
        if (CalendarDateCompareHelper.isEqual(this.previousDates?.finalDate, rangeDate.dates.finalDate)) {
          rangeDate.dates.finalDate = null;
          rangeDate.source          = CalendarSourceEnum.Fix;
        }
      }

    this.previousDates = previousDates;

    return rangeDate;
  }

}
