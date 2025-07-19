import { RangeDate }         from "../../../model/range-date.model";
import { RangeDateModel }    from "../../models/range-date.model";
import { calendarSingleAddNewItemToState } from "./utils";

describe('rangeDateFunctionsUtils', () => {

    it('should create', () => {

        // Arrange
        var state: RangeDateModel[] = [RangeDateModel.createCompleteInstace('1', RangeDate.createCompleteInstace(new Date(), new Date()))];
        var newItem: RangeDateModel = RangeDateModel.createCompleteInstace('2', RangeDate.createCompleteInstace(new Date(), new Date()));

        // Act
        var result = calendarSingleAddNewItemToState(state, newItem);


        // Assert
        expect(result.find(x => x.instanceId == '1')).toBeTruthy();
        expect(result.find(x => x.instanceId == '2')).toBeTruthy();

    });

});
