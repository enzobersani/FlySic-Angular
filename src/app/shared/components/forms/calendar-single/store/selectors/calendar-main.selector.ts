import { createFeatureSelector } from '@ngrx/store';
import { RangeDateStateModel } from './../models/range-date-state.model';
export interface CalendarSingleState { rangeDate: RangeDateStateModel }
export interface CalendarSingleAppState { calendarMainReducers: CalendarSingleState; }
export const calendarSingleFeature = createFeatureSelector<RangeDateStateModel>('calendarMainReducers');