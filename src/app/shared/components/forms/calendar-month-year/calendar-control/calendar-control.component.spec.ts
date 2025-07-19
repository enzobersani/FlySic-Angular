import { CalendarYearComponent } from './calendar-year/calendar-year.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CalendarControlComponent } from './calendar-control.component';
import { StatusEnum } from './enum/status.enum';
import { CalendarMonthYearTextsService } from '../services/texts.service';
import { of } from 'rxjs';
import { CalendarTextServiceMock } from '../../../../_mocks/service/base-calendar-texts.service.mock';
import { TEXTS_MODEL_MOCK } from '../../../../_mocks/data/base-calendar-texts.data.mock';


describe('CalendarControlComponent', () => {

    let component: CalendarControlComponent;
    let fixture: ComponentFixture<CalendarControlComponent>;
    const textsServiceMock: CalendarTextServiceMock = new CalendarTextServiceMock();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                CalendarControlComponent,
                CalendarYearComponent,
                CalendarMonthComponent
            ],
            providers: [
                {
                    provide: CalendarMonthYearTextsService,
                    useValue: textsServiceMock
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CalendarControlComponent);
        component = fixture.componentInstance;
        textsServiceMock.asyncTexts = of(TEXTS_MODEL_MOCK);
        textsServiceMock.getAsyncTexts()
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('should change status', () => {

        it('month', () => {

            // Arrange

            // Act
            component.month();

            // Assert
            expect(component.status).toEqual(StatusEnum.MonthText);
        });

        it('year', () => {

            // Arrange

            // Act
            component.year();

            // Assert
            expect(component.status).toEqual(StatusEnum.Year);
        });

    });

    it('should call prev', () => {
        // Arrange
        component.status = StatusEnum.Year;
        let original = component.pagesYear;

        // Act
        component.prev();

        // Assert
        expect(component.pagesYear).toEqual(original - 1);
    });

    it('should not call prev', () => {
        // Arrange
        component.status = StatusEnum.MonthText;
        var original = component.pagesYear;

        // Act
        component.prev();

        // Assert
        expect(component.pagesYear).toEqual(original);
    });

    it('should call next', () => {
        // Arrange
        component.status = StatusEnum.Year;
        let original = component.pagesYear;

        // Act
        component.next();

        // Assert
        expect(component.pagesYear).toEqual(original + 1);
    });

    it('should not call next', () => {
        // Arrange
        component.status = StatusEnum.MonthText;
        var original = component.pagesYear;

        // Act
        component.next();

        // Assert
        expect(component.pagesYear).toEqual(original);
    });

    it('should prev year', () => {
        // Arrange
        var original = component.pagesYear;

        // Act
        component.prevYear();

        // Assert
        expect(component.pagesYear).toEqual(original - 1);
    });

    it('should next year', () => {
        // Arrange
        var original = component.pagesYear;

        // Act
        component.nextYear();

        // Assert
        expect(component.pagesYear).toEqual(original + 1);
    });

    it('should start close month or year calendar in change date event', fakeAsync(() => {

        // Arrange
        var closeMonthOrYearCalendar = spyOn(component, 'closeMonthOrYearCalendar');
        var today = new Date();
        component.changeDate.emit(today);
        tick();

        // Act
        component.ngOnInit();
        tick();

        // Assert
        expect(closeMonthOrYearCalendar).toHaveBeenCalled();

    }));

    it('should close month or year calendar in change date event', () => {

        // Arrange
        component.status = StatusEnum.Year;

        // Act
        component.closeMonthOrYearCalendar();

        // Assert
        expect(StatusEnum.MonthText).toEqual(component.status);

    });

    it('should set selected date', () => {

        // Arrange
        var today = new Date();

        // Act
        component.selectedDate = today;

        // Assert
        expect(today).toEqual(component.selectedDate);

    });

    it('should set null selected date', () => {

        // Arrange
        var today = null;

        // Act
        component.selectedDate = today;

        // Assert
        expect(today).toEqual(component.selectedDate);

    });

});
