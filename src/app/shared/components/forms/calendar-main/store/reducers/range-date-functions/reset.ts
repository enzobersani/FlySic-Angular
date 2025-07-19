import { CalendarSourceEnum } from '../../../../base-calendar/enums/base-calendar-source.enum';
import { CalendarRangeDateValidationModel } from '../../../../base-calendar/models/base-calendar-range-validation.model';
import { RangeDateStateModel } from './../../models/range-date-state.model';
import { getNewState } from './utils';

export function resetById(state: RangeDateStateModel, data: { instanceId: string }): RangeDateStateModel {

    let newState = getNewState(state, data.instanceId);

    let newStates       = [...[], ...state.states.map(x => x.getClone())];
        newState.states = newStates.map(x => {
        if (x.instanceId == data.instanceId) {
            x            = new CalendarRangeDateValidationModel();
            x.instanceId = data.instanceId;
            x.source     = CalendarSourceEnum.Reset;
        }
        return x;
    });

    return newState;

}