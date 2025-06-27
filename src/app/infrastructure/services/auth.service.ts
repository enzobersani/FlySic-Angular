import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseModel } from '../models/auth-response.model';
import { Router } from '@angular/router';
import { DecodedTokenModel } from '../models/decoded-token.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7127/api/v1/auth';
  
  private _decodedToken: DecodedTokenModel | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeToken(token);
    }
  }

  login(email: string, password: string): Observable<AuthResponseModel> {
    const authCommand = { Email: email, Password: password };
    return this.http.post<AuthResponseModel>(`${this.apiUrl}/login`, authCommand);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode<DecodedTokenModel>(token);
      const currentTime = Math.floor(Date.now() / 1000);
  
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        this.logout();
        return false;
      }

      this._decodedToken = decodedToken;
      return true;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      this.logout();
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  decodeToken(token: string) {
    try {
      this._decodedToken = jwtDecode<DecodedTokenModel>(token);
    } catch (e) {
      console.error('Erro ao decodificar o token:', e);
      this._decodedToken = null;
    }
  }

  getDecodedToken(): DecodedTokenModel | null {
    if (!this._decodedToken) {
      const token = localStorage.getItem('token');
      if (token) {
        this.decodeToken(token);
      }
    }
    return this._decodedToken;
  }

  private redirectToLogin() {
    this.router.navigate(['/login']);
  }
}