import { Directive, HostListener, Input } from '@angular/core';
import { ToggleService }                  from './toggle.service';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  @Input() compomentId?: string;

  constructor(public toggleService: ToggleService) {
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent | any) {
    var paths = event.composedPath() as Array<any>;
    this.openOnComponent(paths);
    this.closeOutside(paths);
  }

  closeOutside(paths: Array<any>) {
    if (!this.pathsHasClassName(paths, this.compomentId)) {
      this.toggleService.close();
    }
  }

  openOnComponent(paths: Array<any>) {
    var inBtnClose       = this.pathsHasClassName(paths, 'btn-close');
    var inSelectedOption = this.pathsHasClassName(paths, 'modal-toggle');
    if (inSelectedOption && !inBtnClose) {
      this.toggleService.open();
    }
  }

  pathsHasClassName(paths?: any[], className?: string) {
    return paths?.some(path => this.hasClassName(path, className));
  }

  hasClassName(path: any, className?: string) {
    if (!this.hasPropertyClassName(path)) return false;
    return path.className?.includes(className);
  }

  hasPropertyClassName(path: any) {
    if (!path.className) return false;
    if (!path.className.includes) return false;
    return true;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.toggleService.close();
  }

}
