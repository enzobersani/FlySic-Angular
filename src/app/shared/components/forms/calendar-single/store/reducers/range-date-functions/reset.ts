import { Source }              from '../../../enum/source.enum';
import { RangeDateModel }      from '../../models/range-date.model';
import { RangeDateStateModel } from './../../models/range-date-state.model';
import { calendarSingleGetNewState }         from './utils';

export function calendarSingleResetById(state: RangeDateStateModel, data: { instanceId: string }): RangeDateStateModel {

    var newState = calendarSingleGetNewState(state, data.instanceId);

    var newStates       = [...[], ...state.states.map(x => x.getClone())];
        newState.states = newStates.map(x => {
        if (x.instanceId == data.instanceId) {
            x            = new RangeDateModel();
            x.instanceId = data.instanceId;
            x.source     = Source.Reset;
        }
        return x;
    });

    return newState;

}
