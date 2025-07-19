import { DateCompare } from './date-compare.helper';

describe('DateCompare', () => {

    it('should compare and by equal', () => {

        // Arrange
        var today = new Date();

        // Act
        var result = DateCompare.dateIsEqual(today, today);

        // Assert        
        expect(result).toBeTruthy();

    });

    [
        {
            date1: null,
            date2: new Date()
        },
        {
            date1: new Date(),
            date2: null
        }
    ].forEach(element => {

        it('should compare with invalid date', () => {

            // Arrange

            // Act
            var result = DateCompare.dateIsEqual(element.date1, element.date2);

            // Assert        
            expect(result).toBeFalsy();

        });

    });

    [
        {
            date1: undefined,
            date2: new Date()
        },
        {
            date1: new Date(),
            date2: undefined
        }
    ].forEach(element => {

        it('should compare with invalid date', () => {

            // Arrange

            // Act
            var result = DateCompare.isEqual(element.date1, element.date2);

            // Assert        
            expect(result).toBeFalsy();

        });

    });

});