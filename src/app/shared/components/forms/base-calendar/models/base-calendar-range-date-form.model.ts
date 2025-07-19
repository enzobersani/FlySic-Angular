import { CalendarRangeDateModel } from "./base-calendar-range.model";

export class CalendarRangeDateFormModel {
  public initialDate: string | null = null;
  public finalDate: string | null = null;

  public static formDataToRangeDateForm(
    initialDate: string,
    finalDate: string
  ): CalendarRangeDateFormModel {
    let rangeDateForm = new CalendarRangeDateFormModel();
    rangeDateForm.initialDate = initialDate;
    rangeDateForm.finalDate = finalDate;
    return rangeDateForm;
  }

  toRangeDate(): CalendarRangeDateModel {
    let rangeDate = new CalendarRangeDateModel();
    rangeDate.initialDate = new Date(this.initialDate || 0);
    rangeDate.finalDate = new Date(this.finalDate || 0);
    return rangeDate;
  }
}
