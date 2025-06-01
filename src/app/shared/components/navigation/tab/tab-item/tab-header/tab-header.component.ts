import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-header',
  standalone: true,
  imports: [],
  templateUrl: './tab-header.component.html',
  styleUrl: './tab-header.component.scss'
})
export class TabHeaderComponent implements OnInit{
  @ViewChild(TemplateRef) headerContent!: TemplateRef<any>;
  @Input() headerQuantity: number | null = null;
  @Input() headerSupLabel: string | null = null;

  constructor() { }

  ngOnInit() { }
}
