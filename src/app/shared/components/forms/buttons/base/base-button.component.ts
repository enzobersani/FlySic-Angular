import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonBGTheme, ButtonIconPosition } from "./models/base-button.enum";

@Component({
    selector: 'cso-base-button', template: '', styleUrls: [],
    standalone: true
})
export class BaseButtonComponent {

  @Input() id          : string = '';
  @Input() label       : string = '';
  @Input() iconPosition: ButtonIconPosition = ButtonIconPosition.LEFT;
  @Input() iconName    : string = '';
  @Input() theme       : ButtonBGTheme = ButtonBGTheme.WHITE;
  @Input() isDisabled  : boolean = false;
  @Input() isLoading   : boolean = false;
  @Input() customWidth: string = '';
  @Input() customHeight: string = '';
  @Input() minWidth: string = '';
  
  @Output() clickEvent : EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  handleClass() {
    return {
      'cso-button'             : true,
      'cso-button--loading'    : this.isLoading,
      'cso-button--disabled'   : this.isDisabled,
      'cso-button--icon-left'  : this.iconPosition === ButtonIconPosition.LEFT,
      'cso-button--icon-right' : this.iconPosition === ButtonIconPosition.RIGHT,
      'cso-button--theme-white': this.theme === ButtonBGTheme.WHITE,
      'cso-button--theme-pink' : this.theme === ButtonBGTheme.PINK,
    };
  }

  handleClick() {
    if(!this.isDisabled && !this.isLoading)
      this.clickEvent.emit(this.id);
  }

}