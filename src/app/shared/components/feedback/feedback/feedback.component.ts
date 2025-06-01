import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonPrimaryComponent } from "../../forms/buttons/button-primary/button-primary.component";
import { NgClass, NgIf } from '@angular/common';
import { FeedbackTypeEnum } from './enums/feedback-type.enum';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [ButtonPrimaryComponent, NgClass, NgIf],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

  @Input() type: FeedbackTypeEnum = FeedbackTypeEnum.WARNING;
  @Input() hasAction: boolean = false;
  @Input() actionLabel: string = '';
  @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();

  FeedbackTypeEnum = FeedbackTypeEnum;

  handleClick() {
    this.clickEvent.emit();
  }
}
