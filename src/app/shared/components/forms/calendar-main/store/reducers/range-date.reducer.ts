import { Action, createReducer, on }                                                                    from "@ngrx/store";
import { resetRangeDate, addOrUpdateRangeDate, addOrUpdateRangeInitialDate, addOrUpdateRangeFinalDate } from "../actions/range-date.actions";
import { RangeDateStateModel }                                                                          from '../models/range-date-state.model';
import { addOrUpdateInitial, addOrUpdateFinal }                                                         from './range-date-functions/add-or-update-one';
import { addOrUpdate }                                                                                  from './range-date-functions/add-or-update';
import { resetById }                                                                                    from './range-date-functions/reset';

export const initialState: RangeDateStateModel = new RangeDateStateModel();

const reducer = createReducer(
    initialState,
    on(addOrUpdateRangeInitialDate, (state, { data }) => addOrUpdateInitial(state, data)),
    on(addOrUpdateRangeFinalDate, (state, { data }) => addOrUpdateFinal(state, data)),
    on(addOrUpdateRangeDate, (state, { data }) => addOrUpdate(state, data)),
    on(resetRangeDate, (state, { data }) => resetById(state, data))
);

export function rangeDateReducer(state: any | undefined, action: Action) {
    return reducer(state, action);
}
