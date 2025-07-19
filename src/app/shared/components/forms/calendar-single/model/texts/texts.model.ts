import { ButtonsModel }           from "./buttons.model";
import { FromToModel }            from "./from-to.model";
import { MonthsAbbreviatedModel } from "./months-abbreviated.model";
import { MonthsModel }            from "./months.model";
import { PresetsModel }           from "./presents.model";
import { WeekdaysLetterModel }    from "./week-days-letter.model";
import { WeekdaysModel }          from "./week-days.model";

export class TextsModel {
    weekdays?         : WeekdaysModel;
    weekdaysLetter?   : WeekdaysLetterModel;
    months?           : MonthsModel;
    monthsAbbreviated?: MonthsAbbreviatedModel;
    presets?          : PresetsModel;
    fromTo?           : FromToModel;
    buttons?          : ButtonsModel;
}