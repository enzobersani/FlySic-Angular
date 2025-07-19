import { WeekDayEnum } from './week-day.enum';

export class DateHelper {

    private _date: Date;

    constructor(date?: Date) {
        this._date = (date) ? date : new Date();
    }

    public getWeekDay(): WeekDayEnum {
        return this._date.getDay() as WeekDayEnum;
    }

    public getDay(): number {
        return this._date.getDate();
    }

    public getMonth(): number {
        return this._date.getMonth() + 1;
    }

    public getDateNextMonth(): Date {
        var date = new Date(this._date.getTime());
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        return date;
    }

    public getDateLastMonth(): Date {
        var date = new Date(this._date.getTime());
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        return date;
    }

    public getLastMonth(): number {
        return this.getDateLastMonth().getMonth() + 1;
    }

    public getNextMonth(): number {
        return this.getDateNextMonth().getMonth() + 1;
    }

    public getYear(): number {
        return this._date.getFullYear();
    }

    public getDate(): Date {
        return this._date;
    }

}