import { Component, Input } from '@angular/core';
import { CSOTooltipPositionEnum } from './enums/tooltip-position.enum';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {

  @Input() text: string = '';
  @Input() position: CSOTooltipPositionEnum = CSOTooltipPositionEnum.TOP_CENTER;

  public isEmptyText = true;

  ngOnInit() {
    this.filterText();
  }

  ngOnChanges() {
    this.filterText();
  }
  
  filterText() {
    this.isEmptyText = this.text.length <= 0
    this.text = this.text.length > 160 ? this.text.substring(0, 160) : this.text;
  }
}
