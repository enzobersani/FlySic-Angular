import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule], // Ensure ReactiveFormsModule is imported correctly in the parent module
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'] // Corrected typo from styleUrl to styleUrls
})
export class InputNumberComponent implements OnInit {

  @ViewChild('input') input: any;
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() validators: Validators = [];
  @Input() inputId: string = '';
  @Input() invalid: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() maxlength: number = 2000;
  @Input() isDisabled: boolean = false;
  @Input() min: number = 0;
  @Input() max: number = 100;
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

  ngOnInit(): void {
    this.form.addControl(this.name, new UntypedFormControl('', this.validators));
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

  applyDecimalLimit(event: any): void {
    const value = event.target.value;
    if (value.includes('.')) {
      const [integer, decimals] = value.split('.');
      if (decimals.length > 2) {
        event.target.value = `${integer}.${decimals.substring(0, 2)}`;
      }
    }
  }
  
}