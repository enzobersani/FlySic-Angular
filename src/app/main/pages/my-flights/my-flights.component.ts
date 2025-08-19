import { Component, OnInit } from '@angular/core';
import { ToastListComponent } from "../../../shared/components/feedback/toast-list/toast-list.component";
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FlightService } from '../../common/services/flight.service';
import { MyFlightsResponseModel } from './models/my-flights-response.model';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ToastWarnModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-warn.model';
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { MyFlightsRequestModel } from './models/my-flights-request.model';

@Component({
  selector: 'app-my-flights',
  standalone: true,
  imports: [ToastListComponent, DatePipe, NgFor],
  templateUrl: './my-flights.component.html',
  styleUrl: './my-flights.component.scss'
})
export class MyFlightsComponent implements OnInit {
  myFlights: MyFlightsResponseModel[] = [];
  userId: string = '';

  constructor(
    private flightService: FlightService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getDecodedToken()!.sub;
  }

  ngOnInit(): void {
    this.loadMyFlights();
  }

  loadMyFlights(): void {
    this.flightService.getMyFlights(new MyFlightsRequestModel(this.userId)).subscribe({
      next: (data) => this.myFlights = data,
      error: (err) => {
        if (err.status === 400 && err.error){
          this.toastService.send(new ToastWarnModel("Erro", err.error.notifications[0].message));
        } else {
          this.toastService.send(new ToastErrorModel("Erro", "Erro ao carregar fichas disponíveis."))
        }
      }
    })
  }

  goToDetails() {
    alert("Detalhes do voo ainda não implementados.");
  }
}
