import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarSingleLegacyScrollDirective } from './legacy-scroll.directive';

@Component({
  selector: 'cso-calendar-single-content',
  template: '<div class="fixed-point-double-calendar" #fixedPoint></div><div CalendarSingleLegacyScroll [fixedPoint]="fixedPoint"></div><div id="main-scroll"></div>'
})
class CalendarMainDoubleComponentMock { ngOnInit(): void { } }

xdescribe('CalendarSingleLegacyScrollDirective', () => {
  let component: CalendarMainDoubleComponentMock;
  let fixture  : ComponentFixture<CalendarMainDoubleComponentMock>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CalendarMainDoubleComponentMock],
      schemas     : [CUSTOM_ELEMENTS_SCHEMA]
    }).createComponent(CalendarMainDoubleComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const newDiv               = document.createElement("div");
    var   elementRef           = new ElementRef(newDiv);
    const directive            = new CalendarSingleLegacyScrollDirective(elementRef);
          directive.fixedPoint = document.createElement("div");
    expect(directive).toBeTruthy();
  });

  it('should listening legacy scroll', () => {

    // Arrange
    const newDiv     = document.createElement("div");
    var   elementRef = new ElementRef(newDiv);
    const directive  = new CalendarSingleLegacyScrollDirective(elementRef);
    spyOn(directive, 'getDocument').and.callFake(() => {
      return {
        getElementById: (id: string) => {
          return {
            addEventListener: (event: string, callbackfunction: any) => {
              var eventCallback: any = {
                srcElement: { scrollTop: 10 }
              }
              callbackfunction(eventCallback);
            }
          }
        }
      } as Document
    });
    var fixScreen = spyOn(directive, 'fixScreen');

    // Act
    directive.legacyScroll();

    // Assert
    expect(fixScreen).toHaveBeenCalled();

  });

  describe('should fix screen', () => {

    it('', () => {

      // Arrange
      const newDiv               = document.createElement("div");
      var   elementRef           = new ElementRef(newDiv);
      const directive            = new CalendarSingleLegacyScrollDirective(elementRef);
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
      var   elementRef           = new ElementRef(newDiv);
      const directive            = new CalendarSingleLegacyScrollDirective(elementRef);
            directive.fixedPoint = document.createElement("div");
      var   scrollValue: number  = 10;
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
    var   elementRef           = new ElementRef(newDiv);
    const directive            = new CalendarSingleLegacyScrollDirective(elementRef);
          directive.fixedPoint = document.createElement("div");
    var event;
    var fixScreen = spyOn(directive, 'fixScreen');

    // Act
    directive.onResize();

    // Assert
    expect(fixScreen).toHaveBeenCalled();

  });

  it('should get scroll', () => {

    // Arrange
    const newDiv               = document.createElement("div");
    var   elementRef           = new ElementRef(newDiv);
    const directive            = new CalendarSingleLegacyScrollDirective(elementRef);
          directive.fixedPoint = document.createElement("div");
    var   fixScreen            = spyOn(directive, 'fixScreen');

    // Act
    directive.getScroll();

    // Assert
    expect(fixScreen).toHaveBeenCalled();

  });

  it('should get fix screen style left and top', () => {

    // Arrange
    const newDiv             = document.createElement("div");
    var   elementRef         = new ElementRef(newDiv);
    const directive          = new CalendarSingleLegacyScrollDirective(elementRef);
    var   sum: number        = 1;
    var   marginTop: string  = '';
    var   screenSize: number = 1;
    spyOn(directive, 'IsToCorrectOnlyTop').and.returnValue(true);
    var fixLeftAndTop = spyOn(directive, 'fixLeftAndTop');

    // Act
    directive.getFixScreenStyle(sum, marginTop, screenSize);

    // Assert
    expect(fixLeftAndTop).toHaveBeenCalled();

  });

  it('should get fix screen style only top', () => {

    // Arrange
    const newDiv             = document.createElement("div");
    var   elementRef         = new ElementRef(newDiv);
    const directive          = new CalendarSingleLegacyScrollDirective(elementRef);
    var   sum: number        = 1;
    var   marginTop: string  = '';
    var   screenSize: number = 1;
    spyOn(directive, 'IsToCorrectOnlyTop').and.returnValue(false);
    var fixTop = spyOn(directive, 'fixTop');

    // Act
    directive.getFixScreenStyle(sum, marginTop, screenSize);

    // Assert
    expect(fixTop).toHaveBeenCalled();

  });

  it('should fix left and top', () => {

    // Arrange
    const newDiv             = document.createElement("div");
    var   elementRef         = new ElementRef(newDiv);
    const directive          = new CalendarSingleLegacyScrollDirective(elementRef);
    var   sum: number        = 1;
    var   marginTop: string  = '';
    var   screenSize: number = 1;

    // Act
    var result = directive.fixLeftAndTop(screenSize, sum, marginTop);

    // Assert
    expect(result.marginLeft).toEqual(screenSize - sum + 'px');
    expect(result.marginTop).toEqual(marginTop);

  });

});
