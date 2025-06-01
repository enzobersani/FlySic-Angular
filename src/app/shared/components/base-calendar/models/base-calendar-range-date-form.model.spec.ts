import { CalendarRangeDateFormModel } from './base-calendar-range-date-form.model';

describe('CalendarRangeDateFormModel', () => {

    it('should create instance form data to range date form', () => {

        // Arrange
        let initialDate: string = new Date().toJSON();
        let finalDate: string   = new Date().toJSON();

        // Act
        let result = CalendarRangeDateFormModel.formDataToRangeDateForm(initialDate, finalDate);

        // Assert
        expect(initialDate == result.initialDate).toBeTruthy();
        expect(finalDate == result.finalDate).toBeTruthy();

    });

    it('should create instance to range date', () => {

        // Arrange
        let today               = new Date();
        let initialDate: string = today.toJSON();
        let finalDate: string   = today.toJSON();

        // Act
        let result    = CalendarRangeDateFormModel.formDataToRangeDateForm(initialDate, finalDate);
        let rangeDate = result.toRangeDate();


        // Assert
        if (rangeDate.initialDate) {
            expect(rangeDate.initialDate.getDate()).toEqual(today.getDate());
            expect(rangeDate.initialDate.getMonth()).toEqual(today.getMonth());
            expect(rangeDate.initialDate.getFullYear()).toEqual(today.getFullYear());
        }

        if (rangeDate.finalDate) {
            expect(rangeDate.finalDate.getDate()).toEqual(today.getDate());
            expect(rangeDate.finalDate.getMonth()).toEqual(today.getMonth());
            expect(rangeDate.finalDate.getFullYear()).toEqual(today.getFullYear());
        }

    });

    it('should convert to range date a empty CalendarRangeDateFormModel', () => {

        // Arrange
        let rangeDateForm = new CalendarRangeDateFormModel();

        // Act
        let result = rangeDateForm.toRangeDate();

        // Assert
        expect(result.initialDate).toEqual(new Date(0));
        expect(result.finalDate).toEqual(new Date(0));

    });

});