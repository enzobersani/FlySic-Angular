import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../shared/components/modals/modal/modal.component";
import { FirstAccessComponent } from "../first-access/first-access.component";
import { MainPanelComponent } from "../../../shared/layout/main-panel/main-panel.component";
import { PanelComponent } from "../../../shared/layout/panel/panel.component";
import { UserService } from '../../common/services/user.service';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalComponent, FirstAccessComponent, MainPanelComponent, PanelComponent, ButtonPrimaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('modalFirstAccess') modalFirstAccess!: ModalComponent;
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  isFirstAccess: boolean = false;
  userId: string = '';

  stream: MediaStream | null = null;
  track: MediaStreamTrack | null = null;
  currentZoom: number = 1;
  minZoom: number = 1;
  maxZoom: number = 1;
  zoomSupported = false;

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
          console.log(this.isFirstAccess);
          setTimeout(() => {
            if (this.isFirstAccess) {
              this.modalFirstAccess?.open();
              this.userService.updateFirstAccess(this.userId).subscribe();
            }
          });
        },
      })
    }
  }
}
