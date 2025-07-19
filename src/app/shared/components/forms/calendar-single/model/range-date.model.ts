export class RangeDate {

    public initialDate?: Date | null = null;
    public finalDate?: Date | null   = null;

    static createDateNowInstace() {
        var rangeDate             = new RangeDate();
            rangeDate.initialDate = new Date();
            rangeDate.finalDate   = new Date();
            rangeDate.initialDate.setHours(0, 0, 0, 0);
            rangeDate.finalDate.setHours(23, 59, 59, 999);
        return rangeDate;
    }

    static createCompleteInstace(initialDate: Date | null = null, finalDate: Date | null = null): RangeDate {
        var rangeDate             = new RangeDate();
            rangeDate.initialDate = initialDate;
            rangeDate.finalDate   = finalDate;

            if (rangeDate.initialDate)
                rangeDate.initialDate.setHours(0, 0, 0, 0);
            if(rangeDate.finalDate)
                rangeDate.finalDate.setHours(23, 59, 59, 999);
        return rangeDate;
    }

    getClone(): RangeDate {
        var newRangeDate             = new RangeDate();
            newRangeDate.initialDate = this.initialDate;
            newRangeDate.finalDate   = this.finalDate;
        return newRangeDate;
    }

    toString() {
        return this.initialDate?.toLocaleDateString() + ' - ' + this.finalDate?.toLocaleDateString()
    }

}