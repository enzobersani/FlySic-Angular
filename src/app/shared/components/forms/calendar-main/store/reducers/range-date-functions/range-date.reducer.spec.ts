import { inject, TestBed } from "@angular/core/testing";
import { Store, StoreModule } from "@ngrx/store";
import { CalendarRangeDateValidationModel } from "../../../../base-calendar/models/base-calendar-range-validation.model";
import { CalendarRangeDateModel } from "../../../../base-calendar/models/base-calendar-range.model";
import { addOrUpdateRangeDate, addOrUpdateRangeFinalDate, addOrUpdateRangeInitialDate, resetRangeDate } from '../../actions/range-date.actions';
import { RangeDateStateModel } from '../../models/range-date-state.model';
import { selectAllRangeDate, selectRangeDateById, selectRangeDateDatesById } from '../../selectors/range-date.selector';
import { rangeDateReducer } from "../range-date.reducer";

describe('rangeDateReducer', () => {

    let store: Store;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                StoreModule.forFeature('calendarMainReducers', {
                    rangeDate: rangeDateReducer
                })
            ]
        }).compileComponents();
        store = TestBed.inject(Store);
    });

    it('should create', inject([Store], (store: any) => {
        expect(store).toBeTruthy();
    }));

    it('must have an undefined initial value', inject([Store], (store: any) => {
        store.select(selectAllRangeDate).subscribe((value: any) => {
            expect(value).toEqual(new RangeDateStateModel());
        }).unsubscribe();
    }));

    it('should add or update range initial date', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '1';
        let today      = new Date();

        // Act
        store.dispatch(addOrUpdateRangeInitialDate({ data: { date: today, instanceId: instanceId } }));
        store.dispatch(addOrUpdateRangeInitialDate({ data: { date: today, instanceId: instanceId } }));

        // Assert
        store.select(selectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toEqual(today);
        }).unsubscribe();

    }));

    it('should add or update range final date', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '2';
        let today      = new Date();

        // Act
        store.dispatch(addOrUpdateRangeFinalDate({ data: { date: today, instanceId: instanceId } }));
        store.dispatch(addOrUpdateRangeFinalDate({ data: { date: today, instanceId: instanceId } }));

        // Assert
        store.select(selectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.finalDate).toEqual(today);
        }).unsubscribe();

    }));

    it('should add or update range date', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '3';
        let today      = new Date();
        let tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let rangeDateModel = CalendarRangeDateValidationModel.createCompleteInstace(instanceId, CalendarRangeDateModel.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(selectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toEqual(today);
            expect(value.dates.finalDate).toEqual(tomorrow);
        }).unsubscribe();

    }));

    it('should reset range date', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '4';

        // Act
        store.dispatch(resetRangeDate({ data: { instanceId: instanceId } }));

        // Assert
        store.select(selectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toBeNull();
            expect(value.dates.finalDate).toBeNull();
        }).unsubscribe();

    }));

    it('should add or update range date with data', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '4';
        let today      = new Date();
        let tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let rangeDateModel = CalendarRangeDateValidationModel.createCompleteInstace(instanceId, CalendarRangeDateModel.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(resetRangeDate({ data: { instanceId: instanceId } }));

        // Assert
        store.select(selectRangeDateById(instanceId)).subscribe((value: any) => {
            expect(value.dates.initialDate).toBeNull();
            expect(value.dates.finalDate).toBeNull();
        }).unsubscribe();

    }));

    it('should select range date by id with invalid id', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '5';
        let today      = new Date();
        let tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let rangeDateModel = CalendarRangeDateValidationModel.createCompleteInstace(instanceId, CalendarRangeDateModel.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(selectRangeDateById('999')).subscribe((value: any) => {
            expect(value).toBeUndefined();
        }).unsubscribe();

    }));

    it('should select range date dates by id', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '6';
        let today      = new Date();
        let tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let rangeDateModel = CalendarRangeDateValidationModel.createCompleteInstace(instanceId, CalendarRangeDateModel.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(selectRangeDateDatesById('6')).subscribe((value: any) => {
            expect(value.initialDate).toEqual(today);
            expect(value.finalDate).toEqual(tomorrow);
        }).unsubscribe();

    }));

    it('should select range date dates by id with invalid id', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '7';
        let today      = new Date();
        let tomorrow   = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let rangeDateModel = CalendarRangeDateValidationModel.createCompleteInstace(instanceId, CalendarRangeDateModel.createCompleteInstace());
        if (rangeDateModel.dates) {
            rangeDateModel.dates.initialDate = today;
            rangeDateModel.dates.finalDate   = tomorrow;
        }

        // Act
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));
        store.dispatch(addOrUpdateRangeDate({ data: rangeDateModel }));

        // Assert
        store.select(selectRangeDateDatesById('999')).subscribe((value: any) => {
            expect(value).toBeUndefined();
        }).unsubscribe();

    }));

    it('should reset range date and select range date by id', inject([Store], (store: any) => {

        // Arrange
        let instanceId = '8';

        // Act
        store.dispatch(resetRangeDate({ data: { instanceId: instanceId } }));

        // Assert
        store.select(selectRangeDateDatesById(instanceId)).subscribe((value: any) => {
            expect(value?.initialDate).toBeNull();
            expect(value?.finalDate).toBeNull();
        }).unsubscribe();

    }));

});
