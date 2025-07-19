import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../infrastructure/services/auth.service';
import { FlightFormsModel } from '../../common/models/flight-forms-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from '../../../shared/components/feedback/toast-list/services/toast.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FlightFormsListResponseModel } from '../../common/models/flight-forms-list-response.model';
import { AirportService } from '../../common/services/airport.service';
import { FlightFormFiltersModel } from './models/flight-form-filters.model';
import { ToastErrorModel } from '../../../shared/components/feedback/toast-list/toast/models/toast-error.model';
import { ButtonPrimaryComponent } from "../../../shared/components/forms/buttons/button-primary/button-primary.component";
import { InputTextComponent } from "../../../shared/components/forms/input-text/input-text.component";
import { PanelComponent } from "../../../shared/layout/panel/panel.component";
import { Router } from '@angular/router';
import { CalendarSingleComponent } from "../../../shared/components/forms/calendar-single/calendar-single.component";
import { CalendarMainComponent } from "../../../shared/components/forms/calendar-main/calendar-main.component";

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    DatePipe, NgFor, NgIf,
    ButtonPrimaryComponent,
    InputTextComponent,
    PanelComponent,
    CalendarSingleComponent
],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent implements OnInit{
  flightForms: FlightFormsListResponseModel[] = [];
  filtersForm: FormGroup;
  filtersVisible = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private airportService: AirportService,
    private router: Router
  ) {
    // this.userId = this.authService.getDecodedToken()!.sub;
    this.filtersForm = this.fb.group({
      departureDate: [null],
      arrivalDate: [null],
      departureLocation: [''],
      arrivalLocation: ['']
    });
  }

  ngOnInit(): void {
    this.loadFlightForms();
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  loadFlightForms(): void {
    // const filters = this.filtersForm.value as FlightFormFiltersModel;
    const filtersFormValue = this.filtersForm.value;

    const filters: FlightFormFiltersModel = {
      departureDate: filtersFormValue.departureDate?.initialDate || null,
      arrivalDate: filtersFormValue.arrivalDate?.initialDate || null,
      departureLocation: filtersFormValue.departureLocation,
      arrivalLocation: filtersFormValue.arrivalLocation
    };

    this.airportService.getFlights(filters).subscribe({
      next: (data) => this.flightForms = data,
      error: () => this.toastService.send(new ToastErrorModel("Erro", "Erro ao carregar fichas disponíveis."))
    })
  }

  onFilter(): void {
    this.loadFlightForms();
  }

  onClear(): void {
    this.filtersForm.reset();
    this.loadFlightForms();
  }

  goToDetails(flightDetail: FlightFormsListResponseModel): void {
    this.router.navigate(['/flight/', flightDetail.id])
  }
}
