import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegacyScrollDirective } from './legacy-scroll.directive';

@Component({
    selector: 'cso-calendar-main-double',
    template: '<div class="fixed-point-double-calendar" #fixedPoint></div><div csoCalendarMainLegacyScroll [fixedPoint]="fixedPoint"></div><div id="main-scroll"></div>',
    standalone: true
})
class CalendarMainDoubleComponentMock { ngOnInit(): void { } }

describe('LegacyScrollDirective', () => {
  let component: CalendarMainDoubleComponentMock;
  let fixture  : ComponentFixture<CalendarMainDoubleComponentMock>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
    imports: [CalendarMainDoubleComponentMock, LegacyScrollDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
}).createComponent(CalendarMainDoubleComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const newDiv               = document.createElement("div");
    let   elementRef           = new ElementRef(newDiv);
    const directive            = new LegacyScrollDirective(elementRef);
          directive.fixedPoint = document.createElement("div");
    expect(directive).toBeTruthy();
  });

  it('should listening legacy scroll', () => {

    // Arrange
    const newDiv     = document.createElement("div");
    let   elementRef = new ElementRef(newDiv);
    const directive  = new LegacyScrollDirective(elementRef);
    spyOn(directive, 'getDocument').and.callFake(() => {
      return {
        getElementById: (id: string) => {
          return {
            addEventListener: (event: string, callbackfunction: any) => {
              let eventCallback: any = {
                srcElement: { scrollTop: 10 }
              }
              callbackfunction(eventCallback);
            }
          }
        }
      } as Document
    });
    let fixScreen = spyOn(directive, 'fixScreen');

    // Act
    directive.legacyScroll();

    // Assert
    expect(fixScreen).toHaveBeenCalled();

  });

  describe('should fix screen', () => {

    it('', () => {

      // Arrange
      const newDiv               = document.createElement("div");
      let   elementRef           = new ElementRef(newDiv);
      const directive            = new LegacyScrollDirective(elementRef);
            directive.fixedPoint = document.createElement("div");
      spyOn(directive, 'getWindow').and.returnValue({ innerWidth: 2000 } as Window & typeof globalThis)

      // Act
      directive.fixScreen();

      // Assert
      expect(directive).toBeTruthy();

    });

    it('with value', () => {

      // Arrange
      const newDiv               = document.createElement("div");
      let   elementRef           = new ElementRef(newDiv);
      const directive            = new LegacyScrollDirective(elementRef);
            directive.fixedPoint = document.createElement("div");
      let   scrollValue: number  = 10;
      spyOn(directive, 'getWindow').and.returnValue({ innerWidth: 2000 } as Window & typeof globalThis)

      // Act
      directive.fixScreen(scrollValue);

      // Assert
      expect(directive).toBeTruthy();

    });

  });

  it('should resize', () => {

    // Arrange
    const newDiv               = document.createElement("div");
    let   elementRef           = new ElementRef(newDiv);
    const directive            = new LegacyScrollDirective(elementRef);
          directive.fixedPoint = document.createElement("div");
    let event;
    let fixScreen = spyOn(directive, 'fixScreen');

    // Act
    directive.onResize();

    // Assert
    expect(fixScreen).toHaveBeenCalled();

  });

  it('should get scroll', () => {

    // Arrange
    const newDiv               = document.createElement("div");
    let   elementRef           = new ElementRef(newDiv);
    const directive            = new LegacyScrollDirective(elementRef);
          directive.fixedPoint = document.createElement("div");
    let   fixScreen            = spyOn(directive, 'fixScreen');

    // Act
    directive.getScroll();

    // Assert
    expect(fixScreen).toHaveBeenCalled();

  });

  it('should get fix screen style left and top', () => {

    // Arrange
    const newDiv             = document.createElement("div");
    let   elementRef         = new ElementRef(newDiv);
    const directive          = new LegacyScrollDirective(elementRef);
    let   sum: number        = 1;
    let   marginTop: string  = '';
    let   screenSize: number = 1;
    spyOn(directive, 'IsToCorrectOnlyTop').and.returnValue(true);
    let fixLeftAndTop = spyOn(directive, 'fixLeftAndTop');

    // Act
    directive.getFixScreenStyle(sum, marginTop, screenSize);

    // Assert
    expect(fixLeftAndTop).toHaveBeenCalled();

  });

  it('should get fix screen style only top', () => {

    // Arrange
    const newDiv             = document.createElement("div");
    let   elementRef         = new ElementRef(newDiv);
    const directive          = new LegacyScrollDirective(elementRef);
    let   sum: number        = 1;
    let   marginTop: string  = '';
    let   screenSize: number = 1;
    spyOn(directive, 'IsToCorrectOnlyTop').and.returnValue(false);
    let fixTop = spyOn(directive, 'fixTop');

    // Act
    directive.getFixScreenStyle(sum, marginTop, screenSize);

    // Assert
    expect(fixTop).toHaveBeenCalled();

  });

  it('should fix left and top', () => {

    // Arrange
    const newDiv             = document.createElement("div");
    let   elementRef         = new ElementRef(newDiv);
    const directive          = new LegacyScrollDirective(elementRef);
    let   sum: number        = 1;
    let   marginTop: string  = '';
    let   screenSize: number = 1;

    // Act
    let result = directive.fixLeftAndTop(screenSize, sum, marginTop);

    // Assert
    expect(result.marginLeft).toEqual(screenSize - sum + 'px');
    expect(result.marginTop).toEqual(marginTop);

  });

});