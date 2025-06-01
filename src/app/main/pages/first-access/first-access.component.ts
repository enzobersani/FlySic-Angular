import { Component, ViewChild } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { Router } from '@angular/router';
import { ModalComponent } from '../../../shared/components/modals/modal/modal.component';

@Component({
  selector: 'app-first-access',
  standalone: true,
  imports: [ButtonPrimaryComponent],
  templateUrl: './first-access.component.html',
  styleUrl: './first-access.component.scss'
})
export class FirstAccessComponent {
  constructor(private router: Router) {}

  goToChangePassword() {
    this.router.navigate(['/new-password']);
  }
}
