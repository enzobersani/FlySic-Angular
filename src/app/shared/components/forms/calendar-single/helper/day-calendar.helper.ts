import { DateHelper } from './date.helper';

export class DayCalendarHelper {

    private _date: DateHelper;

    constructor(date?: Date) {
        this._date = (date) ? new DateHelper(date) : new DateHelper(new Date());
    }

    getDaysLastMonth(): Array<Date> {
        var quantityDaysLastMonth = this.getQuantityDaysMonth(this._date.getDateLastMonth());
        var currentWeekDay        = new DateHelper(this.getFirstDayOfMonth()).getWeekDay();

        var daysLastMonth = this.createDaysLastMonth(currentWeekDay, quantityDaysLastMonth);

        var lastMonth = this._date.getDateLastMonth();
        return daysLastMonth.map(d => {
            return new Date(lastMonth.getFullYear(), lastMonth.getMonth(), d);
        }).reverse();
    }

    createDaysLastMonth(currentWeekDay: number, quantityDaysLastMonth: number) {
        var daysLastMonth = [];
        for (var i = 0; i < currentWeekDay; i++) {
            daysLastMonth.push(quantityDaysLastMonth);
            quantityDaysLastMonth--;
        }
        return daysLastMonth;
    }

    getFirstDayOfMonth(): Date {
        return new Date(this._date.getYear(), this._date.getMonth() - 1, 1);
    }

    getQuantityDaysMonth(date: Date): number {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    getDaysNextMonth(currentDays: Array<any>): Array<Date> {
        var quantityDaysNextMonth = 42 - currentDays.length;
        var daysNextMonth         = Array.from({ length: quantityDaysNextMonth }, (v, k) => k + 1);
        var nextMonth             = this._date.getNextMonth() - 1;
        var year                  = this._date.getYear();
        var january               = 0;
        if (nextMonth == january) {
            year = year + 1;
        }
        return [...currentDays, ...daysNextMonth.map(d => {
            return new Date(year, nextMonth, d);
        })];
    }

    public getCurrentDaysOfMonth(): Array<Date> {
        var quantityDaysCurrentMonth = this.getQuantityDaysMonth(this._date.getDate());
        return Array.from({ length: quantityDaysCurrentMonth }, (v, k) => k + 1).map(d => {
            return new Date(this._date.getYear(), this._date.getMonth() - 1, d);
        });
    }

    public getDaysOfMonth(): Array<Date> {
        var lastDaysLastMonth  = this.getDaysLastMonth();
        var currentDaysOfMonth = this.getCurrentDaysOfMonth();
        return this.getDaysNextMonth([...lastDaysLastMonth, ...currentDaysOfMonth]);
    }

}