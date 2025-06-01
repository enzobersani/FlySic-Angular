import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-coin',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input-coin.component.html',
  styleUrls: ['./input-coin.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCoinComponent),
      multi: true
    }
  ]
})
export class InputCoinComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input') input: any;
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() validators: any[] = [];
  @Input() icon: string = '';
  @Input() iconFocus: string = '';
  @Input() inputId: string = '';
  @Input() invalid: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() mask: string = '';
  @Input() maxlength: number = 2000;
  @Input() isDisabled: boolean = false;
  @Input() type: string = 'text';
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();
  @Output() keyup: EventEmitter<any> = new EventEmitter<any>();
  @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
  @Output() focusout: EventEmitter<any> = new EventEmitter<any>();
  @Output() paste: EventEmitter<any> = new EventEmitter<any>();

  private _setFocus: boolean = false;

  @Input() set setFocus(value: boolean) {
    this._setFocus = value;
    setTimeout(() => {
      if (!this.isDisabled) this.input.nativeElement.focus();
    }, 0);
  }

  get setFocus(): boolean {
    return this._setFocus;
  }

  private _value: string = '';

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange: (value: any) => void = () => {};

  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.form.addControl(this.name, new UntypedFormControl(this._value, this.validators));
    const nameControl = this.form.get(this.name);
    if (nameControl) {
      nameControl.valueChanges.subscribe(this.valueChangesSubscribe.bind(this));
    }
  }

  valueChangesSubscribe(values: any) {
    this.invalid = this.fieldInvalid(this.name);
  }

  fieldInvalid(fieldName: string): boolean {
    const field = this.getField(fieldName);
    if (field) return this.checkIfFieldInvalid(field);
    return true;
  }

  getField(fieldName: string) {
    return this.form.get(fieldName);
  }

  checkIfFieldInvalid(field: AbstractControl): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  getErros(): ValidationErrors | null {
    const field = this.getField(this.name);
    return field?.errors ?? null;
  }

  applyMask(event: any): void {
    let value = event.target.value;

    value = value.replace(/[^0-9,]/g, '');

    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts[1];
    }

    if (parts.length === 2) {
      parts[1] = parts[1].substring(0, 2);
      value = parts.join(',');
    }

    event.target.value = value;
    this._value = value;
    this.onChange(value);
    this.form.get(this.name)?.setValue(value, { emitEvent: false });
  }
}
