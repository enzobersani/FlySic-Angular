import { Action, createReducer, on }                                                                    from "@ngrx/store";
import { calendarSingleResetRangeDate, calendarSingleAddOrUpdateRangeDate, calendarSingleAddOrUpdateRangeInitialDate, calendarSingleAddOrUpdateRangeFinalDate } from "../actions/range-date.actions";
import { RangeDateStateModel }                                                                          from '../models/range-date-state.model';
import { calendarSingleAddOrUpdateInitial, calendarSingleAddOrUpdateFinal }                                                         from './range-date-functions/add-or-update-one';
import { calendarSingleAddOrUpdate }                                                                                  from './range-date-functions/add-or-update';
import { calendarSingleResetById }                                                                                    from './range-date-functions/reset';

export const calendarSingleInitialState: RangeDateStateModel = new RangeDateStateModel();

const reducer = createReducer(
    calendarSingleInitialState,
    on(calendarSingleAddOrUpdateRangeInitialDate, (state, { data }) => calendarSingleAddOrUpdateInitial(state, data)),
    on(calendarSingleAddOrUpdateRangeFinalDate, (state, { data }) => calendarSingleAddOrUpdateFinal(state, data)),
    on(calendarSingleAddOrUpdateRangeDate, (state, { data }) => calendarSingleAddOrUpdate(state, data)),
    on(calendarSingleResetRangeDate, (state, { data }) => calendarSingleResetById(state, data))
);

export function calendarSingleRangeDateReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}