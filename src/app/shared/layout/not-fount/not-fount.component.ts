import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-fount',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-fount.component.html',
  styleUrl: './not-fount.component.scss'
})
export class NotFountComponent {
  @Input() title: string = 'Página não encontrada';
  @Input() message: string = 'O conteúdo que você está procurando não existe ou foi removido.';
  @Input() icon: string = 'search_off';
  @Input() showAction: boolean = true;
  @Input() actionText: string = 'Voltar para a página inicial';
  @Input() actionLink: string = '/';
  @Input() compact: boolean = false;
}
