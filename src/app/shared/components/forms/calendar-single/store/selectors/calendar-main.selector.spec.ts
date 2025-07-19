import { RangeDateStateModel }                  from "../models/range-date-state.model";
import { CalendarSingleAppState, calendarSingleFeature, CalendarSingleState } from "./calendar-main.selector";

describe('calendarMainSelector', () => {

    it('should select main calendar feature', () => {

        // Arrange
        var rangeDateStateModel = new RangeDateStateModel();
        var state: CalendarSingleState        = { rangeDate: rangeDateStateModel };
        var appState: CalendarSingleAppState  = { calendarMainReducers: state }

        // Act
        var result = calendarSingleFeature(appState);

        // Assert
        expect(result.rangeDate).toEqual(rangeDateStateModel);

    });

});
