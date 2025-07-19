import { IdService }                    from './id.service';
import { TestBed }                      from '@angular/core/testing';
import { InternalFormListernerService } from './internal-form-listerner.service';
import { Store }                        from '@ngrx/store';
import { of }                           from 'rxjs';
import { RangeDate }                    from '../model/range-date.model';

describe('InternalFormListernerService', () => {
  let service: InternalFormListernerService;

  var idServiceSpy = jasmine.createSpyObj<IdService>('IdService', ['get']);
  var storeSpy     = jasmine.createSpyObj<Store>('IdService', ['select', 'dispatch']);
  storeSpy.select.and.returnValue(of(new RangeDate()));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InternalFormListernerService,
        {
          provide : IdService,
          useValue: idServiceSpy
        },
        {
          provide : Store,
          useValue: storeSpy
        }
      ]
    });
    service = TestBed.inject(InternalFormListernerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  [
    {
      dataHasBeenResetResult  : true,
      componentHasDataResult  : true,
      resetDataComponentCalled: true
    },
    {
      dataHasBeenResetResult  : false,
      componentHasDataResult  : true,
      resetDataComponentCalled: false
    },
    {
      dataHasBeenResetResult  : true,
      componentHasDataResult  : false,
      resetDataComponentCalled: false
    },
    {
      dataHasBeenResetResult  : false,
      componentHasDataResult  : false,
      resetDataComponentCalled: false
    }
  ].forEach(element => {

    it('should be created', () => {

      // Arrange
      var value: { initialDate: string, finalDate: string } = { initialDate: 'string', finalDate: 'string' };
      spyOn(service, 'dataHasBeenReset').and.returnValue(element.dataHasBeenResetResult);
      spyOn(service, 'componentHasData').and.returnValue(element.componentHasDataResult);
      var resetDataComponent = spyOn(service, 'resetDataComponent');

      // Act
      service.calendarSingleResetRangeDate(value);

      // Assert
      if (element.resetDataComponentCalled) {
        expect(resetDataComponent).toHaveBeenCalled();
      } else {
        expect(resetDataComponent).not.toHaveBeenCalled();
      }

    });

  });

  it('should reset data', () => {

    // Arrange

    // Act
    service.resetDataComponent();

    // Assert
    expect(storeSpy.dispatch).toHaveBeenCalled();

  });

  [
    { value: { initialDate: null, finalDate: null }, result: false },
    { value: { initialDate: new Date(), finalDate: null }, result: true },
    { value: { initialDate: null, finalDate: new Date() }, result: true },
    { value: { initialDate: new Date(), finalDate: new Date() }, result: true },
  ].forEach(element => {

    it('should check if component has data', () => {

      // Arrange

      // Act
      var result = service.componentHasData(Object.assign(element.value));

      // Assert
      expect(result).toEqual(element.result);

    });

  });

  it('should check if data not has been reset', () => {

    // Arrange
    var value: { initialDate: string, finalDate: string } = { initialDate: '2022-12-17T12:51:18.839Z', finalDate: '2022-12-17T12:51:18.839Z' };

    // Act
    var result = service.dataHasBeenReset(value);

    // Assert
    expect(result).toBeFalsy();

  });

  it('should check if data has been reset', () => {

    // Arrange
    var value: { initialDate: string | null, finalDate: string | null } = { initialDate: null, finalDate: null };

    // Act
    var result = service.dataHasBeenReset(value);

    // Assert
    expect(result).toBeTruthy();

  });

});
