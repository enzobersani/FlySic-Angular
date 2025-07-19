export class DateUtils {

    public static toUnixTimestamp(date: Date) {
        return date.getTime() / 1000;
    }

    public static convetToDate(date: any) {
        return typeof date == 'string' ? DateUtils.toDate(date): date;
    }

    public static toDate(date: string): Date {
        var date = date.split('T')[0];
        return new Date(`${date}T23:59:59.999Z`);
    }

    public static toJson(date?: Date | null): string | null {
        if (!date) return null;
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON();
    }

    public static fixInitialDate(date: Date): Date {
        date.setHours(0, 0, 0);
        return date;
    }

    public static fixFinalDate(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    }

    public static clone(date: Date): Date {
        return new Date(date.getTime());
    }

}