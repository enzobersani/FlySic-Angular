import { RangeDateStateModel } from './../models/range-date-state.model';
export interface State { rangeDate: RangeDateStateModel }
export interface AppState { calendarMainReducers: State; }
export const mainCalendarFeature = (state: AppState) => state.calendarMainReducers;