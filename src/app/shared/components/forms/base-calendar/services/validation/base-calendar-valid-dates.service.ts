import { Injectable } from '@angular/core';
import { CalendarRangeDateValidationModel } from '../../models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../models/base-calendar-range.model';
import { CalendarValidDatesLimitService } from './base-calendar-valid-dates-limit.service';
import { CalendarValidDatesRangeService } from './base-calendar-valid-dates-range.service';

@Injectable()
export class CalendarValidDatesService {

  constructor(
    private validDatesRangeService: CalendarValidDatesRangeService,
    private validDatesLimitService: CalendarValidDatesLimitService,
  ) { }

  select(rangeDateModel?: CalendarRangeDateValidationModel | null, limit?: CalendarRangeDateModel): CalendarRangeDateValidationModel | undefined | null {
    rangeDateModel = this.validDatesRangeService?.select(rangeDateModel);
    rangeDateModel = this.validDatesLimitService.select(rangeDateModel, limit);
    return rangeDateModel;
  }

}
