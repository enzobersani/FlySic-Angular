import { DayCalendarHelper } from "./day-calendar.helper";

describe('DayCalendarHelper', () => {

    it('should create with no date', () => {
        var dayCalendarHelper = new DayCalendarHelper();
        expect(dayCalendarHelper).toBeTruthy();
    });

    it('should get days last month', () => {

        // Arrange
        var dayCalendarHelper = new DayCalendarHelper();
        spyOn(dayCalendarHelper, 'createDaysLastMonth').and.returnValue([3, 2, 1]);

        // Act
        var result = dayCalendarHelper.getDaysLastMonth();

        // Assert
        expect(result[0].getDate()).toEqual(1);
        expect(result[1].getDate()).toEqual(2);
        expect(result[2].getDate()).toEqual(3);

    });

    it('should create with no date', () => {

        // Arrange
        var dayCalendarHelper             = new DayCalendarHelper();
        var currentWeekDay: number        = 3;
        var quantityDaysLastMonth: number = 4;

        // Act
        var result = dayCalendarHelper.createDaysLastMonth(currentWeekDay, quantityDaysLastMonth);

        // Assert
        expect(result[0]).toEqual(4);
        expect(result[1]).toEqual(3);
        expect(result[2]).toEqual(2);
''
    });

    it('should create with next year', () => {
        // Arrange
        const dayCalendarHelper = new DayCalendarHelper(new Date('12/12/23'));
        spyOn(dayCalendarHelper, 'getDaysOfMonth').and.callThrough();


        // Act
        const lastDaysLastMonth  = dayCalendarHelper.getDaysLastMonth();
        const currentDaysOfMonth = dayCalendarHelper.getCurrentDaysOfMonth();
        const result = dayCalendarHelper.getDaysNextMonth([...lastDaysLastMonth, ...currentDaysOfMonth]);

        // Assert
        expect(result[result.length - 1].getFullYear()).toEqual(2024);
    });

});