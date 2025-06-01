import { CalendarDateHelper } from "./base-calendar-date.helper";

describe('CalendarDateHelper', () => {

    it('should create', () => {
        let dateHelper = new CalendarDateHelper();
        expect(dateHelper).toBeTruthy();
    });

    it('should create', () => {
        let dateHelper = new CalendarDateHelper(new Date());
        expect(dateHelper).toBeTruthy();
    });

    it('should get date', () => {

        // Arrange
        let date       = new Date();
        let dateHelper = new CalendarDateHelper(date);

        // Act
        let result = dateHelper.getDay();

        // Assert      
        expect(result).toEqual(date.getDate());

    });

    it('should get last month', () => {

        // Arrange
        let date       = new Date();
        let dateHelper = new CalendarDateHelper(date);

        // Act
        let result = dateHelper.getLastMonth();

        // Assert      
        expect(result).toEqual(dateHelper.getDateLastMonth().getMonth() + 1);

    });

});