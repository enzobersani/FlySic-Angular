import { RangeDateStateModel } from "../../models/range-date-state.model";
import { RangeDateModel }      from "../../models/range-date.model";
import { calendarSingleAddOrUpdate }         from "./add-or-update";

describe('calendarSingleAddOrUpdate', () => {

    it('should add or add with dates null', () => {

        // Arrange
        var state: RangeDateStateModel = new RangeDateStateModel();
        var data: RangeDateModel       = new RangeDateModel();
            data.dates                 = null;

        // Act
        var result = calendarSingleAddOrUpdate(state, data);

        // Assert
        expect(result.states[0].dates?.initialDate).toBeNull();
        expect(result.states[0].dates?.finalDate).toBeNull();

    });

});
