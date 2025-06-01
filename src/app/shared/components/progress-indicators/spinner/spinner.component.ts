import { Component, Input } from '@angular/core';
import { SpinnerColorEnum } from './enums/spinner-color.enum';
import { SpinnerSizeEnum } from './enums/spinner-size.enum';
import { SpinnerThemeEnum } from './enums/spinner-theme.enum';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgClass],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() theme: SpinnerThemeEnum = SpinnerThemeEnum.LIGHT;
  @Input() color: SpinnerColorEnum = SpinnerColorEnum.PRIMARY;
  @Input() size: SpinnerSizeEnum = SpinnerSizeEnum.MEDIUM;
}
