import { createSelector } from '@ngrx/store';
import { CalendarRangeDateValidationModel } from '../../../base-calendar/models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../../base-calendar/models/base-calendar-range.model';
import { RangeDateStateModel } from '../models/range-date-state.model';
import { mainCalendarFeature, State } from './calendar-main.selector';

export const selectAllRangeDate = createSelector(mainCalendarFeature, (state: State) => state.rangeDate);

export const selectRangeDateById = (id: string) => {
    return createSelector(
        selectAllRangeDate, (state: RangeDateStateModel) => {
            if (state.sentByInstanceId == id) {
                let result = state.states.find(x => x.instanceId == id);
                return result ?? new CalendarRangeDateValidationModel();
            } else {
                return undefined;
            }
        }
    );
}

export const selectRangeDateDatesById = (id: string) => {
    return createSelector(
        selectAllRangeDate, (state: RangeDateStateModel) => {
            if (state.sentByInstanceId == id) {
                let result = state.states.find(x => x.instanceId == id)?.dates;
                return result ?? new CalendarRangeDateModel();
            } else {
                return undefined;
            }
        }
    );
}