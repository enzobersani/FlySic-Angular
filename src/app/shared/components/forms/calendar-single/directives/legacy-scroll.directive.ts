import { Directive, ElementRef, HostListener, HostBinding, OnInit, Input } from '@angular/core';
import { SafeStyle }                                                       from '@angular/platform-browser';

@Directive({
  selector: '[CalendarSingleLegacyScroll]',
  standalone: true,
})
export class CalendarSingleLegacyScrollDirective implements OnInit {

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
    var scroll = this.getDocument().getElementById('main-scroll');
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
    var sum                 = this.getSum();
    var marginTop           = this.getMarginTop(scrollValue);
    var screenSize          = this.getWindow().innerWidth;
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
    var scrollYPosition = this.getScrollYPosition(scrollValue);
    return this._spaceTop + scrollYPosition * -1 + 'px';
  }

  getScrollYPosition(scrollValue?: number) {
    return scrollValue ? scrollValue: this.getWindow().pageYOffset;
  }

  getSum() {
    var elementWith  = this.getElementWith();
    var leftPosition = this.getLeftPosition();
    return Math.floor(Number(this._scrollSize) + Number(elementWith) + Number(leftPosition));
  }

  getElementWith() {
    var doubleCalendarRect = this.elementRef.nativeElement.getBoundingClientRect();
    return doubleCalendarRect.width;
  }

  getLeftPosition() {
    var fixedPointRect = this.fixedPoint.getBoundingClientRect();
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
