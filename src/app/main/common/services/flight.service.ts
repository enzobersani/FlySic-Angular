import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterestModel } from '../models/user-interest-model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly apiUrl = 'https://localhost:7127/api/v1/flights';

  constructor(private http: HttpClient) { }

  getFlightInterests(flightFormId: string): Observable<UserInterestModel[]> {
    return this.http.get<UserInterestModel[]>(`${this.apiUrl}/interests/${flightFormId}`);
  }
}
