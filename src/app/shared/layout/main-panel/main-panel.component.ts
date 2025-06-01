import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainPanelArrowComponent } from "./main-panel-arrow/main-panel-arrow.component";
import { MainPanelService } from './services/main-panel.service';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [NgClass, MainPanelArrowComponent, AsyncPipe, NgIf],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss'
})
export class MainPanelComponent implements OnInit, AfterViewInit {
  @Input() icon: string = "";
  @Input() disableIcon: string = "";
  @Input() leftText: string = "";
  @Input() percentLeftSize: number = 50;
  @Input() showFullText: boolean = false;
  @Input() isBlocked: boolean = false;
  @Input() isDisable: boolean = false;
  @Input() isAccordion: boolean = false;
  @Input() tolltipUpArrowText: string = "";
  @Input() tolltipDownArrowText: string = "";
  @Input() set isOpen(value: boolean) {
    this._isOpen = value;
    this.listenerOpenClose.emit(value);
  }

  get isOpen(): boolean {
    return this._isOpen;
  }
  @Input() description: string = "";
  @Output() listenerOpenClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isOpen: boolean = false;

  constructor(
    public accordionService: MainPanelService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.isAccordion) this.accordionService.loadCurrentHeightAndChangePanelBodyStyle(this.isOpen && !this.isBlocked);
    this.changeDetectorRef.detectChanges();
  }

  toggleAccordion() {
    this.isOpen = !this.isOpen;
    this.listenerOpenClose.emit(this.isOpen);
  }

  toggleAccordionAndChangePanelBodyStyle() {
    this.toggleAccordion();
    this.changePanelBodyStyle();
  }

  changePanelBodyStyle() {
    if (this.isAccordion) this.accordionService.changePanelBodyStyle(this.isOpen && !this.isBlocked);
  }

  backgroundTopClickEvent(event: any) {
    if (!this.isAccordion) return;
    var className = (event.target as Element).className;
    if (className.includes('panel-background')) this.toggleAccordionAndChangePanelBodyStyle();
  }

  arrowUpClickEvent() {
    this.isOpen = false;
    this.listenerOpenClose.emit(false);
    this.changePanelBodyStyle();
  }

  arrowDownClickEvent() {
    this.isOpen = true;
    this.listenerOpenClose.emit(true);
    this.changePanelBodyStyle();
  }

  getLeftSize(percent: number) {
    return this.getStyleSizeByPercent(percent);
  }

  getRightSize(percent: number) {
    return this.getStyleSizeByPercent(100 - percent, 26);
  }

  getStyleSizeByPercent(percent: number, freeSpacePx: number = 0) {
    return {
      'flex': '0 0 calc(' + percent + '% - ' + freeSpacePx + 'px)',
      'maxWidth': 'calc(' + percent + '% - ' + freeSpacePx + 'px)'
    };
  }
}