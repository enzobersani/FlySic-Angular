import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { BaseComponent } from './base/base.component';
import { ToggleService } from './directives/toggle/toggle.service';
import { RangeDate } from './model/range-date.model';
import { ButtonsModel } from './model/texts/buttons.model';
import { CalendarMonthYearTextsModel } from './model/texts/texts.model';
import { IdService } from './services/id.service';
import { RangeService } from './services/range.service';
import { ScrollService } from './services/scroll.service';
import { CalendarMonthYearTextsService } from './services/texts.service';

@Component({
  selector: 'app-calendar-month-year',
  templateUrl: './calendar-month-year.component.html',
  styleUrls: ['./calendar-month-year.component.scss'],
  providers: [
    ToggleService,
    RangeService,
    ScrollService,
    IdService,
    CalendarMonthYearTextsService,
  ]
})
export class CalendarMonthYearComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  @Input() name: string = 'monthYear';
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() fowardLimit: number | Date = 0;
  @Input() backwardLimit: number | Date = 0;
  @Input() limit: RangeDate = RangeDate.createCompleteInstace(null, null);
  @Input() textModel?: CalendarMonthYearTextsModel | null;
  @Input() position = {
    top: '48%',
    left: '57%',
  };

  @Output() submit: EventEmitter<Date> = new EventEmitter<Date>();

  public buttons?: ButtonsModel;
  public hasValue: boolean = false;
  public dateWrapper: Date = new Date();

  constructor(
    public idService: IdService,
    public scrollService: ScrollService,
    public toggleService: ToggleService,
    public textService: CalendarMonthYearTextsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupButtonsText();
    this.setupFormValues();
    this.submit.emit(this.form?.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['textModel']) {
      this.setupButtonsText();
    }
  }

  private setupButtonsText() {
    if (!!!this.textModel) {
      const text = this.textService.getText();
      if (text) this.buttons = text.buttons;
      return;
    }
    
    this.updateTexts();
  }

  private updateTexts() {
    this.textService.sendText(this.textModel!);
    this.buttons = this.textModel!.buttons;
  }

  private setupFormValues(resetForm: boolean = false) {
    const today = new Date();
    this.form.addControl('year', new UntypedFormControl(today.getFullYear(), []));
    this.form.addControl('month', new UntypedFormControl(today.getMonth(), []));

    const formValue = this.form.get(this.name);
    if (!formValue || !formValue.value || resetForm) 
      this.initializeDefaultValue(today);
    this.dateWrapper = this.form.get(this.name)?.value;
  }

  private initializeDefaultValue(today: Date) {
    let valueToBePatched = {} as any;
    valueToBePatched[this.name] = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    this.form.addControl(this.name, new UntypedFormControl(null, []));
    this.form.patchValue(valueToBePatched);
  }

  buttonConfirm() {
    this.setFormValues(this.dateWrapper);
    this.submit.emit(this.form?.value);
    this.toggleService.close();
  }

  changeDate(date: Date) {
    this.setFormValues(date);
    this.changeDateWrapper(date);
    this.submit.emit(this.form.value);
  }

  private setFormValues(date: Date) {
    this.form?.get(this.name)?.setValue(date);
    this.form?.get('month')?.setValue(date.getMonth());
    this.form?.get('year')?.setValue(date.getFullYear());
  }

  changeDateWrapper(date: Date) {
    this.dateWrapper = date;
  }

  resetCalendar() {
    this.setupFormValues(true);
  }
}
