import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']  // Corrigido para styleUrls
})
export class InputTextComponent implements OnInit {
  @ViewChild('input') input: any;
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() validators: Validators = [];
  @Input() icon: string = '';
  @Input() iconFocus: string = '';
  @Input() inputId: string = '';
  @Input() invalid: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() mask: string = '';
  @Input() maxlength: number = 2000;
  @Input() isDisabled: boolean = false;
  @Input() type: string = 'text';
  @Input() returnUnmaskedValue: boolean = false; // Define se deve retornar o valor sem máscara

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
      nameControl.valueChanges.subscribe((value: string) => {
        if (this.returnUnmaskedValue && this.mask) {
          // Remove a máscara e atualiza o valor no formulário
          const cleanValue = this.removeMask(value, this.mask);
          nameControl.setValue(cleanValue, { emitEvent: false });
        }
        this.invalid = this.fieldInvalid(this.name);
      });
    }
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
    if (this.type === "number") return;
    let value = event.target.value;
    if (this.mask) {
      value = this.applyCustomMask(value, this.mask);
    }
    event.target.value = value;
  }

  applyCustomMask(value: string, mask: string): string {
    const cleanedValue = value.replace(/\D/g, '');
    let formattedValue = '';
    let maskIndex = 0;

    for (let i = 0; i < cleanedValue.length; i++) {
      if (maskIndex < mask.length) {
        if (mask[maskIndex] === '0') {
          formattedValue += cleanedValue[i];
        } else {
          formattedValue += mask[maskIndex];
          i--;
        }
        maskIndex++;
      }
    }
    return formattedValue;
  }

  removeMask(value: string, mask: string): string {
    return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  }
}
