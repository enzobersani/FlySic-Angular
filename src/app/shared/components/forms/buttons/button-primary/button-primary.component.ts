import { Component } from '@angular/core';
import { BaseButtonComponent } from '../base/base-button.component';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [NgIf, NgStyle],
  templateUrl: './button-primary.component.html',
  styleUrls: ['./../base/base-button.component.scss','./button-primary.component.scss']
})
export class ButtonPrimaryComponent extends BaseButtonComponent {}