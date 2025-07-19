import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

@Directive({
    selector: '[csoCalendarMainLegacyScroll]',
    standalone: true
})
export class LegacyScrollDirective implements OnInit {

  @HostBinding('style') fixScreenStyle: SafeStyle = {};
  @Input      () fixedPoint           : any;
  private      _spaceTop              : number = 8;
  private      _scrollSize            : number = 20;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.fixScreen();
    this.legacyScroll();
  }

  legacyScroll() {
    let scroll = this.getDocument().getElementById('main-scroll');
    scroll?.addEventListener('scroll', (event: any) => {
      const scrollValue = event.srcElement.scrollTop;
      this.fixScreen(scrollValue);
    });
  }

  getDocument() {
    return document;
  }

  getWindow() {
    return window;
  }

  fixScreen(scrollValue?: number) {
    let sum                 = this.getSum();
    let marginTop           = this.getMarginTop(scrollValue);
    let screenSize          = this.getWindow().innerWidth;
        this.fixScreenStyle = this.getFixScreenStyle(sum, marginTop, screenSize);
  }

  getFixScreenStyle(sum: number, marginTop: string, screenSize: number) {
    return this.IsToCorrectOnlyTop(screenSize, sum)
      ? this.fixLeftAndTop(screenSize, sum, marginTop)
      :  this.fixTop(marginTop);
  }

  IsToCorrectOnlyTop(screenSize: number, sum: number) {
    return sum > screenSize;
  }

  fixLeftAndTop(screenSize: number, sum: number, marginTop: string) {
    return { marginLeft: screenSize - sum + 'px', marginTop: marginTop };
  }

  fixTop(marginTop: string) {
    return { marginTop: marginTop };
  }

  getMarginTop(scrollValue?: number) {
    let scrollYPosition = this.getScrollYPosition(scrollValue);
    return this._spaceTop + scrollYPosition * -1 + 'px';
  }

  getScrollYPosition(scrollValue?: number) {
    return scrollValue ? scrollValue: this.getWindow().pageYOffset;
  }

  getSum() {
    let elementWith  = this.getElementWith();
    let leftPosition = this.getLeftPosition();
    return Math.floor(Number(this._scrollSize) + Number(elementWith) + Number(leftPosition));
  }

  getElementWith() {
    let doubleCalendarRect = this.elementRef.nativeElement.getBoundingClientRect();
    return doubleCalendarRect.width;
  }

  getLeftPosition() {
    let fixedPointRect = this.fixedPoint.getBoundingClientRect();
    return fixedPointRect.left;
  }

  @HostListener('window:scroll', ['$event'])
  getScroll() {
    this.fixScreen();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.fixScreen();
  }

}
