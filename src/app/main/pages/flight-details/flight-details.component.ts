import { Component, Input, OnInit } from '@angular/core';
import { FlightFormsListResponseModel } from '../../common/models/flight-forms-list-response.model';
import { DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AirportService } from '../../common/services/airport.service';
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { Location } from '@angular/common';
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastSuccessModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-success.model';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ToastListComponent } from "../../../shared/components/feedback/toast-list/toast-list.component";

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [
    DatePipe, NgIf,
    ButtonPrimaryComponent,
    ToastListComponent
],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss'
})
export class FlightDetailsComponent implements OnInit{
  flightForm?: FlightFormsListResponseModel;
  flightFormId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private airportService: AirportService,
    private location: Location,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.flightFormId = this.route.snapshot.paramMap.get('id');
    if (this.flightFormId) {
      this.airportService.getByFlightId(this.flightFormId).subscribe({
        next: (data) => this.flightForm = data
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  setInterest(): void {
    if (this.flightFormId) {
      this.airportService.postInterest(this.flightFormId).subscribe({
        next: () => this.toastService.send(new ToastSuccessModel("Sucesso", "Interesse enviado com sucesso!")),
        error: () =>  this.toastService.send(new ToastErrorModel("Erro", "Ocorreu ao enviar intersse."))
      });
    }
  }
}
