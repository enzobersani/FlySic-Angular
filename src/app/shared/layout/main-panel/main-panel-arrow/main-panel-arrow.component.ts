import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-panel-arrow',
  standalone: true,
  imports: [NgClass],
  templateUrl: './main-panel-arrow.component.html',
  styleUrl: './main-panel-arrow.component.scss'
})
export class MainPanelArrowComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() isDisable: boolean = false;
  @Input() isBlocked: boolean = false;
  @Input() tolltipUpArrowText: string = "";
  @Input() tolltipDownArrowText: string = "";
  @Output() arrowUpClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() arrowDownClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  getImageSrc(isBlocked: boolean, isDisable: boolean) {
    return isBlocked || isDisable
      ? 'assets/images/common/arrow-down-disable.svg'
      : 'assets/images/common/arrow-down.svg';
  }
}