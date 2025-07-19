import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ToggleDirective } from '../directives/toggle/toggle.directive';
import { ToggleService } from '../directives/toggle/toggle.service';
import { RangeDate } from '../model/range-date.model';
import { CalendarMonthYearTextsService } from '../services/texts.service';
import { IdService } from './../services/id.service';
import { CalendarSelectedDateComponent } from './calendar-selected-date.component';
import { CalendarTextServiceMock } from '../../../../_mocks/service/base-calendar-texts.service.mock';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';

class ToggleServiceMock {
  toggle() {}
  open() {}
  close() {}
  sendEvent() {}
  listener() {
    return new BehaviorSubject(false);
  }
}

class IdServiceMock {
  get() {
    return '1234';
  }
}

describe('CalendarSelectedDateComponent', () => {
  let component: CalendarSelectedDateComponent;
  let fixture: ComponentFixture<CalendarSelectedDateComponent>;
  const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

  var mockStore = jasmine.createSpyObj(['select', 'dispatch']);
  mockStore.select.and.returnValue(of());

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarSelectedDateComponent, ToggleDirective],
      providers: [
        {
          provide: IdService,
          useClass: IdServiceMock,
        },
        {
          provide: CalendarMonthYearTextsService,
          useValue: textsServiceMock,
        },
        {
          provide: ToggleService,
          useClass: ToggleServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSelectedDateComponent);
    component = fixture.componentInstance;
    textsServiceMock.asyncTexts = of(TEXTS_MODEL_MOCK);
    textsServiceMock.getAsyncTexts();
    textsServiceMock.getText();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('fillMonthsToShow should populate only one month foward and backwards with number', () => {
    component.backwardLimit = 1;
    component.fowardLimit = 1;
    component.currentDate = new Date(2023, 9, 5);

    fixture.detectChanges();

    expect(component.datesToShow.length).toBe(3);
    component.datesToShow.forEach((date,i) => {
        const toBeDate = new Date(2023, 8 + i, 5);
        expect(date.getDate()).toBe(toBeDate.getDate());
        expect(date.getMonth()).toBe(toBeDate.getMonth());
        expect(date.getFullYear()).toBe(toBeDate.getFullYear());
    })
  });

  it('fillMonthsToShow should populate only one month foward and backwards with date', () => {
    component.backwardLimit = new Date(2023, 7, 5);
    component.fowardLimit = new Date(2023, 10, 5);;
    component.currentDate = new Date(2023, 9, 5);

    fixture.detectChanges();

    expect(component.datesToShow.length).toBe(3);
    component.datesToShow.forEach((date,i) => {
        const toBeDate = new Date(2023, 8 + i, 5);
        expect(date.getDate()).toBe(toBeDate.getDate());
        expect(date.getMonth()).toBe(toBeDate.getMonth());
        expect(date.getFullYear()).toBe(toBeDate.getFullYear());
    })
  });

  it('should go to next month if there is no limit', () => {
    component.currentDate = new Date(2000,5,1);

    component.nextDate();

    expect(component.currentDate.getMonth()).toBe(6);
  })

  it('should not go to next month if date is higher than limit', () => {
    component.currentDate = new Date(2000,5,1);
    component.limit = RangeDate.createCompleteInstace(null, new Date(2000, 5, 1))

    component.nextDate();

    expect(component.currentDate.getMonth()).toBe(5);
  })

  it('should go to previous month if there is no limit', () => {
    component.currentDate = new Date(2000,5,1);

    component.previousDate();

    expect(component.currentDate.getMonth()).toBe(4);
  })

  it('should not go to previous month if date smaller than limit', () => {
    component.currentDate = new Date(2000,5,1);
    component.limit = RangeDate.createCompleteInstace(new Date(2000, 5, 1), null)

    component.previousDate();

    expect(component.currentDate.getMonth()).toBe(5);
  })

  it('formatDate should get month/year', () =>{
    spyOn(component['textService'], 'getMonthByNumber').and.returnValue('June')
    const monthYear = component.formatDate(5, 2000);
    expect(monthYear).toBe('June | 2000')
  })

  it('should call fillMonthsToShow when value changes', () => {
    fixture.detectChanges();

    const toBeDate = new Date(2020, 6, 1);
    component.currentDate = toBeDate;

    const change = {
      currentDate: new SimpleChange(null, toBeDate, false)
    }

    component.ngOnChanges(change);

    expect(component.datesToShow.length).toBe(1);
    expect(component.datesToShow[0].getDate()).toBe(toBeDate.getDate());
    expect(component.datesToShow[0].getMonth()).toBe(toBeDate.getMonth());
    expect(component.datesToShow[0].getFullYear()).toBe(toBeDate.getFullYear());
  })
});
