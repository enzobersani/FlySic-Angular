import { Injectable } from '@angular/core';
import { CalendarSourceEnum } from '../../enums/base-calendar-source.enum';
import { CalendarDateUtilsHelper } from '../../helpers/base-calendar-date-utils.helper';
import { CalendarRangeDateValidationModel } from '../../models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../models/base-calendar-range.model';

@Injectable()
export class CalendarValidDatesLimitService {

  constructor() { }

  select(rangeDateModel?: CalendarRangeDateValidationModel | null, limit?: CalendarRangeDateModel): CalendarRangeDateValidationModel | null | undefined {
    if (limit) {
      rangeDateModel = this.selectInitial(rangeDateModel, limit);
      rangeDateModel = this.selectFinal(rangeDateModel, limit);
    }
    return rangeDateModel;
  }

  selectInitial(rangeDateModel?: CalendarRangeDateValidationModel | null, limit?: CalendarRangeDateModel) {
    if (rangeDateModel?.dates?.initialDate) {
      if (limit?.initialDate) {
        if (rangeDateModel.dates.initialDate < limit.initialDate) {
          rangeDateModel.source            = CalendarSourceEnum.Fix;
          rangeDateModel.dates.initialDate = this.getNextDay(limit.initialDate);
        }
      }
      if (limit?.finalDate) {
        if (rangeDateModel.dates.initialDate > limit.finalDate) {
          rangeDateModel.source            = CalendarSourceEnum.Fix;
          rangeDateModel.dates.initialDate = limit.finalDate;
        }
      }
    }
    return rangeDateModel;
  }

  selectFinal(rangeDateModel?: CalendarRangeDateValidationModel | null, limit?: CalendarRangeDateModel) {
    if (rangeDateModel?.dates?.finalDate) {
      if (limit?.initialDate) {
        if (rangeDateModel.dates.finalDate <= limit.initialDate) {
          rangeDateModel.source          = CalendarSourceEnum.Fix;
          rangeDateModel.dates.finalDate = this.getNextDay(limit.initialDate);
        }
      }
      if (limit?.finalDate) {
        if (rangeDateModel.dates.finalDate > limit.finalDate) {
          rangeDateModel.source          = CalendarSourceEnum.Fix;
          rangeDateModel.dates.finalDate = limit.finalDate;
        }
      }
    }
    return rangeDateModel;
  }

  getNextDay(date: Date) {
    let copiedDate = CalendarDateUtilsHelper.clone(date);
    copiedDate.setDate(copiedDate.getDate() + 1);
    return copiedDate;
  }

}
