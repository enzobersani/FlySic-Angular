import { Component, Input } from '@angular/core';
import { CSOProgressBarThemeEnum } from './enum/progress-bar-theme.enum';
import { CSOTooltipPositionEnum } from '../../feedback/tooltip/enums/tooltip-position.enum';
import { NgClass } from '@angular/common';
import { TooltipComponent } from '../../feedback/tooltip/tooltip.component';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [NgClass, TooltipComponent],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() cultureCode: string = 'pt-BR';
  @Input() percentage: number = 0;
  @Input() theme: CSOProgressBarThemeEnum = CSOProgressBarThemeEnum.PRIMARY;
  
  public width: number = 0;
  public style: string = '';
  public value: string = '';
  public tooltipPosition: CSOTooltipPositionEnum = CSOTooltipPositionEnum.BOTTOM_CENTER;

  constructor() { }

  ngOnInit() {
    this.handlePercentage();
    this.handleTooltipPosition();
  }

  ngOnChanges() {
    this.handlePercentage();
    this.handleTooltipPosition();
  }

  handleTooltipPosition() {
    const isMinor = this.percentage <= 25;
    const isMajor = this.percentage >= 75;
    const isNegative = this.percentage < 0;
    const isOverflow = this.percentage > 100;

    const percentageFix = isNegative ? 0 : (isOverflow ? 100 : this.percentage);
    this.width = percentageFix;

    if (isMinor) {
      this.tooltipPosition = CSOTooltipPositionEnum.BOTTOM_LEFT;
      this.style = `left: ${percentageFix}%;`;
      return;
    }

    if (isMajor) {
      this.tooltipPosition = CSOTooltipPositionEnum.BOTTOM_RIGHT;
      this.style = `right: ${100 - percentageFix}%;`;
      return;
    }

    this.tooltipPosition = CSOTooltipPositionEnum.BOTTOM_CENTER;
    this.style = `left: ${percentageFix}%;`;
  }

  handlePercentage() {
    this.value = this.percentage.toLocaleString(this.cultureCode, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
}
