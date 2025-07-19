import { CalendarSourceEnum } from '../../../../base-calendar/enums/base-calendar-source.enum';
import { CalendarRangeDateValidationModel } from '../../../../base-calendar/models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../../../base-calendar/models/base-calendar-range.model';
import { DateModel } from './../../models/date.model';
import { RangeDateStateModel } from './../../models/range-date-state.model';
import { addNewItemToState, getNewState } from './utils';

export function addOrUpdateInitial(state: RangeDateStateModel, data: DateModel): RangeDateStateModel {
    return addOrUpdateOne(state, data, CalendarSourceEnum.Initial);
}

export function addOrUpdateFinal(state: RangeDateStateModel, data: DateModel): RangeDateStateModel {
    return addOrUpdateOne(state, data, CalendarSourceEnum.Final);
}

function addOrUpdateOne(state: RangeDateStateModel, data: DateModel, source: CalendarSourceEnum): RangeDateStateModel {

    let newState = getNewState(state, data.instanceId);

    let alreadyExist = state.states.some(x => x.instanceId == data.instanceId);
    if (alreadyExist) {
        return updateOne(newState, data, source);
    } else {
        return addOne(newState, data, source);
    }

}

function updateOne(newState: RangeDateStateModel, data: DateModel, source: CalendarSourceEnum): RangeDateStateModel {
    let property        = source == CalendarSourceEnum.Initial ? 'initialDate' : 'finalDate';

        newState.states = newState.states.map(x => {
        if (x.instanceId == data.instanceId) {
            x.source                   = source;
            (x.dates as any)[property] = data.date;
        }
        return x;
    });
    return newState;
    
}

function addOne(newState: RangeDateStateModel, data: DateModel, source: CalendarSourceEnum): RangeDateStateModel {
    let       property       = source == CalendarSourceEnum.Initial ? 'initialDate' : 'finalDate';
    let       rangeDate      = new CalendarRangeDateModel() as any;
    rangeDate[property]      = data.date;
    let       rangeDateModel = CalendarRangeDateValidationModel.createCompleteInstace(data.instanceId, rangeDate);

    rangeDateModel.source = source;
    newState.states       = addNewItemToState(newState.states, rangeDateModel);

    return newState;
}