import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-loading',
  standalone: true,
  imports: [NgIf],
  templateUrl: './big-loading.component.html',
  styleUrl: './big-loading.component.scss'
})
export class BigLoadingComponent {
  @Input() message: string = '';
}
