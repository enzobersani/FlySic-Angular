import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AirportModel } from '../models/airport.model';
import { Observable } from 'rxjs';
import { NewFlightFormRequestModel } from '../models/new-flight-form-request.model';
import { FlightFormsModel } from '../models/flight-forms-model';

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
}
