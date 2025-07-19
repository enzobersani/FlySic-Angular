import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AirportModel } from '../models/airport.model';
import { Observable } from 'rxjs';
import { NewFlightFormRequestModel } from '../models/new-flight-form-request.model';
import { FlightFormsModel } from '../models/flight-forms-model';
import { FlightFormsListResponseModel } from '../models/flight-forms-list-response.model';
import { FlightFormFiltersModel } from '../../pages/flights/models/flight-form-filters.model';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private readonly apiUrl = 'https://localhost:7127/api/v1/airport';
  private readonly apiForm = 'https://localhost:7127/api/v1/flights';

  constructor(private http: HttpClient) { }

  searchAirport(icao: string): Observable<AirportModel[]> {
    return this.http.get<AirportModel[]>(`${this.apiUrl}/${icao}`);
  }

  createFlight(data: NewFlightFormRequestModel) {
    return this.http.post(this.apiForm, data);
  }

  getMyFlightForms(): Observable<FlightFormsModel[]> {
    return this.http.get<FlightFormsModel[]>(`${this.apiForm}/my-flights`);
  }

  getByFlightId(id: string): Observable<FlightFormsListResponseModel>{
    return this.http.get<FlightFormsListResponseModel>(`${this.apiForm}/flight-form/${id}`);
  }

  postInterest(flightFormId: string): Observable<void> {
    return this.http.post<void>(`${this.apiForm}/flight-interest`, { flightFormId: flightFormId })
  }

  getFlights(filters: FlightFormFiltersModel): Observable<FlightFormsListResponseModel[]> {
    const departureDateIso = filters.departureDate ? this.parseDate(filters.departureDate) : '';
    const arrivalDateIso = filters.arrivalDate ? this.parseDate(filters.arrivalDate) : '';
  
    const params = new HttpParams({ fromObject: {
      departureDate: departureDateIso,
      arrivalDate: arrivalDateIso,
      departureLocation: filters.departureLocation || '',
      arrivalLocation: filters.arrivalLocation || ''
    }});
  
    return this.http.get<FlightFormsListResponseModel[]>(`${this.apiForm}`, { params });
  }

  private parseDate(date: string | Date | null): string {
    if (!date) return '';
  
    if (typeof date === 'string') {
      const [day, month, year] = date.split('/');
      const utcDate = new Date(Date.UTC(+year, +month - 1, +day));
      return utcDate.toISOString();
    }
  
    if (date instanceof Date) {
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      return utcDate.toISOString();
    }
  
    return '';
  }
}