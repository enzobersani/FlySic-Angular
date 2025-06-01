import { CalendarDateUtilsHelper } from "./base-calendar-date-utils.helper";

export class CalendarDateCompareHelper {

    public static dateIsEqual(dateOne?: Date | string | null, dateTwo?: Date | string | null) {

        if (dateOne == dateTwo) return true;
        if (!dateOne || !dateTwo) return false;

        let dateOneConveted = CalendarDateUtilsHelper.convetToDate(dateOne);
        let dateTwoConveted = CalendarDateUtilsHelper.convetToDate(dateTwo);

        return CalendarDateCompareHelper.isEqual(dateOneConveted, dateTwoConveted);

    }

    public static isEqual(dateOne?: Date | null, dateTwo?: Date | null) {

        if (dateOne == dateTwo) return true;
        if (!dateOne || !dateTwo) return false;

        let day   = dateOne.getDate() == dateTwo.getDate();
        let month = dateOne.getMonth() == dateTwo.getMonth();
        let year  = dateOne.getFullYear() == dateTwo.getFullYear();

        return day && month && year;
    }

}