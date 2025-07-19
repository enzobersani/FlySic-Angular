import { ToggleService }   from './toggle.service';
import { ToggleDirective } from './toggle.directive';

describe('ToggleDirective', () => {

  it('should create an instance', () => {

    // Arrange
    var toggleService = new ToggleService();

    // Act
    const directive = new ToggleDirective(toggleService);

    // Assert    
    expect(directive).toBeTruthy();

  });

  it('should click out', () => {

    // Arrange
    const toggleServiceSpy    = jasmine.createSpyObj('ToggleService', ['close']);
    const directive           = new ToggleDirective(toggleServiceSpy);
    var   event: PointerEvent = new PointerEvent('click');
    var   openOnComponent     = spyOn(directive, 'openOnComponent');
    var   closeOutside        = spyOn(directive, 'closeOutside');

    // Act     
    directive.clickout(event);

    // Assert    
    expect(openOnComponent).toHaveBeenCalled();
    expect(closeOutside).toHaveBeenCalled();

  });

  [
    {
      pathsHasClassNameReturn: false,
      closeCalled            : true
    }, {
      pathsHasClassNameReturn: true,
      closeCalled            : false
    }
  ].forEach(element => {

    it(`should click out side and close [${element.closeCalled}]`, () => {

      // Arrange
      const toggleServiceSpy = jasmine.createSpyObj('ToggleService', ['close']);
      const directive        = new ToggleDirective(toggleServiceSpy);
      spyOn(directive, 'pathsHasClassName').and.returnValue(element.pathsHasClassNameReturn);
      var paths: Array<any> = [];

      // Act     
      directive.closeOutside(paths);

      // Assert    
      if (element.closeCalled) {
        expect(toggleServiceSpy.close).toHaveBeenCalled();
      } else {
        expect(toggleServiceSpy.close).not.toHaveBeenCalled();
      }

    });

  });

  [
    {
      btnClose      : false,
      selectedOption: true,
      openCalled    : true
    },
    {
      btnClose      : true,
      selectedOption: false,
      openCalled    : false
    },
    {
      btnClose      : true,
      selectedOption: true,
      openCalled    : false
    },
    {
      btnClose      : false,
      selectedOption: false,
      openCalled    : false
    }
  ].forEach(element => {

    it(`should open on compo [btn-close(${element.btnClose})+selected-option(${element.selectedOption})=open(${element.openCalled})]`, () => {

      // Arrange
      const toggleServiceSpy = jasmine.createSpyObj('ToggleService', ['open']);
      const directive        = new ToggleDirective(toggleServiceSpy);
      spyOn(directive, 'pathsHasClassName').and.callFake((paths: any[], className: string): boolean => {
        if (className == 'btn-close')
          return element.btnClose;
        if (className == 'modal-toggle')
          return element.selectedOption;
        return false;
      });
      var paths: Array<any> = [];

      // Act     
      directive.openOnComponent(paths);

      // Assert    
      if (element.openCalled) {
        expect(toggleServiceSpy.open).toHaveBeenCalled();
      } else {
        expect(toggleServiceSpy.open).not.toHaveBeenCalled();
      }

    });

    [
      {
        hasClassNameResult: true,
        result            : true
      },
      {
        hasClassNameResult: false,
        result            : false
      }
    ].forEach(element => {

      it(`should check if has class name in paths list`, () => {

        // Arrange
        const toggleServiceSpy = jasmine.createSpyObj('ToggleService', ['open']);
        const directive        = new ToggleDirective(toggleServiceSpy);
        spyOn(directive, 'hasClassName').and.returnValue(element.hasClassNameResult);
        var paths: any[]      = [{ class: 'teste' }];
        var className: string = "";

        // Act     
        var result = directive.pathsHasClassName(paths, className);

        // Assert    
        expect(result).toEqual(element.result);

      });

    });

    [
      {
        hasPropertyClassNameResult: false,
        classNames                : ['teste'],
        result                    : false
      },
      {
        hasPropertyClassNameResult: true,
        classNames                : ['teste'],
        result                    : true
      },
      {
        hasPropertyClassNameResult: true,
        classNames                : ['teste-fail'],
        result                    : false
      },
      {
        hasPropertyClassNameResult: true,
        classNames                : [],
        result                    : false
      },
      {
        hasPropertyClassNameResult: true,
        classNames                : null,
        result                    : false
      }
    ].forEach(element => {

      it(`should check if has class name [has property(${element.hasPropertyClassNameResult})+classes(${element.classNames?.join(',')})=open(${element.result})]`, () => {

        // Arrange
        const toggleServiceSpy = jasmine.createSpyObj('ToggleService', ['open']);
        const directive        = new ToggleDirective(toggleServiceSpy);
        spyOn(directive, 'hasPropertyClassName').and.returnValue(element.hasPropertyClassNameResult);
        var path: any         = { className: element.classNames };
        var className: string = 'teste';

        // Act     
        var result = directive.hasClassName(path, className);

        // Assert    
        expect(!!result).toEqual(element.result);

      });

    });

    [
      {
        path  : { className: undefined },
        result: false
      },
      {
        path  : { className: true },
        result: false
      },
      {
        path  : { className: ['teste'] },
        result: true
      }
    ].forEach(element => {

      it(`should check if has property name [path(${JSON.stringify(element.path)})=return(${element.result})]`, () => {

        // Arrange
        const toggleServiceSpy = jasmine.createSpyObj('ToggleService', ['open']);
        const directive        = new ToggleDirective(toggleServiceSpy);
        var   path: any        = element.path;

        // Act     
        var result = directive.hasPropertyClassName(path);

        // Assert    
        expect(!!result).toEqual(element.result);

      });

    });

  });

  it(`should escape and close`, () => {

    // Arrange
    const toggleServiceSpy     = jasmine.createSpyObj('ToggleService', ['close']);
    const directive            = new ToggleDirective(toggleServiceSpy);
    var   event: KeyboardEvent = {} as KeyboardEvent;

    // Act     
    directive.onKeydownHandler(event);

    // Assert    
    expect(toggleServiceSpy.close).toHaveBeenCalled();

  });

});
