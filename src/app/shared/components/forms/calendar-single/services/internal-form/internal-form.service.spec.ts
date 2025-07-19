import { TestBed }                      from '@angular/core/testing';
import { InternalFormListernerService } from './../internal-form-listerner.service';
import { FormBuilder, FormGroup }       from '@angular/forms';
import { InternalFormService }          from './internal-form.service';
import { RangeDate }                    from '../../model/range-date.model';
import { RangeDateFormValues } from './models/range-date-form.model';

describe('InternalFormService', () => {
  let service: InternalFormService;
  var formBuilderSpy  = jasmine.createSpyObj<FormBuilder>('FormBuilder', ['group']);
  var internalFormSpy = jasmine.createSpyObj<FormGroup>('FormBuilder', ['addControl', 'patchValue']);
  formBuilderSpy.group.and.returnValue(internalFormSpy);
  var internalFormListernerServiceSpy = jasmine.createSpyObj<InternalFormListernerService>('InternalFormListernerService', ['listener']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InternalFormService,
        {
          provide : FormBuilder,
          useValue: formBuilderSpy
        },
        {
          provide : InternalFormListernerService,
          useValue: internalFormListernerServiceSpy
        }
      ]
    });
    service = TestBed.inject(InternalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should patch range date', () => {

    // Arrange
    var rangeDate: RangeDate | null = null;
    var valuesToJson                = spyOn(service, 'valuesToJson');

    // Act
    service.patchRangeDate(rangeDate);

    // Assert
    expect(internalFormSpy.patchValue).toHaveBeenCalled();
    expect(valuesToJson).toHaveBeenCalled();

  });

  it('should values to json', () => {

    // Arrange
    var today                = new Date(2022, 2, 2);
    var tomorrow             = new Date(2022, 2, 3);
    var rangeDate: RangeDate = RangeDate.createCompleteInstace(today, tomorrow);

    // Act
    var result = service.valuesToJson(rangeDate);

    // Assert
    expect(result.initialDate).toEqual('2022-03-02T00:00:00.000Z');
    expect(result.finalDate).toEqual('2022-03-03T23:59:59.999Z');

  });

  it('should get form', () => {

    // Arrange

    // Act
    var result = service.getForm();

    // Assert
    expect(result).toEqual(internalFormSpy);

  });

  it('should get values', () => {

    // Arrange

    // Act
    var result = service.getValues();

    // Assert
    expect(result).not.toBeDefined();

  });

  it('should final values to json with null', () => {

    // Arrange
    var datetime: Date | null = null;

    // Act
    var result = service.finalValuesToJson(datetime);

    // Assert
    expect(result).toBeNull();

  });

});
