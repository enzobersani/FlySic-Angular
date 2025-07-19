import { RangeDateStateModel }                                                                          from './../models/range-date-state.model';
import { calendarSingleAddOrUpdateRangeDate, calendarSingleAddOrUpdateRangeFinalDate, calendarSingleAddOrUpdateRangeInitialDate, calendarSingleResetRangeDate } from './../actions/range-date.actions';
import { inject, TestBed }                                                                              from "@angular/core/testing";
import { Store, StoreModule }                                                                           from "@ngrx/store";
import { calendarSingleRangeDateReducer }                                                                             from "./range-date.reducer";
import { RangeDateModel }                                                                               from '../models/range-date.model';
import { calendarSingleSelectAllRangeDate, calendarSingleSelectRangeDateById, calendarSingleSelectRangeDateDatesById }                            from '../selectors/range-date.selector';
import { RangeDate }                                                                                    from '../../model/range-date.model';

describe('calendarSingleRangeDateReducer', () => {

    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                StoreModule.forFeature('calendarMainReducers', {
                    rangeDate: calendarSingleRangeDateReducer
                })
            ]
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    it('should create', inject([Store], (store: any) => {
        expect(store).toBeTruthy();
    }));

    it('must have an undefined initial value', inject([Store], (store: any) => {
        store.select(calendarSingleSelectAllRangeDate).subscribe((value: any) => {
            expect(value).toEqual(new RangeDateStateModel());
        }).unsubscribe();
    }));

    it('should add or update range initial date', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '1';
        var today      = new Date();

        // Act
        store.dispatch(calendarSingleAddOrUpdateRangeInitialDate({ data: { date: today, instanceId: instanceId } }));
        store.dispatch(calendarSingleAddOrUpdateRangeInitialDate({ data: { date: today, instanceId: instanceId } }));

        // Assert
        store.select(calendarSingleSelectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toEqual(today);
        }).unsubscribe();

    }));

    it('should add or update range final date', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '2';
        var today      = new Date();

        // Act
        store.dispatch(calendarSingleAddOrUpdateRangeFinalDate({ data: { date: today, instanceId: instanceId } }));
        store.dispatch(calendarSingleAddOrUpdateRangeFinalDate({ data: { date: today, instanceId: instanceId } }));

        // Assert
        store.select(calendarSingleSelectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.finalDate).toEqual(today);
        }).unsubscribe();

    }));

    it('should add or update range date', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '3';
        var today      = new Date();
        var tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var rangeDateModel = RangeDateModel.createCompleteInstace(instanceId, RangeDate.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(calendarSingleSelectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toEqual(today);
            expect(value.dates.finalDate).toEqual(tomorrow);
        }).unsubscribe();

    }));

    it('should reset range date', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '4';

        // Act
        store.dispatch(calendarSingleResetRangeDate({ data: { instanceId: instanceId } }));

        // Assert
        store.select(calendarSingleSelectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toBeNull();
            expect(value.dates.finalDate).toBeNull();
        }).unsubscribe();

    }));

    it('should add or update range date with data', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '4';
        var today      = new Date();
        var tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var rangeDateModel = RangeDateModel.createCompleteInstace(instanceId, RangeDate.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(calendarSingleResetRangeDate({ data: { instanceId: instanceId } }));

        // Assert
        store.select(calendarSingleSelectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toBeNull();
            expect(value.dates.finalDate).toBeNull();
        }).unsubscribe();

    }));

    it('should select range date by id with invalid id', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '5';
        var today      = new Date();
        var tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var rangeDateModel = RangeDateModel.createCompleteInstace(instanceId, RangeDate.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(calendarSingleSelectRangeDateById('999')).subscribe((value: any) => {
            expect(value).toBeUndefined();
        }).unsubscribe();

    }));

    it('should select range date dates by id', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '6';
        var today      = new Date();
        var tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var rangeDateModel = RangeDateModel.createCompleteInstace(instanceId, RangeDate.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(calendarSingleSelectRangeDateDatesById('6')).subscribe((value: any) => {
            expect(value.initialDate).toEqual(today);
            expect(value.finalDate).toEqual(tomorrow);
        }).unsubscribe();

    }));

    it('should select range date dates by id with invalid id', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '7';
        var today      = new Date();
        var tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var rangeDateModel = RangeDateModel.createCompleteInstace(instanceId, RangeDate.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(calendarSingleAddOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(calendarSingleSelectRangeDateDatesById('999')).subscribe((value: any) => {
            expect(value).toBeUndefined();
        }).unsubscribe();

    }));

    it('should reset range date and select range date by id', inject([Store], (store: any) => {

        // Arrange
        var instanceId = '8';

        // Act
        store.dispatch(calendarSingleResetRangeDate({ data: { instanceId: instanceId } }));

        // Assert
        store.select(calendarSingleSelectRangeDateDatesById(instanceId)).subscribe((value: any) => {
            expect(value?.initialDate).toBeNull();
            expect(value?.finalDate).toBeNull();
        }).unsubscribe();

    }));

});
