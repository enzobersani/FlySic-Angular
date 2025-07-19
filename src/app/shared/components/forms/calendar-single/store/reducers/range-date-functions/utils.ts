import { RangeDateModel }      from './../../models/range-date.model';
import { RangeDateStateModel } from './../../models/range-date-state.model';

export function calendarSingleGetNewState(state: RangeDateStateModel, instanceId: string | undefined) {
    var newState                  = state.getClone();
        newState.sentByInstanceId = instanceId;
    return newState;
}

export function calendarSingleAddNewItemToState(state: RangeDateModel[], newItem: RangeDateModel) {
    return [...[newItem], ...state.filter(x => x.instanceId != newItem.instanceId).map(x => x.getClone())];
}
