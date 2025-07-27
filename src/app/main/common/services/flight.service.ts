import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterestModel } from '../models/user-interest-model';
import { UpdateFlightFormRequestModel } from '../models/update-flight-form-request.model';
import { BaseUpdateResponseModel } from '../models/base-update-response.model';
import { FlightFormStatusResponseModel } from '../models/flight-form-status-response.model';
import { FinishFlightFormModelRequest } from '../../pages/my-flight-form-detail/components/actions/models/finish-flight-form.model';

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

  getStatus(flightFormId: string): Observable<FlightFormStatusResponseModel> {
    return this.http.get<FlightFormStatusResponseModel>(`${this.apiUrl}/status/${flightFormId}`);
  }

  finishFlight(request: FinishFlightFormModelRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/finish`, request);
  }
}
