import { CalendarRangeDateValidationModel } from "../../../../base-calendar/models/base-calendar-range-validation.model";
import { CalendarRangeDateModel } from "../../../../base-calendar/models/base-calendar-range.model";
import { addNewItemToState } from "./utils";

describe('rangeDateFunctionsUtils', () => {

    it('should create', () => {

        // Arrange
        let state: CalendarRangeDateValidationModel[] = [CalendarRangeDateValidationModel.createCompleteInstace('1', CalendarRangeDateModel.createCompleteInstace(new Date(), new Date()))];
        let newItem: CalendarRangeDateValidationModel = CalendarRangeDateValidationModel.createCompleteInstace('2', CalendarRangeDateModel.createCompleteInstace(new Date(), new Date()));

        // Act
        let result = addNewItemToState(state, newItem);


        // Assert
        expect(result.find(x => x.instanceId == '1')).toBeTruthy();
        expect(result.find(x => x.instanceId == '2')).toBeTruthy();

    });

});