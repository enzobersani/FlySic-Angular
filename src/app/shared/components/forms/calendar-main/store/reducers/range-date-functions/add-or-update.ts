import { CalendarRangeDateValidationModel } from '../../../../base-calendar/models/base-calendar-range-validation.model';
import { CalendarRangeDateModel } from '../../../../base-calendar/models/base-calendar-range.model';
import { RangeDateStateModel } from './../../models/range-date-state.model';
import { addNewItemToState, getNewState } from './utils';

export function addOrUpdate(
  state: RangeDateStateModel,
  data: CalendarRangeDateValidationModel
): RangeDateStateModel {
  let instanceExist = state.states.some((x) => x.instanceId == data.instanceId);
  if (instanceExist) {
    return update(state, data);
  } else {
    return add(state, data);
  }
}

function update(
  state: RangeDateStateModel,
  data: CalendarRangeDateValidationModel
): RangeDateStateModel {
  let newState = getNewState(state, data.instanceId);

  let newStates = [...[], ...state.states.map((x) => x.getClone())];
  newState.states = newStates.map((x) => {
    if (x.instanceId == data.instanceId) {
      x = data.getClone();
      x.dates = getRangeDateOrEmpty(x);
    }
    return x;
  });

  return newState;
}

function add(
  state: RangeDateStateModel,
  data: CalendarRangeDateValidationModel
): RangeDateStateModel {
  let newState = getNewState(state, data.instanceId);

  let newDate = data.getClone();
  newDate.dates = getRangeDateOrEmpty(newDate);

  newState.states = addNewItemToState(newState.states, newDate);

  return newState;
}

function getRangeDateOrEmpty(
  date: CalendarRangeDateValidationModel
): CalendarRangeDateModel {
  return date.dates ? date.dates : new CalendarRangeDateModel();
}
