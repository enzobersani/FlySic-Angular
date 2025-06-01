import { Component } from '@angular/core';
import { BaseButtonComponent } from '../base/base-button.component';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-button-secondary',
  standalone: true,
  imports: [NgIf, NgStyle],
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./../base/base-button.component.scss', './button-secondary.component.scss']
})
export class ButtonSecondaryComponent extends BaseButtonComponent{}
