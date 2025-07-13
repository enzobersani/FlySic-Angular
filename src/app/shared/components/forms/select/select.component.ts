import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { SelectItemModel } from './models/select-item.model';
import { SelectTextsModel } from './models/texts/select-texts.model';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { SelectOptionSelectedComponent } from "./select-option-selected/select-option-selected.component";
import { SelectSearchComponent } from "./select-search/select-search.component";
import { SelectSearchPipe } from "./pipe/select-search.pipe";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle, NgFor, SelectOptionSelectedComponent, SelectSearchComponent, SelectSearchPipe],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit{

  @Input() form!: FormGroup;
  @Input() items: SelectItemModel[] = [];
  @Input() name!: string;
  @Input() validators: ValidatorFn[] | null = null;
  @Input() limitItem: number = 0;
  @Input() texts?: SelectTextsModel;;
  @Input() allowInvalidFieldStyle: boolean = false;
  @Input() selectedItem?: SelectItemModel | null;
  @Input() isSearchable: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isLoading  : boolean = false;
  @Input() showTooltip: boolean = false;
  public isOpened: boolean = false;
  public search: string = '';

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() cleanEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.buildForm();
    this.resetOption();

    const defaultValue = this.form.get(this.name)?.value;
    if (defaultValue ?? false) {
      this.select(defaultValue)
    }
  }

  buildForm() {
    this.form.addControl(this.name, new FormControl(null, this.validators));
  }

  resetOption() {
    const value = this.form.get(this.name)?.value;
    if (value) {
      const item = this.getItemByKey(value);
      this.setSelectedItem(item);
    }
  
    this.form.get(this.name)?.valueChanges.subscribe(this.valueChanges.bind(this));
  }

  valueChanges(key: any) {
    var item = this.getItemByKey(key);
    this.setSelectedItem(item);

    this.valueChange.emit(item ? item.key : null)
  }

  getItemByKey(key: any) {
    return this.getItems().find(x => x.key == key) ?? null;
  }

  getItems() {
    return this.items;
  }

  toggle() {
    if (!this.isDisabled)
      this.isOpened = !this.isOpened;
  }

  close() {
    this.isOpened = false;
  }

  select(item: SelectItemModel) {
    this.setFormValue(item);
    this.setSelectedItem(item);
    this.close();
  }

  setFormValue(item: SelectItemModel) {
    var obj = {} as any;
    obj[this.name] = item.key;
  
    const current = this.form.get(this.name)?.value;
    if (current !== item.key) {
      this.form.patchValue(obj);
    }
  
    this.setSelectedItem(item);
  }

  setSelectedItem(item: SelectItemModel | null) {
    this.selectedItem = item;
  }

  removeItem(event: MouseEvent) {
    event.stopPropagation();
    this.form.get(this.name)?.reset();
    this.setSelectedItem(null);
    this.cleanEvent.emit();
  }

  searchChanges(search: string) {
    this.search = search;
    this.searchEvent.emit(search);
  }

  handleClass() {
    const isSelected = this.isOpened || this.selectedItem ? 'select__selected-option--selected ' : '';
    const isDisabled = this.isDisabled
      ? 'select__selected-option--disabled ' : '';
    const isInvalid = this.allowInvalidFieldStyle && (this.form.get(this.name)?.invalid ?? false)
      ? 'select__selected-option--invalid' : '';

    return isSelected + isDisabled + isInvalid;
  }
}
