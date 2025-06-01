import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TooltipComponent } from '../../../feedback/tooltip/tooltip.component';
import { CSOTooltipPositionEnum } from '../../../feedback/tooltip/enums/tooltip-position.enum';

@Component({
    selector: 'cso-input-file-attachment',
    templateUrl: './input-file-attachment.component.html',
    styleUrls: ['./input-file-attachment.component.scss'],
    imports: [TooltipComponent],
    standalone: true,
})
export class InputFileAttachmentComponent {

  @Input() file?: File = new File([], '');
  @Output() onRemove: EventEmitter<File> = new EventEmitter<File>();

  get CSOTooltipPositionEnum() {
    return CSOTooltipPositionEnum;
  }

  constructor() { }

  removeFile(event: any) {
    event.stopPropagation();
    this.onRemove.emit(this.file);
  }

}
