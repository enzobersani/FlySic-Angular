import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select-search.component.html',
  styleUrl: './select-search.component.scss'
})
export class SelectSearchComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() inputId: string = '';
  @Input() isReadOnly: boolean = true;
  @Output() searchChanges: EventEmitter<string> = new EventEmitter<string>();
  @Output() focusChanges: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() moreOptions: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup = new FormGroup({ search: new FormControl('') });
  @ViewChild('input') input: any;

  constructor() {}

  ngOnInit(): void {
    this.resetSearch();
    this.listening();
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      this.input.nativeElement.focus();
    }, 0);
  }

  resetSearch() {
    this.searchChanges.emit('');
  }

  listening() {
    this.getControl('search').valueChanges.subscribe(search => {
      this.searchChanges.emit(search);
    });
  }

  getControl(controlName: string) {
    return this.form.get(controlName)!;
  }
}
