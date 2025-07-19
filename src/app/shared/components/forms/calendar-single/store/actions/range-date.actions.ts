import { createAction, props } from '@ngrx/store';
import { RangeDateModel }      from '../models/range-date.model';
import { DateModel }           from '../models/date.model';

export const calendarSingleAddOrUpdateRangeInitialDate = createAction('[Range Date] Add or Update Initial Date', props<{ data: DateModel }>());
export const calendarSingleAddOrUpdateRangeFinalDate   = createAction('[Range Date] Add or Update Final Date', props<{ data: DateModel }>());
export const calendarSingleAddOrUpdateRangeDate        = createAction('[Range Date] Add or Update', props<{ data: RangeDateModel }>());
export const calendarSingleResetRangeDate              = createAction('[Range Date] Reset', props<{ data: { instanceId: string } }>());
