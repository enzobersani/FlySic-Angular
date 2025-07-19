import { Directive, HostListener, Input } from '@angular/core';
import { CalendarSingleToggleService } from '../services/toggle.service';

@Directive({
  selector: '[CalendarSingleToggle]',
  standalone: true,
})
export class CalendarSingleToggleDirective {

  @Input() componentID?: string;

  constructor(public toggleService: CalendarSingleToggleService) {
  }

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent | any) {
    var paths = event.composedPath() as Array<any>;
    this.openOnComponent(paths);
    this.closeOutside(paths);
  }

  closeOutside(paths: Array<any>) {
    if (!this.pathsHasClassName(paths, this.componentID)) {
      this.toggleService.close();
    }
  }

  openOnComponent(paths: Array<any>) {
    var inBtnClose       = this.pathsHasClassName(paths, 'btn-close');
    var inSelectedOption = this.pathsHasClassName(paths, 'selected-option');
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
