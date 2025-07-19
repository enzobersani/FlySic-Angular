import { SimpleChange } from '@angular/core';

import { CalendarMonthYearComponent } from './calendar-month-year.component';
import { ToggleService } from './directives/toggle/toggle.service';
import { CalendarMonthYearTextsModel } from './model/texts/texts.model';
import { IdService } from './services/id.service';
import { ScrollService } from './services/scroll.service';
import { CalendarMonthYearTextsService } from './services/texts.service';

describe('CalendarMonthYearComponent', () => {
  let component: CalendarMonthYearComponent;

  var idServiceSpy = jasmine.createSpyObj<IdService>(['get']);
  var toggleServiceSpy = jasmine.createSpyObj<ToggleService>([
    'toggle',
    'listener',
    'close',
  ]);
  var textsServiceSpy = jasmine.createSpyObj<CalendarMonthYearTextsService>([
    'setTexts',
    'sendText',
    'getText',
  ]);
  var scrollServiceSpy = jasmine.createSpyObj<ScrollService>([
    'legacyScroll',
    'onDestroy',
  ]);

  beforeEach(async () => {
    component = new CalendarMonthYearComponent(
      idServiceSpy,
      scrollServiceSpy,
      toggleServiceSpy,
      textsServiceSpy
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup custom resource OnInit', () => {
    const textModel = {
      buttons: {
        confirm: 'C',
        clear: 'L',
      },
    } as CalendarMonthYearTextsModel;

    component.textModel = textModel;
    component.ngOnInit();

    expect(component.buttons?.confirm).toBe('C');
    expect(component.buttons?.clear).toBe('L');
    expect(textsServiceSpy.sendText).toHaveBeenCalled();
  });

  it('should setup default resource OnInit', () => {
    textsServiceSpy.getText.and.returnValue({
      buttons: {
        confirm: 'Confirm',
        clear: 'Clear',
      },
    });

    component.ngOnInit();

    expect(component.buttons?.confirm).toBe('Confirm');
    expect(component.buttons?.clear).toBe('Clear');
    expect(textsServiceSpy.getText).toHaveBeenCalled();
  });

  it('should setup form data OnInit when form is informed ', () => {
    const currentDate = new Date();
    const defaultValueMonthYear = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    component.ngOnInit();

    expect(component.form.get('year')?.value).toBe(currentDate.getFullYear());
    expect(component.form.get('month')?.value).toBe(currentDate.getMonth());
    expect(component.form.get('monthYear')?.value.getTime()).toBe(
      defaultValueMonthYear.getTime()
    );
  });

  it('should setup formControlName with custom name ', () => {
    const currentDate = new Date();
    component.name = 'test';

    component.ngOnInit();

    expect(component.form.get('year')?.value).toBe(currentDate.getFullYear());
    expect(component.form.get('month')?.value).toBe(currentDate.getMonth());
    expect(component.form.get('monthYear')).not.toBeTruthy();
    expect(component.form.get('test')).toBeTruthy();
  });

  it('confirm should set form values to currentDate', () => {
    const fictionalDate = new Date(2023, 9, 1);
    component.form.get('monthYear')?.setValue(fictionalDate);
      
    component.ngOnInit();
    component.dateWrapper = new Date(2023, 8, 1);
    component.buttonConfirm();

    expect(component.form.get('year')?.value).toBe(2023);
    expect(component.form.get('month')?.value).toBe(8);
    expect(component.form.get('monthYear')?.value.getMonth()).toBe(8);
    expect(component.form.get('monthYear')?.value.getFullYear()).toBe(2023);
  });

  it('confirm should close and emit form', () => {
    spyOn(component.submit, 'emit');

    component.buttonConfirm();

    expect(toggleServiceSpy.close).toHaveBeenCalled();
    expect(component.submit.emit).toHaveBeenCalled();
  });

  it('reset should restart component', () => {
    const today = new Date();
    component.dateWrapper = new Date(2022, 10, 1);

    component.resetCalendar();

    expect(component.dateWrapper.getDate()).toBe(1);
    expect(component.dateWrapper.getMonth()).toBe(today.getMonth());
    expect(component.dateWrapper.getFullYear()).toBe(today.getFullYear());
  });

  it('changeDateWrapper should change dateWrapper value', () => {
    component.dateWrapper = new Date();

    component.changeDateWrapper(new Date(1950, 1, 1));

    expect(component.dateWrapper.getDate()).toBe(1);
    expect(component.dateWrapper.getMonth()).toBe(1);
    expect(component.dateWrapper.getFullYear()).toBe(1950);
  });

  it('changeDate should emit and change form values', () => {
    spyOn(component.submit, 'emit');

    component.ngOnInit();
    component.changeDate(new Date(1950, 6, 1));

    expect(component.form.get('year')?.value).toBe(1950);
    expect(component.form.get('month')?.value).toBe(6);
    expect(component.submit.emit).toHaveBeenCalled();
  });

  it('should updateTexts onChanges', () => {
    component.textModel = { buttons: { confirm: 'T-1', clear: 'T0' } }
    const changes = {
      textModel: new SimpleChange(
        component.textModel,
        { buttons: { confirm: 'T', clear: 'T2' } } as CalendarMonthYearTextsModel,
        false
      ),
    };

    component.ngOnChanges(changes);

    expect(textsServiceSpy.sendText).toHaveBeenCalled();
  });

  it('validate setupFormValues onInit', () => {
    component.ngOnInit();

    component.form.get('monthYear')?.setValue(new Date(2001,1,1))
    component.resetCalendar();

    const formValue = component.form.get('monthYear')?.value;
    expect(formValue.getMonth()).toBe(new Date().getMonth());
    expect(formValue.getFullYear()).toBe(new Date().getFullYear());
  });
});
