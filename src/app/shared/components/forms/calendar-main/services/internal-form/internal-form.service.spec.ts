import { TestBed } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CalendarRangeDateModel } from '../../../base-calendar/models/base-calendar-range.model';
import { CalendarMainInternalFormListernerService } from './../internal-form-listerner.service';
import { CalendarMainInternalFormService } from './internal-form.service';

describe('CalendarMainInternalFormService', () => {
  let service: CalendarMainInternalFormService;
  let formBuilderSpy  = jasmine.createSpyObj<UntypedFormBuilder>('FormBuilder', ['group']);
  let internalFormSpy = jasmine.createSpyObj<UntypedFormGroup>('FormBuilder', ['addControl', 'patchValue']);
  formBuilderSpy.group.and.returnValue(internalFormSpy);
  let internalFormListernerServiceSpy = jasmine.createSpyObj<CalendarMainInternalFormListernerService>('InternalFormListernerService', ['listener']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalendarMainInternalFormService,
        {
          provide : UntypedFormBuilder,
          useValue: formBuilderSpy
        },
        {
          provide : CalendarMainInternalFormListernerService,
          useValue: internalFormListernerServiceSpy
        }
      ]
    });
    service = TestBed.inject(CalendarMainInternalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should patch range date', () => {

    // Arrange
    let rangeDate: CalendarRangeDateModel | null = null;
    let valuesToJson                = spyOn(service, 'valuesToJson');

    // Act
    service.patchRangeDate(rangeDate);

    // Assert
    expect(internalFormSpy.patchValue).toHaveBeenCalled();
    expect(valuesToJson).toHaveBeenCalled();

  });

  it('should values to json', () => {

    // Arrange
    let today                = new Date(2022, 2, 2);
    let tomorrow             = new Date(2022, 2, 3);
    let rangeDate: CalendarRangeDateModel = CalendarRangeDateModel.createCompleteInstace(today, tomorrow);

    // Act
    let result = service.valuesToJson(rangeDate);

    // Assert
    expect(result.initialDate).toEqual('2022-03-02T00:00:00.000Z');
    expect(result.finalDate).toEqual('2022-03-03T23:59:59.999Z');

  });

  it('should get form', () => {

    // Arrange

    // Act
    let result = service.getForm();

    // Assert
    expect(result).toEqual(internalFormSpy);

  });

  it('should get values', () => {

    // Arrange

    // Act
    let result = service.getValues();

    // Assert
    expect(result).not.toBeDefined();

  });

  it('should final values to json with null', () => {

    // Arrange
    let datetime: Date | null = null;

    // Act
    let result = service.finalValuesToJson(datetime);

    // Assert
    expect(result).toBeNull();

  });

});
