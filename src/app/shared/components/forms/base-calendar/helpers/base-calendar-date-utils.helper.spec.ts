import { CalendarDateUtilsHelper } from './base-calendar-date-utils.helper';

describe('CalendarDateUtilsHelper', () => {

    it('should convert string to date', () => {

        // Arrange
        let stringDate = `2022-02-02T23:59:59.999Z`;

        // Act
        let result = CalendarDateUtilsHelper.toDate(stringDate);

        // Assert        
        expect('object').toEqual(typeof result);

    });

    it('should convert string or date to date', () => {

        // Arrange
        let stringDate = `2022-02-02T23:59:59.999Z`;
        let date       = new Date();

        // Act
        let stringResult = CalendarDateUtilsHelper.convetToDate(stringDate);
        let dateResult   = CalendarDateUtilsHelper.convetToDate(date);

        // Assert        
        expect('object').toEqual(typeof stringResult);
        expect('object').toEqual(typeof dateResult);

    });

    it('should get unix timestamp', () => {

        // Arrange
        let date = new Date("2020-04-13T00:00:00.000-03:00");

        // Act
        let unixTimestamp = CalendarDateUtilsHelper.toUnixTimestamp(date);

        // Assert        
        expect(1586746800).toEqual(unixTimestamp);

    });

    it('should get json', () => {

        // Arrange
        let date = new Date(2022, 2, 2);

        // Act
        let json = CalendarDateUtilsHelper.toJson(date);

        // Assert        
        expect('2022-03-02T00:00:00.000Z' == json).toBeTruthy();

    });

    it('should get null json', () => {

        // Arrange
        let date;

        // Act
        let json = CalendarDateUtilsHelper.toJson(date);

        // Assert        
        expect(json).toBeNull();

    });

    it('should fix initial date', () => {

        // Arrange
        let date = new Date(2022, 2, 2, 10, 10, 10);

        // Act
        let newDate = CalendarDateUtilsHelper.fixInitialDate(date);

        // Assert        
        expect(0).toEqual(newDate.getMinutes());
        expect(0).toEqual(newDate.getSeconds());
        expect(0).toEqual(newDate.getMilliseconds());

    });

    it('should fix final date', () => {

        // Arrange
        let date = new Date(2022, 2, 2, 10, 10, 10);

        // Act
        let newDate = CalendarDateUtilsHelper.fixFinalDate(date);

        // Assert        
        expect(59).toEqual(newDate.getMinutes());
        expect(59).toEqual(newDate.getSeconds());
        expect(999).toEqual(newDate.getMilliseconds());

    });

    it('should clone', () => {

        // Arrange
        let date = new Date();

        // Act
        let newDate = CalendarDateUtilsHelper.clone(date);

        // Assert        
        expect(date.getDate()).toEqual(newDate.getDate());
        expect(date.getMonth()).toEqual(newDate.getMonth());
        expect(date.getFullYear()).toEqual(newDate.getFullYear());

    });

});