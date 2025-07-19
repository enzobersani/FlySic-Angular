import { RangeDateModel } from './range-date.model';

export class RangeDateStateModel {
    sentByInstanceId?: string           = '';
    states           : RangeDateModel[] = [];

    getClone(): RangeDateStateModel {
        var newRangeDateStateModel                  = new RangeDateStateModel();
            newRangeDateStateModel.sentByInstanceId = this.sentByInstanceId;
            newRangeDateStateModel.states           = [...[], ...this.states.map(x => x.getClone())];
        return newRangeDateStateModel;
    }
}