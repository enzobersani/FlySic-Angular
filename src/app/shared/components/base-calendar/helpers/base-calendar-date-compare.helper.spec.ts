import { CalendarDateCompareHelper } from './base-calendar-date-compare.helper';

describe('CalendarDateCompareHelper', () => {

    it('should compare and by equal', () => {

        // Arrange
        let today = new Date();

        // Act
        let result = CalendarDateCompareHelper.dateIsEqual(today, today);

        // Assert        
        expect(result).toBeTruthy();

    });

    [
        {
            dateOne: null,
            dateTwo: new Date()
        },
        {
            dateOne: new Date(),
            dateTwo: null
        }
    ].forEach(element => {

        it('should compare with invalid date', () => {

            // Act
            let result = CalendarDateCompareHelper.dateIsEqual(element.dateOne, element.dateTwo);

            // Assert        
            expect(result).toBeFalsy();

        });

    });

    [
        {
            dateOne: undefined,
            dateTwo: new Date()
        },
        {
            dateOne: new Date(),
            dateTwo: undefined
        }
    ].forEach(element => {

        it('should compare with invalid date', () => {

            // Act
            let result = CalendarDateCompareHelper.isEqual(element.dateOne, element.dateTwo);

            // Assert        
            expect(result).toBeFalsy();

        });

    });

});