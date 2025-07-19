import { CalendarRangeDateValidationModel } from '../../../../base-calendar/models/base-calendar-range-validation.model';
import { RangeDateStateModel } from '../../models/range-date-state.model';
import { addOrUpdate } from './add-or-update';

describe('addOrUpdate', () => {
  it('should add or add with dates null', () => {
    // Arrange
    let state: RangeDateStateModel = new RangeDateStateModel();
    let data: CalendarRangeDateValidationModel =
      new CalendarRangeDateValidationModel();
    data.dates = null;

    // Act
    let result = addOrUpdate(state, data);

    // Assert
    expect(result.states[0].dates?.initialDate).toBeNull();
    expect(result.states[0].dates?.finalDate).toBeNull();
  });
});
