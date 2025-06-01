import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CSOTooltipPositionEnum } from '../../../feedback/tooltip/enums/tooltip-position.enum';
import { TooltipComponent } from "../../../feedback/tooltip/tooltip.component";
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-select-option-selected',
  standalone: true,
  imports: [TooltipComponent, NgClass, NgIf],
  templateUrl: './select-option-selected.component.html',
  styleUrl: './select-option-selected.component.scss'
})
export class SelectOptionSelectedComponent implements OnInit {
  @Output() removeEvent = new EventEmitter<MouseEvent>();
  @Input() label: string = '';
  @Input() isDisabled: boolean = false;
  @Input() tooltipPosition: CSOTooltipPositionEnum = CSOTooltipPositionEnum.TOP_LEFT;
  @Input() showTooltip: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  removeItem(event: MouseEvent) {
    if (!this.isDisabled)
      this.removeEvent.emit(event);
  }
}
