import { RangeDate } from './../../model/range-date.model';
import { Source }    from './../../enum/source.enum';

export class RangeDateModel {

    instanceId: string | undefined;
    source    : Source = Source.All;
    dates?    : RangeDate | null = new RangeDate();

    static createCompleteInstace(instanceId?: string, dates: RangeDate | null = new RangeDate()) {
        var rangeDateModel            = new RangeDateModel();
            rangeDateModel.instanceId = instanceId;
            rangeDateModel.source     = Source.All;
            rangeDateModel.dates      = dates;
        return rangeDateModel
    }

    getClone(): RangeDateModel {
        var newRangeDateModel            = new RangeDateModel();
            newRangeDateModel.instanceId = this.instanceId;
            newRangeDateModel.source     = this.source;
            newRangeDateModel.dates      = this.dates?.getClone();
        return newRangeDateModel;
    }

}