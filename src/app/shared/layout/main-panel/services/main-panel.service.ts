import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RandomKey } from '../../../helper/random-key';

@Injectable({
  providedIn: 'root'
})
export class MainPanelService {
  public id                           = 'panel-body-' + RandomKey.GetNewKey();
  public height                       = 0;
  public closeHeight                  = 0;
  public customHeight                 = 0;
  public isAnimation                  = false;
  public panelBodyStyle: Subject<any> = new Subject<any>();
  public isOpen: Subject<boolean>     = new Subject<boolean>();
  private changePanelBodyStyleTimeout: any;
  private animationTime = 500;
  private paddingBottom = 25;

  constructor() {
  }

  getCustomHeight(): number {
    return this.customHeight;
  }

  setCustomHeight(customHeight: number): void {
    this.customHeight = customHeight;
    this.loadCurrentHeightAndChangePanelBodyStyle(true);
  }

  loadCurrentHeightAndChangePanelBodyStyle(isOpen: boolean) {
    if (this.customHeight > 0) {
      this.loadCurrentHeightAndChangePanelBodyStyleCustom(isOpen);
    }
    else if (this.height <= 0) {
      this.loadCurrentHeightAndChangePanelBodyStylePromise(isOpen);
    }
  }

  loadCurrentHeightAndChangePanelBodyStyleCustom(isOpen: boolean) {
    this.height = this.customHeight;

    if (isOpen) this.closeHeight = this.height;
    this.changePanelBodyStyle(isOpen);
  }

  loadCurrentHeightAndChangePanelBodyStylePromise(isOpen: boolean) {
    this.loadHeight().then((height) => {
      this.height = height;
      if (isOpen)
        this.closeHeight = this.height;
      this.changePanelBodyStyle(isOpen);
    });
  }

  loadHeight(): Promise<number> {
    return new Promise((resolve, reject) => {
      var element = document.getElementById(this.id);
      if (element) {
        resolve(element.offsetHeight);
      } else {
        setTimeout(() => {
          resolve(document.getElementById(this.id)?.offsetHeight ?? 0);
        }, 0);
      }
    });

  }

  changePanelBodyStyle(isOpen: boolean) {
    if (isOpen) {
      this.openingStyle()
    } else {
      this.closeStyle()
    }
    clearTimeout(this.changePanelBodyStyleTimeout);
    if (isOpen) this.waitAnimationAndsetOpenStyle();
  }

  waitAnimationAndsetOpenStyle() {
    this.changePanelBodyStyleTimeout = setTimeout(() => { this.openStyle(); }, this.animationTime);
  }

  setStyle(style: any) {
    this.panelBodyStyle.next(style);
  }

  //#region Styles

  openingStyle() {
        this.isAnimation = true;
    var newHeight        = this.closeHeight != 0 ? this.closeHeight : this.height;
    this.setStyle({ height: (newHeight + this.paddingBottom) + 'px' });
  }

  openStyle() {
    this.isAnimation = false;
    this.setStyle({ paddingBottom: this.paddingBottom + 'px', overflow: 'visible' });
  }

  closeStyle() {
    if (this.closeHeight == 0) {
      this.firstClose();
    } else {
      this.fixCloseAnimation();
    }
  }

  firstClose() {
    this.setStyle({ height: '0px' });
    this.closeHeight = this.height;
  }

  fixCloseAnimation() {
    if (!this.isAnimation) this.closeHeight = (document.getElementById(this.id)?.offsetHeight ?? 0) - this.paddingBottom;
    this.setStyle({ height: (this.closeHeight + this.paddingBottom) + 'px', overflow: 'visible' });
    setTimeout(() => { this.setStyle({ height: '0px' }); }, 50);
  }

  //#endregion

}
