import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastService } from '../../../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastErrorModel } from '../../../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ToastSuccessModel } from '../../../../../shared/components/feedback/toast-list/toast/models/toast-success.model';
import { ButtonPrimaryComponent } from '../../../../../shared/components/forms/buttons/button-primary/button-primary.component';
import { UserInterestModel } from '../../../../common/models/user-interest-model';
import { FlightService } from '../../../../common/services/flight.service';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    NgFor, NgIf,
    ButtonPrimaryComponent
],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent implements OnInit{
  @Input() flightFormId!: string;
  interests: UserInterestModel[] = [];
  loadingAccept: boolean = false;

  constructor(
    private flightService: FlightService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getInterests();
  }

  get someoneAccepted(): boolean {
    return this.interests.some(i => i.isAccepted);
  }

  getInterests(): void {
    this.flightService.getFlightInterests(this.flightFormId).subscribe({
      next: (data) => {
        this.interests = data;
      },
      error: () => console.error('erro')
    });
  }

  acceptInterest(interestId: string): void {
    this.loadingAccept = true;
    this.flightService.acceptInterest(interestId, this.flightFormId).subscribe({
      next: () => {
        this.toastService.send(new ToastSuccessModel("Sucesso", "Aceite realizado com sucesso!", "Agora"));
        this.getInterests();
        this.loadingAccept = false;
      },
      error: () => {
        this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao aceitar.", "Agora"));
        this.loadingAccept = false;
      }
    });
  }
}
