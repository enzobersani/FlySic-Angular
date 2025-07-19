import { Injectable } from '@angular/core';
import { RandomKey }  from '../helper/random-key';

@Injectable()
export class IdService {

  private _id: string;

  public get(){
    return this._id;
  }

  constructor() {
    this._id = RandomKey.GetNewKey();
  }
}
