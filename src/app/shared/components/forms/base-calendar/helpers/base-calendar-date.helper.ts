import { CalendarWeekDayEnum } from "../enums/base-calendar-week-day.enum";


export class CalendarDateHelper {

    private _date: Date;

    constructor(date?: Date) {
        this._date = (date) ? date : new Date();
    }

    public getWeekDay(): CalendarWeekDayEnum {
        return this._date.getDay() as CalendarWeekDayEnum;
    }

    public getDay(): number {
        return this._date.getDate();
    }

    public getMonth(): number {
        return this._date.getMonth() + 1;
    }

    public getDateNextMonth(): Date {
        let date = new Date(this._date.getTime());
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        return date;
    }

    public getDateLastMonth(): Date {
        let date = new Date(this._date.getTime());
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