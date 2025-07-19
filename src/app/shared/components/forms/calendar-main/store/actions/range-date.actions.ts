import { createAction, props } from '@ngrx/store';
import { CalendarRangeDateValidationModel } from '../../../base-calendar/models/base-calendar-range-validation.model';
import { DateModel } from '../models/date.model';

export const addOrUpdateRangeInitialDate = createAction('[Range Date] Add or Update Initial Date', props<{ data: DateModel }>());
export const addOrUpdateRangeFinalDate   = createAction('[Range Date] Add or Update Final Date', props<{ data: DateModel }>());
export const addOrUpdateRangeDate        = createAction('[Range Date] Add or Update', props<{ data: CalendarRangeDateValidationModel }>());
export const resetRangeDate              = createAction('[Range Date] Reset', props<{ data: { instanceId: string } }>());
