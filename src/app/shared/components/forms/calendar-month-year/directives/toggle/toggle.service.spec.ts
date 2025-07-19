import { ToggleService } from './toggle.service';

describe('ToggleService', () => {

  it('should be created', () => {
    var toggleService = new ToggleService();
    expect(toggleService).toBeTruthy();
  });

  it(`should open`, () => {

    // Arrange
    var toggleService = new ToggleService();

    // Act
    toggleService.open();

    // Assert    
    expect(toggleService.isOpen.value).toEqual(true);

  });

  it(`should open`, () => {

    // Arrange
    var toggleService = new ToggleService();

    // Act
    toggleService.close();

    // Assert    
    expect(toggleService.isOpen.value).toEqual(false);

  });

  [
    {
      isOpen: false,
      result: true
    },
    {
      isOpen: true,
      result: false
    }
  ].forEach(element => {

    it(`should toggle`, () => {

      // Arrange
      var toggleService = new ToggleService();
      toggleService.isOpen.next(element.isOpen);

      // Act
      toggleService.toggle();

      // Assert    
      expect(toggleService.isOpen.value).toEqual(element.result);

    });

  });

  it(`should return BehaviorSubject`, () => {

    // Arrange
    var toggleService = new ToggleService();

    // Act
    const listener = toggleService.listener();

    // Assert    
    expect(typeof (listener)).toEqual('object');

  });

});
