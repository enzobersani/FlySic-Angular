import { RangeDateModel }             from './../models/range-date.model';
import { RangeDateStateModel }        from '../models/range-date-state.model';
import { createSelector }             from '@ngrx/store';
import { RangeDate }                  from '../../model/range-date.model';
import { calendarSingleFeature, CalendarSingleState } from './calendar-main.selector';

export const calendarSingleSelectAllRangeDate = createSelector(calendarSingleFeature, (state) => state);

export const calendarSingleSelectRangeDateById = (id: string) => {
    return createSelector(
        calendarSingleSelectAllRangeDate, (state: RangeDateStateModel) => {
            if (state.sentByInstanceId == id) {
                var result = state.states.find(x => x.instanceId == id);
                return result ?? new RangeDateModel();
            } else {
                return undefined;
            }
        }
    );
}

export const calendarSingleSelectRangeDateDatesById = (id: string) => {
    return createSelector(
        calendarSingleSelectAllRangeDate, (state: RangeDateStateModel) => {
            if (state.sentByInstanceId == id) {
                var result = state.states.find(x => x.instanceId == id)?.dates;
                return result ?? new RangeDate();
            } else {
                return undefined;
            }
        }
    );
}
