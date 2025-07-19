import { RangeDateForm } from './range-date-form.model';

describe('RangeDateForm', () => {

    it('should create instance form data to range date form', () => {

        // Arrange
        var initialDate: string = new Date().toJSON();
        var finalDate: string   = new Date().toJSON();

        // Act
        var result = RangeDateForm.formDataToRangeDateForm(initialDate, finalDate);

        // Assert
        expect(initialDate == result.initialDate).toBeTruthy();
        expect(finalDate == result.finalDate).toBeTruthy();

    });

    it('should create instance to range date', () => {

        // Arrange
        var today               = new Date();
        var initialDate: string = today.toJSON();
        var finalDate: string   = today.toJSON();

        // Act
        var result    = RangeDateForm.formDataToRangeDateForm(initialDate, finalDate);
        var rangeDate = result.toRangeDate();


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

    it('should convert to range date a empty RangeDateForm', () => {

        // Arrange
        var rangeDateForm = new RangeDateForm();

        // Act
        var result = rangeDateForm.toRangeDate();

        // Assert
        expect(result.initialDate).toEqual(new Date(0));
        expect(result.finalDate).toEqual(new Date(0));

    });

});