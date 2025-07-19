import { Injectable } from '@angular/core';
import { RandomKey } from '../../../../helper/random-key';

@Injectable()
export class CalendarIdService {

  private _id: string;

  constructor() {
    this._id = RandomKey.GetNewKey();
  }

  get(): string {
    return this._id;
  }

}
