import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss'
})
export class InputCheckboxComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() labelPrefix: string = '';
  @Input() linkText: string = '';
  @Input() onLinkClick?: (event: Event) => void;

  formControl: FormControl = new FormControl(false);

  ngOnInit(): void {
    this.form.addControl(this.name, this.formControl);
  }

  handleLinkClick(event: Event) {
    event.preventDefault();
    this.onLinkClick?.(event);
  }
}