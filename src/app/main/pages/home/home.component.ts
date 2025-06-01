import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { FirstAccessComponent } from "../first-access/first-access.component";
import { MainPanelComponent } from "../../../shared/layout/main-panel/main-panel.component";
import { PanelComponent } from "../../../shared/layout/panel/panel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalComponent, FirstAccessComponent, MainPanelComponent, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('modalFirstAccess') modalFirstAccess!: ModalComponent;
  isFirstAccess: boolean = true;

  constructor() {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.isFirstAccess) {
      setTimeout(() => {
        this.modalFirstAccess.open();
      });
    }
  }
}
