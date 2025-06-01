import { CalendarDateHelper } from "./base-calendar-date.helper";


export class CalendarDayHelper {

    private _date: CalendarDateHelper;

    constructor(date?: Date) {
        this._date = (date) ? new CalendarDateHelper(date) : new CalendarDateHelper(new Date());
    }

    getDaysLastMonth(): Array<Date> {
        let quantityDaysLastMonth = this.getQuantityDaysMonth(this._date.getDateLastMonth());
        let currentWeekDay        = new CalendarDateHelper(this.getFirstDayOfMonth()).getWeekDay();

        let daysLastMonth = this.createDaysLastMonth(currentWeekDay, quantityDaysLastMonth);

        let lastMonth = this._date.getDateLastMonth();
        return daysLastMonth.map(d => {
            return new Date(lastMonth.getFullYear(), lastMonth.getMonth(), d);
        }).reverse();
    }

    createDaysLastMonth(currentWeekDay: number, quantityDaysLastMonth: number) {
        let daysLastMonth = [];
        for (let i = 0; i < currentWeekDay; i++) {
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
        let quantityDaysNextMonth = 42 - currentDays.length;
        let daysNextMonth         = Array.from({ length: quantityDaysNextMonth }, (v, k) => k + 1);
        let nextMonth             = this._date.getNextMonth() - 1;
        let year                  = this._date.getYear();
        let january               = 0;
        if (nextMonth == january) {
            year = year + 1;
        }
        return [...currentDays, ...daysNextMonth.map(d => {
            return new Date(year, nextMonth, d);
        })];
    }

    public getCurrentDaysOfMonth(): Array<Date> {
        let quantityDaysCurrentMonth = this.getQuantityDaysMonth(this._date.getDate());
        return Array.from({ length: quantityDaysCurrentMonth }, (v, k) => k + 1).map(d => {
            return new Date(this._date.getYear(), this._date.getMonth() - 1, d);
        });
    }

    public getDaysOfMonth(): Array<Date> {
        let lastDaysLastMonth  = this.getDaysLastMonth();
        let currentDaysOfMonth = this.getCurrentDaysOfMonth();
        return this.getDaysNextMonth([...lastDaysLastMonth, ...currentDaysOfMonth]);
    }

}