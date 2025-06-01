import { ToastWarnModel }          from './toast-warn.model';
import { ToastSuccessModel }       from './toast-success.model';
import { ToastNeutralModel }       from './toast-neutral.model';
import { ToastInfoModel }          from './toast-info.model';
import { ToastErrorModel }         from "./toast-error.model";
import { ToastInfoSecundaryModel } from "./toast-info-secundary.model";
import { ToastEnum }               from '../enum/toast.enum';

describe('ToastComponent', () => {

  let mockCrypto: Crypto;

  beforeEach(() => {
    mockCrypto = {
      randomUUID: () => 'mocked-uuid',
    } as Crypto;
    spyOn(crypto, 'randomUUID').and.callFake(mockCrypto.randomUUID);
  });

    it('should create', () => {

        // Arrange
        var toastErrorModel         = new ToastErrorModel();
        var toastInfoSecundaryModel = new ToastInfoSecundaryModel();
        var toastInfoModel          = new ToastInfoModel();
        var toastNeutralModel       = new ToastNeutralModel();
        var toastSuccessModel       = new ToastSuccessModel();
        var toastWarnModel          = new ToastWarnModel();

        // Act

        // Assert
        expect(toastErrorModel).toBeTruthy();
        expect(toastInfoSecundaryModel).toBeTruthy();
        expect(toastInfoModel).toBeTruthy();
        expect(toastNeutralModel).toBeTruthy();
        expect(toastSuccessModel).toBeTruthy();
        expect(toastWarnModel).toBeTruthy();

    });

    it('should get icon', () => {

        // Arrange
        var toastErrorModel         = new ToastErrorModel();
        var toastInfoSecundaryModel = new ToastInfoSecundaryModel();
        var toastInfoModel          = new ToastInfoModel();
        var toastNeutralModel       = new ToastNeutralModel();
        var toastSuccessModel       = new ToastSuccessModel();
        var toastWarnModel          = new ToastWarnModel();

        // Act

        // Assert
        expect(toastErrorModel.icon).toEqual('warning');
        expect(toastInfoSecundaryModel.icon).toEqual('info');
        expect(toastInfoModel.icon).toEqual('info');
        expect(toastNeutralModel.icon).toEqual('info');
        expect(toastSuccessModel.icon).toEqual('check_circle');
        expect(toastWarnModel.icon).toEqual('warning');

    });

    it('should get icon', () => {

        // Arrange
        var toastErrorModel         = new ToastErrorModel();
        var toastInfoSecundaryModel = new ToastInfoSecundaryModel();
        var toastInfoModel          = new ToastInfoModel();
        var toastNeutralModel       = new ToastNeutralModel();
        var toastSuccessModel       = new ToastSuccessModel();
        var toastWarnModel          = new ToastWarnModel();

        // Act

        // Assert
        expect(toastErrorModel.type).toEqual(ToastEnum.Error);
        expect(toastInfoSecundaryModel.type).toEqual(ToastEnum.InfoSecundary);
        expect(toastInfoModel.type).toEqual(ToastEnum.Info);
        expect(toastNeutralModel.type).toEqual(ToastEnum.Neutral);
        expect(toastSuccessModel.type).toEqual(ToastEnum.Success);
        expect(toastWarnModel.type).toEqual(ToastEnum.Warn);

    });

});
