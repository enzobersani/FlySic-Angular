import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() message: string = 'Carregando...';
  @Input() overlay: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
