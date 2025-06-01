import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ButtonGroupInput } from './model/button-group-input.model';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-button-group',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss'
})
export class ButtonGroupComponent implements OnInit, OnChanges{

  @Input () items: ButtonGroupInput[] = [];
  @Input() activeKey: string = '';
  @Output() itemClick = new EventEmitter<ButtonGroupInput>();


  public showPipe : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.showPipe = this.items?.length >= 3
    this.updateActiveItem();
  }

  ngOnChanges() {
    this.showPipe = this.items?.length >= 3
    this.updateActiveItem();
  }

  onItemClick(item: ButtonGroupInput): void {
      this.items.forEach((x) => {
        if(x.key === item.key) x.activated = true;
        else x.activated = false;
      });
    this.itemClick.emit(item);
  }

  private updateActiveItem(): void {
    if (this.activeKey) {
      this.items.forEach((x) => {
        x.activated = x.key === this.activeKey;
      });
    }
  }
}
