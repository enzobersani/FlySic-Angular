import { RangeDateModel }                 from './../../models/range-date.model';
import { RangeDateStateModel }            from './../../models/range-date-state.model';
import { calendarSingleGetNewState, calendarSingleAddNewItemToState } from './utils';
import { RangeDate }                      from '../../../model/range-date.model';

export function calendarSingleAddOrUpdate(state: RangeDateStateModel, data: RangeDateModel): RangeDateStateModel {
    var instanceExist = state.states.some(x => x.instanceId == data.instanceId);
    if (instanceExist) {
        return update(state, data);
    } else {
        return add(state, data);
    }
}

function update(state: RangeDateStateModel, data: RangeDateModel): RangeDateStateModel {

    var newState = calendarSingleGetNewState(state, data.instanceId);

    var newStates       = [...[], ...state.states.map(x => x.getClone())];
        newState.states = newStates.map(x => {
        if (x.instanceId == data.instanceId) {
            x       = data.getClone();
            x.dates = getRangeDateOrEmpty(x);
        }
        return x;
    });

    return newState;
}

function add(state: RangeDateStateModel, data: RangeDateModel): RangeDateStateModel {

    var newState = calendarSingleGetNewState(state, data.instanceId);

    var newDate       = data.getClone();
        newDate.dates = getRangeDateOrEmpty(newDate);

    newState.states = calendarSingleAddNewItemToState(newState.states, newDate);

    return newState;
}

function getRangeDateOrEmpty(date: RangeDateModel): RangeDate {
    return (date.dates) ? date.dates: new RangeDate();
}
