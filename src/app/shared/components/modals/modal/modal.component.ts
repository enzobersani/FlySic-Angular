import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe, NgStyle],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  public isOpen: Subject<boolean> = new Subject<boolean>();
  public scrollPosition: number = 0;
  public isLargeScreen: boolean = window.innerWidth > 768;

  @Input() isHidden: boolean = false;
  @Input() clickableOutside: boolean = false;
  @Input() closeButton: boolean = false;
  @Input() width: string = '70%';
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private renderer: Renderer2) {
    this.close();
  }

  ngOnInit(): void {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'modal-generic-open');
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    this.isLargeScreen = window.innerWidth > 768;
  }

  open() {
    this.show();
  }

  button() {
    this.close();
  }

  backgroundClick(event: Event) {
    if (this.clickableOutside) {
      this.onCloseEvent();
    }
    event.stopPropagation();
  }

  modalClick(event: Event) {
    event.stopPropagation();
  }

  show() {
    this.scrollPosition = window.pageYOffset;
    this.renderer.addClass(document.body, 'modal-generic-open');
    this.isOpen.next(true);
  }

  public close() {
    this.renderer.removeClass(document.body, 'modal-generic-open');
    window.scrollTo(0, this.scrollPosition);
    this.isOpen.next(false);
  }

  protected onCloseEvent() {
    this.close();
    this.closeEvent.emit();
  }
}