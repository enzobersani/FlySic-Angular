import { Component, OnInit } from '@angular/core';
import { FlightFormsModel } from '../../common/models/flight-forms-model';
import { AirportService } from '../../common/services/airport.service';
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-flight-forms',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './my-flight-forms.component.html',
  styleUrl: './my-flight-forms.component.scss'
})
export class MyFlightFormsComponent implements OnInit {
  flightForms: FlightFormsModel[] = [];

  constructor(
    private airportService: AirportService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.airportService.getMyFlightForms().subscribe({
      next: (data) => this.flightForms = data,
      error: (err) => this.toastService.send(new ToastErrorModel("Erro", "Ocorreu um erro ao carregar fichas de voo."))
    });
  }

  goToMyFlightDetail(id: string): void {
    this.router.navigate(['/my-flight', id]);
  }
}
