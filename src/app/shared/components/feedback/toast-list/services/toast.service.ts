import { Injectable }          from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastModel }          from '../toast/models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _currentToast: Subject<ToastModel> = new Subject<ToastModel>();

  constructor() { }

  send(toastModel: ToastModel) {
    this._currentToast.next(toastModel);
  }

  listener(): Observable<ToastModel> {
    return this._currentToast;
  }

}
