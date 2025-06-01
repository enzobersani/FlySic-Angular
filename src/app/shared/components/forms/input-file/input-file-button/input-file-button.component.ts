import { Component } from '@angular/core';
import { BaseButtonComponent } from '../../buttons/base/base-button.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'cso-input-file-button',
    templateUrl: './input-file-button.component.html',
    styleUrls: ['../../buttons/base/base-button.component.scss', './input-file-button.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class InputFileButtonComponent extends BaseButtonComponent {}
