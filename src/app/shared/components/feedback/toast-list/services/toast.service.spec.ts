import { TestBed }        from '@angular/core/testing';
import { ToastInfoModel } from '../toast/models/toast-info.model';
import { ToastModel }     from '../toast/models/toast.model';
import { ToastService }   from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should listener and send toast', (done: DoneFn) => {

    // Act
    service.listener().subscribe(toast => {

      // Assert
      expect(toast).toBeTruthy();
      done();

    });

    // Arrange
    var toastModel: ToastModel = new ToastInfoModel();
    service.send(toastModel);

  });

});
