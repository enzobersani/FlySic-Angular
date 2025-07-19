import { RangeDate } from "../../../model/range-date.model";

export class RangeDateForm {

    public initialDate: string | null = null;
    public finalDate: string | null   = null;

    public static formDataToRangeDateForm(initialDate: string, finalDate: string): RangeDateForm {
        var rangeDateForm             = new RangeDateForm();
            rangeDateForm.initialDate = initialDate;
            rangeDateForm.finalDate   = finalDate;
        return rangeDateForm;
    }

    toRangeDate(): RangeDate {
        var rangeDate             = new RangeDate();
            rangeDate.initialDate = new Date(this.initialDate || 0);
            rangeDate.finalDate   = new Date(this.finalDate || 0);
        return rangeDate;
    }

}

export class RangeDateFormValues {
    public initialDate: string | null = null;
    public finalDate: string | null   = null;
}