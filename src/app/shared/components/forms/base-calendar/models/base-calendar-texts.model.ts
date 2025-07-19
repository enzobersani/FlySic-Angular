import { CalendarTextButtonsModel } from "./base-calendar-buttons.model";
import { CalendarTextFromToModel } from "./base-calendar-from-to.model";
import { CalendarTextMonthsAbbreviatedModel } from "./base-calendar-months-abbreviated.model";
import { CalendarTextMonthsModel } from "./base-calendar-months.model";
import { CalendarTextPresetsModel } from "./base-calendar-presets.model";
import { CalendarTextWeekdaysLetterModel } from "./base-calendar-week-days-letter.model";
import { CalendarTextWeekdaysModel } from "./base-calendar-week-days.model";

export class CalendarTextsModel {
    public weekdays?         : CalendarTextWeekdaysModel;
    public weekdaysLetter?   : CalendarTextWeekdaysLetterModel;
    public months?           : CalendarTextMonthsModel;
    public monthsAbbreviated?: CalendarTextMonthsAbbreviatedModel;
    public presets?          : CalendarTextPresetsModel;
    public fromTo?           : CalendarTextFromToModel;
    public buttons?          : CalendarTextButtonsModel;
}