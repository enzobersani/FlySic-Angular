import { RangeDateStateModel } from "../models/range-date-state.model";
import { AppState, mainCalendarFeature, State } from "./calendar-main.selector";

describe('calendarMainSelector', () => {

    it('should select main calendar feature', () => {

        // Arrange
        let rangeDateStateModel = new RangeDateStateModel();
        let state: State        = { rangeDate: rangeDateStateModel };
        let appState: AppState  = { calendarMainReducers: state }

        // Act
        let result = mainCalendarFeature(appState);

        // Assert
        expect(result.rangeDate).toEqual(rangeDateStateModel);

    });

});