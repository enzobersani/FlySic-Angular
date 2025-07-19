import { CalendarRangeDateValidationModel } from "../../../base-calendar/models/base-calendar-range-validation.model";


export class RangeDateStateModel {
    sentByInstanceId?: string           = '';
    states           : CalendarRangeDateValidationModel[] = [];

    getClone(): RangeDateStateModel {
        let newRangeDateStateModel                  = new RangeDateStateModel();
            newRangeDateStateModel.sentByInstanceId = this.sentByInstanceId;
            newRangeDateStateModel.states           = [...[], ...this.states.map(x => x.getClone())];
        return newRangeDateStateModel;
    }
}