import { DateUtils } from "./date-utils.helper";

export class DateCompare {

    public static dateIsEqual(data1?: Date | string | null, data2?: Date | string | null) {

        if (data1 == data2) return true;
        if (!data1 || !data2) return false;

        var date1Conveted = DateUtils.convetToDate(data1);
        var date2Conveted = DateUtils.convetToDate(data2);

        return DateCompare.isEqual(date1Conveted, date2Conveted);

    }

    public static isEqual(data1?: Date | null, data2?: Date | null) {

        if (data1 == data2) return true;
        if (!data1 || !data2) return false;

        var day   = data1.getDate() == data2.getDate();
        var month = data1.getMonth() == data2.getMonth();
        var year  = data1.getFullYear() == data2.getFullYear();

        return day && month && year;
    }

}