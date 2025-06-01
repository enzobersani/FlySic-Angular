import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [NgStyle, NgClass, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent implements OnInit {
  public     height              : number = 0;
  @Input    () form              : UntypedFormGroup = {} as UntypedFormGroup;
  @Input    () textareaId        : string = "";
  @Input    () name              : string = "";
  @Input    () placeholder       : string = "";
  @Input    () validators        : Validators = [];
  @Input    () maxlength         : number = 188;
  @Input    () minHeight         : number = 94;
  @Input    () invalid           : boolean = false;
  @Output   () focus             : EventEmitter<any> = new EventEmitter<any>();
  @Output   () focusout          : EventEmitter<any> = new EventEmitter<any>();
  @Output   () keyup             : EventEmitter<any> = new EventEmitter<any>();
  @Output   () resizeFunc        : EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('textarea') textarea: any;

  private _setFocus: boolean = false;
  @Input() set setFocus(value: boolean) {
    this._setFocus = value;
    setTimeout(() => this.textarea.nativeElement.focus(), 0);
  }
  get setFocus(): boolean {
    return this._setFocus;
  }

  constructor() { }

  ngOnInit(): void {
    this.form.addControl(this.name, new UntypedFormControl('', this.validators));
    let form = this.form.get(this.name);

    if(!form)
      return;

    form.valueChanges.subscribe(this.valueChangesSubscribe.bind(this));
  }

  valueChangesSubscribe(values: any) {
    this.invalid = this.fieldInvalid(this.name);
  }

  fieldInvalid(fieldName: string): boolean {
    var field = this.getField(fieldName);

    if (field)
      return this.checkIfFieldInvalid(field);
    return true;
  }

  getField(fieldName: string) {
    return this.form.get(fieldName);
  }

  checkIfFieldInvalid(field: AbstractControl): boolean {
    return field.invalid && (field.dirty || field.touched);
  }

  getDocument() {
    return document;
  }

  getHeight(element: any) {
    return element
      ? element.getBoundingClientRect().height
      :  0;
  }

  resizeEvent(event: any) {
    if (this.hasResizeFunc()) {
      if (this.heightIsZero()) {
        this.setHeightOfElement();
      }
      this.emitResizeFunc(event.height - this.height);
    }
  }

  setHeightOfElement() {
    let element = this.getDocument().getElementById(this.textareaId);
    var height  = this.getHeight(element);
    this.setHeight(height);
  }

  setHeight(height: number) {
    this.height = height;
  }

  heightIsZero(): boolean {
    return this.height == 0;
  }

  hasResizeFunc(): boolean {
    return this.resizeFunc != null && this.resizeFunc != undefined;
  }

  emitResizeFunc(value: number): void {
    this.resizeFunc.emit(value);
  }
}
