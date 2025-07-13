import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterestModel } from '../models/user-interest-model';
import { UpdateFlightFormRequestModel } from '../models/update-flight-form-request.model';
import { BaseUpdateResponseModel } from '../models/base-update-response.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly apiUrl = 'https://localhost:7127/api/v1/flights';

  constructor(private http: HttpClient) { }

  getFlightInterests(flightFormId: string): Observable<UserInterestModel[]> {
    return this.http.get<UserInterestModel[]>(`${this.apiUrl}/interests/${flightFormId}`);
  }

  acceptInterest(interestId: string, flightFormId: string): Observable<void> {
    const url = `${this.apiUrl}/accept`;
    return this.http.post<void>(url, { interestId, flightFormId });
  }

  updateFlightForm(id: string, data: UpdateFlightFormRequestModel): Observable<BaseUpdateResponseModel> {
    return this.http.put<BaseUpdateResponseModel>(`${this.apiUrl}/${id}`, data);
  }
}
