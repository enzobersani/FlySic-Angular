import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUpdateResponseModel } from '../models/base-update-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://localhost:7127/api/v1/users';

  constructor(private http: HttpClient) { }

  updateFirstAccess(userId: string): Observable<BaseUpdateResponseModel> {
    return this.http.put<BaseUpdateResponseModel>(`${this.apiUrl}/first-access`, { userId });
  }

  getFirstAccessStatus(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/first-access-status/${userId}`);
  }
}
