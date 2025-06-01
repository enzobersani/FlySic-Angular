import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {
  private apiUrl = 'https://localhost:7127/api/v1/users/new-user';

  constructor(private http: HttpClient) { }

  registerNewUser(formData: FormData){
    return this.http.post(this.apiUrl, formData);
  }
}