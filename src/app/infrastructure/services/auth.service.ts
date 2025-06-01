import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseModel } from '../models/auth-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7127/api/v1/auth'

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<AuthResponseModel> {
    const authCommand = { Email: email, Password: password };
    return this.http.post<AuthResponseModel>(`${this.apiUrl}/login`, authCommand);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
  
    try {
      // const decodedToken: any = jwtDecode(token);
      // const currentTime = Math.floor(Date.now() / 1000);
  
      // if (decodedToken.exp < currentTime) {
      //   this.logout();
      //   return false;
      // }
  
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

  // decodeToken(): TokenDecodeModel | null {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     try {
  //       const decodedToken: any = jwtDecode(token);
  //       const userId = decodedToken.nameid;
  //       const email = decodedToken.email;
  //       const nome = decodedToken.unique_name;
  //       return { userId, email, nome };
  //     } catch (error) {
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // }

  private redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
function jwtDecode(token: string): any {
  throw new Error('Function not implemented.');
}

