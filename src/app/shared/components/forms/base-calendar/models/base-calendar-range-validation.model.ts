import { CalendarSourceEnum } from "../enums/base-calendar-source.enum";
import { CalendarRangeDateModel } from "./base-calendar-range.model";

export class CalendarRangeDateValidationModel {

    instanceId: string | undefined;
    source    : CalendarSourceEnum = CalendarSourceEnum.All;
    dates?    : CalendarRangeDateModel | null = new CalendarRangeDateModel();

    static createCompleteInstace(instanceId?: string, dates: CalendarRangeDateModel | null = new CalendarRangeDateModel()) {
        var rangeDateModel            = new CalendarRangeDateValidationModel();
            rangeDateModel.instanceId = instanceId;
            rangeDateModel.source     = CalendarSourceEnum.All;
            rangeDateModel.dates      = dates;
        return rangeDateModel
    }

    getClone(): CalendarRangeDateValidationModel {
        var newRangeDateModel            = new CalendarRangeDateValidationModel();
            newRangeDateModel.instanceId = this.instanceId;
            newRangeDateModel.source     = this.source;
            newRangeDateModel.dates      = this.dates?.getClone();
        return newRangeDateModel;
    }

}