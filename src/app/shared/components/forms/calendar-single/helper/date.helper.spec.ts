import { DateHelper } from "./date.helper";

describe('DateHelper', () => {

    it('should create', () => {
        var dateHelper = new DateHelper();
        expect(dateHelper).toBeTruthy();
    });

    it('should create', () => {
        var dateHelper = new DateHelper(new Date());
        expect(dateHelper).toBeTruthy();
    });

    it('should get date', () => {

        // Arrange
        var date       = new Date();
        var dateHelper = new DateHelper(date);

        // Act
        var result = dateHelper.getDay();

        // Assert      
        expect(result).toEqual(date.getDate());

    });

    it('should get last month', () => {

        // Arrange
        var date       = new Date();
        var dateHelper = new DateHelper(date);

        // Act
        var result = dateHelper.getLastMonth();

        // Assert      
        expect(result).toEqual(dateHelper.getDateLastMonth().getMonth() + 1);

    });

});