import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CalendarScrollService } from './base-calendar-scroll.service';

describe('CalendarScrollService', () => {
  let service: CalendarScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarScrollService]
    });
    service = TestBed.inject(CalendarScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get window', () => {

    // Arrange


    // Act
    let windowReturn = service.getWindow();

    // Assert
    expect(window).toEqual(windowReturn);

  });

  [
    {
      event: {
        target: {
          getAttribute: (className: string) => {
            return ['calendar-background-clickout']
          }
        }
      },
      called: true
    },
    {
      event: {
        target: {
          getAttribute: undefined
        }
      },
      called: false
    },
    {
      event: {
        target: {
          getAttribute: (className: string) => {
            return false
          }
        }
      },
      called: false
    },
    {
      event: {
        target: {
          getAttribute: (className: string) => {
            return ['outra-class']
          }
        }
      },
      called: false
    }
  ].forEach(element => {

    it('should fix legacy scroll', () => {

      let event = element.event;

      let windowMock = {
        addEventListener: (type: string, listener: any, options?: boolean | AddEventListenerOptions) => {
          listener(event);
        }
      } as Window & typeof globalThis;

      // Arrange
      spyOn(service, 'getWindow').and.returnValue(windowMock);
      let scroll = spyOn(service, 'scroll');

      // Act
      service.legacyScroll();

      // Assert
      if (element.called) {
        expect(scroll).toHaveBeenCalled();
      } else {
        expect(scroll).not.toHaveBeenCalled();
      }

    });

  });

  it('should remove whell scroll', () => {

    // Arrange
    let windowMock = {
      removeEventListener: (type: string, listener: any, options?: boolean | AddEventListenerOptions) => { }
    } as Window & typeof globalThis;
    let getWindow = spyOn(service, 'getWindow').and.returnValue(windowMock);

    // Act
    service.onDestroy();

    // Assert
    expect(getWindow).toHaveBeenCalled();

  });

  it('should scroll', fakeAsync(() => {

    // Arrange

    // Act
    service.scroll();
    tick(301);

    // Assert
    expect(service.scrolling).toBeFalsy();

  }));

});
