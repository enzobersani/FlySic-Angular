import { RangeDateModel }                 from './../../models/range-date.model';
import { RangeDate }                      from './../../../model/range-date.model';
import { Source }                         from './../../../enum/source.enum';
import { DateModel }                      from './../../models/date.model';
import { RangeDateStateModel }            from './../../models/range-date-state.model';
import { calendarSingleGetNewState, calendarSingleAddNewItemToState } from './utils';

export function calendarSingleAddOrUpdateInitial(state: RangeDateStateModel, data: DateModel): RangeDateStateModel {
    return calendarSingleAddOrUpdateOne(state, data, Source.Initial);
}

export function calendarSingleAddOrUpdateFinal(state: RangeDateStateModel, data: DateModel): RangeDateStateModel {
    return calendarSingleAddOrUpdateOne(state, data, Source.Final);
}

function calendarSingleAddOrUpdateOne(state: RangeDateStateModel, data: DateModel, source: Source): RangeDateStateModel {

    var newState = calendarSingleGetNewState(state, data.instanceId);

    var alreadyExist = state.states.some(x => x.instanceId == data.instanceId);
    if (alreadyExist) {
        return updateOne(newState, data, source);
    } else {
        return addOne(newState, data, source);
    }

}

function updateOne(newState: RangeDateStateModel, data: DateModel, source: Source): RangeDateStateModel {
    var property        = source == Source.Initial ? 'initialDate' : 'finalDate';

        newState.states = newState.states.map(x => {
        if (x.instanceId == data.instanceId) {
            x.source                   = source;
            (x.dates as any)[property] = data.date;
        }
        return x;
    });
    return newState;

}

function addOne(newState: RangeDateStateModel, data: DateModel, source: Source): RangeDateStateModel {
    var       property       = source == Source.Initial ? 'initialDate' : 'finalDate';
    var       rangeDate      = new RangeDate() as any;
    rangeDate[property]      = data.date;
    var       rangeDateModel = RangeDateModel.createCompleteInstace(data.instanceId, rangeDate);

    rangeDateModel.source = source;
    newState.states       = calendarSingleAddNewItemToState(newState.states, rangeDateModel);

    return newState;
}
