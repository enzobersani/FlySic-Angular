import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { FirstAccessComponent } from "../first-access/first-access.component";
import { MainPanelComponent } from "../../../shared/layout/main-panel/main-panel.component";
import { PanelComponent } from "../../../shared/layout/panel/panel.component";
import { UserService } from '../../common/services/user.service';
import { AuthService } from '../../../infrastructure/services/auth.service';

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
  userId: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.userId = decodedToken.sub;
      this.userService.getFirstAccessStatus(this.userId).subscribe({
        next: (result) => {
          this.isFirstAccess = result;
        },
      })
    }
  }

  ngAfterViewInit(): void {
    if (this.isFirstAccess) {
      setTimeout(() => {
        this.modalFirstAccess.open();

        this.userService.updateFirstAccess(this.userId).subscribe({});
      });
    }
  }
}
