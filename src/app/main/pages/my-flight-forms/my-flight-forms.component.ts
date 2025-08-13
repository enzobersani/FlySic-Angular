import { Component, OnInit } from '@angular/core';
import { FlightFormsModel } from '../../common/models/flight-forms-model';
import { AirportService } from '../../common/services/airport.service';
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { SelectComponent } from "../../../shared/components/forms/select/select.component";
import { FlightFormStatusOptions } from "./enum/flight-form-status-options.enum"
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-flight-forms',
  standalone: true,
  imports: [NgFor, DatePipe, SelectComponent],
  templateUrl: './my-flight-forms.component.html',
  styleUrl: './my-flight-forms.component.scss'
})
export class MyFlightFormsComponent implements OnInit {
  flightForms: FlightFormsModel[] = [];
  statusOptions = FlightFormStatusOptions;
  form = new FormGroup({
    status: new FormControl(null),
  });

  constructor(
    private airportService: AirportService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.airportService.getMyFlightForms(1).subscribe({
      next: (data) => this.flightForms = data,
      error: (err) => this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao carregar fichas de voo."))
    });
  }

  goToMyFlightDetail(id: string): void {
    this.router.navigate(['/my-flight', id]);
  }

  searchMyFlights(status: number): void {
    console.log("status", status)
    if (status) {
      this.airportService.getMyFlightForms(status).subscribe({
        next: (data) => this.flightForms = data,
        error: (err) => this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao carregar fichas de voo."))
      });
    } else {
      this.toastService.send(new ToastErrorModel("Atenção", "Por favor, selecione um status."));
    }
  }
}
