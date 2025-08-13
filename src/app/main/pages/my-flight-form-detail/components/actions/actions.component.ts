import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { ModalComponent } from "../../../../../shared/components/modals/modal/modal.component";
import { ButtonSecondaryComponent } from "../../../../../shared/components/forms/buttons/button-secondary/button-secondary.component";
import { NgIf } from '@angular/common';
import { RatingComponent } from "../../../../../shared/components/feedback/rating/rating.component";
import { TextareaComponent } from "../../../../../shared/components/forms/textarea/textarea.component";
import { FormControl, FormGroup } from '@angular/forms';
import { FlightService } from '../../../../common/services/flight.service';
import { FlightFormStatusResponseModel } from '../../../../common/models/flight-form-status-response.model';
import { FlightFormStatus } from '../../../../common/enum/flight-form-status.enum';
import { FinishFlightFormModelRequest } from './models/finish-flight-form.model';
import { AuthService } from '../../../../../infrastructure/services/auth.service';
import { ToastService } from '../../../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastSuccessModel } from '../../../../../shared/components/feedback/toast-list/toast/models/toast-success.model';
import { ToastErrorModel } from '../../../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ToastListComponent } from "../../../../../shared/components/feedback/toast-list/toast-list.component";
import { SelectComponent } from "../../../../../shared/components/forms/select/select.component";
import { CancelFlightFormModelRequest } from './models/cancel-flight-form.model';


@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [ButtonPrimaryComponent, ModalComponent, ButtonSecondaryComponent, NgIf, RatingComponent, TextareaComponent, ToastListComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ActionsComponent implements OnInit{
  @ViewChild('modalActions') modalActions!: ModalComponent;
  @Input() flightFormId: string = '';
  flightStatus: FlightFormStatus | null = null
  selectedAction: 'finalizar' | 'cancelar' | null = null;
  form!: FormGroup;
  rating: number = 5;
  evaluatorId: string;
  evaluatedId!: string;

  constructor(
    private flightService: FlightService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.evaluatorId = this.authService.getDecodedToken()!.sub;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      comentarioFinalizacao: new FormControl(''),
      comentarioCancelamento: new FormControl('')
    });

    this.getStatus();
  }

  finishFlight() {
    if (!this.canFinish()) return;
    this.selectedAction = 'finalizar';
    this.modalActions.open();
  }

  cancelFlight() {
    if (!this.canCancel()) return;
    this.selectedAction = 'cancelar';
    this.modalActions.open();
  }

  
  confirmAction() {
    if (this.selectedAction === 'finalizar') {
      if (!this.canFinish()) return;
      this.finish();
    } else if (this.selectedAction === 'cancelar') {
      if (!this.canCancel()) return;
      this.cancel();
    }
    this.modalActions.close();
    this.form.reset();
    this.selectedAction = null;
    this.rating = 5;
  }

  closeModal() {
    this.modalActions.close();
    this.form.reset();
    this.selectedAction = null;
    this.rating = 5;
  }

  getStatus(): void {
    this.flightService.getStatus(this.flightFormId).subscribe({
      next: (status: FlightFormStatusResponseModel) => {
        this.flightStatus = status.status;
        this.evaluatedId = status.evaluatedId;
      },
    });
  }

  canCancel(): boolean {
    return this.flightStatus === FlightFormStatus.Aberta || this.flightStatus === FlightFormStatus.Fechada;
  }
  
  canFinish(): boolean {
    return this.flightStatus === FlightFormStatus.Fechada;
  }

  private finish(): void {
    const comment = this.form.get('comentarioFinalizacao')?.value;
    const request: FinishFlightFormModelRequest = {
      evaluatorId: this.evaluatorId,
      evaluatedId: this.evaluatedId,
      flightFormId: this.flightFormId,
      rating: this.rating,
      comment: comment,
    }

    this.flightService.finishFlight(request).subscribe({
      next: () => {
        this.toastService.send(new ToastSuccessModel("Sucesso", "Ficha finalizada!", "Agora"));
        this.getStatus();
      },
      error: () => this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao finalizar ficha", "Agora")),
    });
  }

  private cancel(): void {
    const comment = this.form.get('comentarioCancelamento')?.value;
    const request: CancelFlightFormModelRequest = {
      flightFormId: this.flightFormId,
      userId: this.evaluatorId,
      comment: comment
    }

    this.flightService.cancelFlight(request).subscribe({
      next: () => {
        this.toastService.send(new ToastSuccessModel("Sucesso", "Ficha cancelada!", "Agora"));
        this.getStatus();
      },
      error: () => this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao cancelar ficha", "Agora")),
    });
  }
}
