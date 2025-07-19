import { DateUtils } from './date-utils.helper';

describe('DateUtils', () => {

    it('should convert string to date', () => {

        // Arrange
        var stringDate = `2022-02-02T23:59:59.999Z`;

        // Act
        var result = DateUtils.toDate(stringDate);

        // Assert        
        expect('object').toEqual(typeof result);

    });

    it('should convert string or date to date', () => {

        // Arrange
        var stringDate = `2022-02-02T23:59:59.999Z`;
        var date       = new Date();

        // Act
        var stringResult = DateUtils.convetToDate(stringDate);
        var dateResult   = DateUtils.convetToDate(date);

        // Assert        
        expect('object').toEqual(typeof stringResult);
        expect('object').toEqual(typeof dateResult);

    });

    it('should get unix timestamp', () => {

        // Arrange
        var date = new Date("2020-04-13T00:00:00.000-03:00");

        // Act
        var unixTimestamp = DateUtils.toUnixTimestamp(date);

        // Assert        
        expect(1586746800).toEqual(unixTimestamp);

    });

    it('should get json', () => {

        // Arrange
        var date = new Date(2022, 2, 2);

        // Act
        var json = DateUtils.toJson(date);

        // Assert        
        expect('2022-03-02T00:00:00.000Z' == json).toBeTruthy();

    });

    it('should get null json', () => {

        // Arrange
        var date;

        // Act
        var json = DateUtils.toJson(date);

        // Assert        
        expect(json).toBeNull();

    });

    it('should fix initial date', () => {

        // Arrange
        var date = new Date(2022, 2, 2, 10, 10, 10);

        // Act
        var newDate = DateUtils.fixInitialDate(date);

        // Assert        
        expect(0).toEqual(newDate.getMinutes());
        expect(0).toEqual(newDate.getSeconds());
        expect(0).toEqual(newDate.getMilliseconds());

    });

    it('should fix final date', () => {

        // Arrange
        var date = new Date(2022, 2, 2, 10, 10, 10);

        // Act
        var newDate = DateUtils.fixFinalDate(date);

        // Assert        
        expect(59).toEqual(newDate.getMinutes());
        expect(59).toEqual(newDate.getSeconds());
        expect(999).toEqual(newDate.getMilliseconds());

    });

    it('should clone', () => {

        // Arrange
        var date = new Date();

        // Act
        var newDate = DateUtils.clone(date);

        // Assert        
        expect(date.getDate()).toEqual(newDate.getDate());
        expect(date.getMonth()).toEqual(newDate.getMonth());
        expect(date.getFullYear()).toEqual(newDate.getFullYear());

    });

});