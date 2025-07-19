import { CalendarRangeDateValidationModel } from '../../../../base-calendar/models/base-calendar-range-validation.model';
import { RangeDateStateModel } from './../../models/range-date-state.model';

export function getNewState(state: RangeDateStateModel, instanceId: string | undefined) {
    let newState                  = state.getClone();
        newState.sentByInstanceId = instanceId;
    return newState;
}

export function addNewItemToState(state: CalendarRangeDateValidationModel[], newItem: CalendarRangeDateValidationModel) {
    return [...[newItem], ...state.filter(x => x.instanceId != newItem.instanceId).map(x => x.getClone())];
}