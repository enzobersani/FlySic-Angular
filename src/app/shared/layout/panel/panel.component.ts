import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Input() cardTitle: string = '';
  @Input() exhibitCard: boolean = false;
  @Input() icon: string = '';
  @Input() disableIcon: string = '';
  @Input() isDisable: boolean = false;

  public openOrCloseCard() {
    if (!this.isDisable) {
      this.exhibitCard = !this.exhibitCard;
    }
  }

  public hasCardInformationToShow(): boolean {
    return true;
  }
}