export class CalendarRangeDateModel {
  public initialDate?: Date | null = null;
  public finalDate?: Date | null = null;

  static createDateNowInstace() {
		let rangeDate = new CalendarRangeDateModel();
    rangeDate.initialDate = new Date();
    rangeDate.finalDate = new Date();
    rangeDate.initialDate.setHours(0, 0, 0, 0);
    rangeDate.finalDate.setHours(23, 59, 59, 999);

    return rangeDate;
  }

  static createCompleteInstace(initialDate: Date | null = null, finalDate: Date | null = null ): CalendarRangeDateModel {
    let rangeDate = new CalendarRangeDateModel();
    rangeDate.initialDate = initialDate;
    rangeDate.finalDate = finalDate;

    if (rangeDate.initialDate) rangeDate.initialDate.setHours(0, 0, 0, 0);
    if (rangeDate.finalDate) rangeDate.finalDate.setHours(23, 59, 59, 999);

    return rangeDate;
  }

  getClone(): CalendarRangeDateModel {
    let newRangeDate = new CalendarRangeDateModel();
    newRangeDate.initialDate = this.initialDate;
    newRangeDate.finalDate = this.finalDate;

    return newRangeDate;
  }

  toString() {
		const initialDate = this.initialDate?.toLocaleDateString() ?? '';
		const finalDate = this.finalDate?.toLocaleDateString() ?? '';
    
		return initialDate + ' - ' + finalDate;
  }
}
