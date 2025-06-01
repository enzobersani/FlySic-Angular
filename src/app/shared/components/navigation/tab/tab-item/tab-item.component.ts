import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabHeaderComponent } from './tab-header/tab-header.component';

@Component({
  selector: 'app-tab-item',
  standalone: true,
  imports: [],
  templateUrl: './tab-item.component.html',
  styleUrl: './tab-item.component.scss'
})
export class TabItemComponent implements OnInit{
  @Input() preventClick: boolean = false;
  @Input() header: string = '';
  @Input() identity: string = '';
  @Input() isActive: boolean = false;
  @ContentChild(TabBodyComponent) bodyComponent!: TabBodyComponent;
  @ContentChild(TabHeaderComponent) headerComponent!: TabHeaderComponent;

  constructor() {}

  ngOnInit() {}
}